import '@testing-library/jest-dom';
import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import fs from 'fs';
import path from 'path';
import nock from 'nock';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/dom/dist/events.js';
import { screen, waitFor } from '@testing-library/dom';

import run from '../src/app';

const pathToIndex = path.join('__fixtures__', 'index.html');
const initialHtml = fs.readFileSync(pathToIndex, 'utf-8');
const pathToRss = path.join('__fixtures__', 'rss.xml');
const rss = fs.readFileSync(pathToRss, 'utf-8');
const elements = {};

const url = 'http://lorem-rss.herokuapp.com/feed';
const host = 'https://hexlet-allorigins.herokuapp.com';
const requestPath = `/get?url=${encodeURIComponent(url)}`;

beforeAll(() => {
  axios.defaults.adapter = adapter;
  nock.disableNetConnect();
});

beforeEach(() => {
  document.body.innerHTML = initialHtml;
  run();

  elements.submit = screen.getByRole('button');
  elements.input = screen.getByRole('textbox');
  elements.modal = screen.getByTestId('modal');
  elements.form = screen.getByTestId('form');
});

test('form is disabled while submitting', async () => {
  const scope = nock(host)
    .get(requestPath)
    .reply(200, { contents: rss });

  userEvent.type(elements.input, url);
  expect(elements.submit).not.toBeDisabled();
  userEvent.click(elements.submit);
  expect(elements.submit).toBeDisabled();

  await waitFor(() => {
    expect(elements.submit).not.toBeDisabled();
  });

  await waitFor(() => {
    expect(screen.getByTestId('feedback')).toHaveTextContent('RSS успешно загружен');
  });
  scope.persist(false);
});

test('can add feeds and post', async () => {
  nock(host)
    .get(requestPath)
    .reply(200, { contents: rss });

  userEvent.type(elements.input, url);
  userEvent.click(elements.submit);

  await waitFor(() => {
    expect(screen.getByTestId('feedback')).toHaveTextContent('RSS успешно загружен');
  });

  const feed = 'Lorem ipsum feed for an interval of 1 minutes with 10 item(s)';
  await waitFor(() => {
    expect(screen.getByTestId('feeds')).toHaveTextContent(feed);
  });

  await waitFor(() => {
    const postsBox = screen.getByTestId('posts');
    const posts = postsBox.querySelectorAll('li');
    expect(posts).toHaveLength(10);
  });
});

test('modal show/hide', async () => {
  nock(host)
    .get(requestPath)
    .reply(200, { contents: rss });

  expect(screen.getByTestId('modal')).not.toHaveClass('show');
  userEvent.type(elements.input, url);
  userEvent.click(elements.submit);

  const viewButtons = await screen.findAllByText('Просмотр');
  fireEvent.click(viewButtons[0]);

  await waitFor(() => {
    expect(screen.getByTestId('modal')).toHaveClass('show');
  });
});

test('validate required', () => {
  userEvent.type(elements.input, 'failURL');
  userEvent.click(elements.submit);
  expect(screen.getByText('Ссылка должна быть валидным URL')).toBeInTheDocument();
});
