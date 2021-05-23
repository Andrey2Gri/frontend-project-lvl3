export default (error, elements) => {
  const { feedbackBox } = elements;
  feedbackBox.classList.add('text-danger');
  feedbackBox.textContent = error;
};
