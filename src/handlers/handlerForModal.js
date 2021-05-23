export default (state) => (e) => {
  // eslint-disable-next-line no-param-reassign
  state.postId = !state.modal ? e.target.dataset.id : null;
  // eslint-disable-next-line no-param-reassign
  state.modal = !state.modal;
  console.log(state);
};
