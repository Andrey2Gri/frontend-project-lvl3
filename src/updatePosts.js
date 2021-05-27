/* eslint-disable no-param-reassign */
import getData from './getData.js';

const callback = (state, url) => getData(url)
  .then((data) => {
    const { posts } = data;
    const links = state.posts.map(({ link }) => link);
    const newPosts = posts.filter((post) => !links.includes(post.link));
    if (newPosts.length > 0) {
      state.posts = [...newPosts, ...state.posts];
    }
    return setTimeout(callback, 5000, state, url);
  })
  .catch((e) => {
    throw e;
  });

export default (state, url) => setTimeout(callback, 5000, state, url);
