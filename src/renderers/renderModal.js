import $ from 'jquery';

export default (state, elements) => {
  const { modal, postId, posts } = state;
  const { modalTitle, modalBody, modalBtnRead } = elements;
  if (!modal) {
    $('#modal').modal('hide');
    return;
  }
  const { title, link, description } = posts.find(({ id }) => postId === id);
  modalTitle.textContent = title;
  modalBody.textContent = description;
  modalBtnRead.setAttribute('href', link);
  $('#modal').modal('show');
};
