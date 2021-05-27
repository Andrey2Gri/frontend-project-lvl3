/* eslint-disable no-param-reassign */
import validate from '../validate.js';
import getData from '../getData.js';
import updatePosts from '../updatePosts.js';

export default (state, i18nInstance) => (e) => {
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
    .then((data) => {
      const { feed, posts } = data;
      state.feeds = [feed, ...state.feeds];
      state.posts = [...posts, ...state.posts];
      state.links.push(url);
      state.form.status = 'filling';
      updatePosts(state, url);
    })
    .catch(({ message }) => {
      state.form.status = 'failed';
      state.error = message === 'Network Error' ? i18nInstance.t('networkError') : message;
    });
};
