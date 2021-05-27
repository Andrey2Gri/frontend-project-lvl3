/* eslint-disable no-param-reassign */
export default (state) => (e) => {
  state.postId = !state.modal ? e.target.dataset.id : null;
  state.modal = !state.modal;
};
