import axios from 'axios';
import parse from './parser.js';

const routes = {
  allOrigins: (url) => {
    const result = new URL('/get', 'https://hexlet-allorigins.herokuapp.com');
    result.searchParams.set('url', url);
    result.searchParams.set('disableCache', 'true');
    return result.toString();
  },
};

export default (url) => axios
  .get(routes.allOrigins(url))
  .then((response) => parse(response.data.contents))
  .catch((e) => {
    throw e;
  });
