import axios from 'axios';
import parse from './parser.js';

export default (url) => axios
  .get(`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(url)}`)
  .then((response) => parse(response.data.contents))
  .catch((e) => {
    throw e;
  });
