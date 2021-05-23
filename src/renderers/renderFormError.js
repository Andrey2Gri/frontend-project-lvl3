export default (fields, elements) => {
  const { error, valid } = fields.url;
  const { input, feedbackBox } = elements;
  if (valid) {
    input.classList.remove('is-invalid');
    feedbackBox.classList.remove('text-danger');
    feedbackBox.textContent = '';
  } else {
    input.classList.add('is-invalid');
    feedbackBox.classList.add('text-danger');
    feedbackBox.textContent = error;
  }
};
