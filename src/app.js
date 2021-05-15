import axios from 'axios';
import * as yup from 'yup';

import parse from './parser.js';
import initView from './view.js';

const loadRss = (url) => axios
  .get(`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(url)}`);

const validate = (value, links) => {
  const schema = yup
    .string()
    .required()
    .url('Ссылка должна быть валидным URL');

  try {
    schema.validateSync(value);
    if (links.includes(value)) {
      throw Error('RSS уже существует');
    }
    return null;
  } catch (err) {
    return err.message;
  }
};

const app = () => {
  const state = {
    form: {
      status: 'filling',
      fields: {
        url: {
          error: null,
          valid: true,
        },
      },
    },
    error: null,
    feeds: [],
    posts: [],
    links: [],
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('.rss-input'),
    submitBtn: document.querySelector('.rss-submit'),
    feedbackBox: document.querySelector('.feedback'),
    feedsBox: document.querySelector('.feeds'),
    postsBox: document.querySelector('.posts'),
  };

  const watched = initView(state, elements);

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const url = formData.get('url');

    const error = validate(url, watched.links);
    if (error) {
      watched.form.fields.url = {
        error,
        valid: false,
      };
      return;
    }

    watched.form.fields.url = {
      error,
      valid: true,
    };
    watched.error = null;
    watched.links.push(url);
    watched.form.status = 'loading';

    loadRss(url)
      .then((response) => {
        const { feed, posts } = parse(response.data.contents);
        watched.feeds = [feed, ...watched.feeds];
        watched.posts = [...posts, ...watched.posts];
        watched.form.status = 'filling';
      })
      .catch((err) => {
        watched.form.status = 'failed';
        watched.error = err.message;
      });
  });
};

export default app;
