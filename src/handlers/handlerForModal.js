/* eslint-disable no-param-reassign */
export default (state) => (e) => {
  if (e.target.nodeName.toLowerCase() !== 'button') {
    e.stopPropagation();
    return;
  }
  const currentPostId = e.target.dataset.id;
  state.postId = !state.modal ? currentPostId : null;
  state.modal = !state.modal;
};
