export default (error, elements) => {
  const { feedbackBox } = elements;
  if (!error) {
    feedbackBox.textContent = '';
    feedbackBox.classList.remove('text-danger');
    feedbackBox.classList.add('text-success');
    return;
  }

  feedbackBox.classList.add('text-danger');
  feedbackBox.textContent = error;
};
