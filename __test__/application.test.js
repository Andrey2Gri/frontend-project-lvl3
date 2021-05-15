import '@testing-library/jest-dom';
import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import fs from 'fs';
import path from 'path';
import nock from 'nock';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/dom';

import run from '../src/app';

const pathToIndex = path.join('__fixtures__', 'index.html');
const initialHtml = fs.readFileSync(pathToIndex, 'utf-8');
const pathToRss = path.join('__fixtures__', 'rss.xml');
const rss = fs.readFileSync(pathToRss, 'utf-8');
const elements = {};

axios.defaults.adapter = adapter;
const host = 'http://lorem-rss.herokuapp.com';
const requestPath = '/feed';

beforeAll(() => {
  nock.disableNetConnect();
});

beforeEach(() => {
  document.body.innerHTML = initialHtml;
  run();

  elements.submit = screen.getByRole('button');
  elements.input = screen.getByRole('textbox');
});

test('form is disabled while submitting', async () => {
  nock(host)
    .get(requestPath)
    .reply(200, { contents: rss });

  userEvent.type(elements.input, `${host}${requestPath}`);
  expect(elements.submit).not.toBeDisabled();
  userEvent.click(elements.submit);
  expect(elements.submit).toBeDisabled();

  await waitFor(() => {
    expect(elements.submit).not.toBeDisabled();
  });
});

test('validate required', () => {
  userEvent.type(elements.input, 'failURL');
  userEvent.click(elements.submit);
  expect(screen.getByText('Ссылка должна быть валидным URL')).toBeInTheDocument();
});
