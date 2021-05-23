/* eslint-disable no-param-reassign */
import validate from '../validate.js';
import parse from '../parser.js';
import getData from '../getData.js';

export default (state) => (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const url = formData.get('url');
  const error = validate(url, state.links);

  if (error) {
    state.form.fields.url = {
      error,
      valid: false,
    };
    return;
  }

  state.form.fields.url = {
    error,
    valid: true,
  };
  state.error = null;
  state.form.status = 'loading';

  getData(url)
    .then((response) => {
      const { feed, posts } = parse(response.data.contents);
      state.feeds = [feed, ...state.feeds];
      state.posts = [...posts, ...state.posts];
      state.links.push(url);
      state.form.status = 'filling';
    })
    .catch((err) => {
      state.form.status = 'failed';
      state.error = err.message;
    });
};
