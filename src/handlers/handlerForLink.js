/* eslint-disable no-param-reassign */
export default (state) => (e) => {
  const currentPostId = e.target.dataset.id;
  const updatedPosts = state.posts.map((post) => {
    if (post.id === currentPostId) {
      post.visited = true;
    }
    return post;
  });
  state.posts = updatedPosts;
};
