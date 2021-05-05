import fs from 'fs';
import path from 'path';
import nock from 'nock';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/dom';

import run from '../src/app';

const pathToIndex = path.join('__fixtures__', 'index.html');
const initialHtml = fs.readFileSync(pathToIndex, 'utf-8');

beforeAll(() => {
  nock.disableNetConnect();
});

beforeEach(() => {
  document.body.innerHTML = initialHtml;
  run();
});

test('first test', () => {
  const name = 'RSS test!';
  expect(screen.getByRole('heading')).toHaveTextContent(name);
});
