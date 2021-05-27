export default (form, elements, i18nInstance) => {
  const { submitBtn, feedbackBox, input } = elements;
  switch (form.status) {
    case 'filling':
      submitBtn.removeAttribute('disabled');
      feedbackBox.classList.add('text-success');
      feedbackBox.textContent = i18nInstance.t('success');
      input.value = '';
      input.readOnly = false;
      break;
    case 'loading':
      submitBtn.setAttribute('disabled', true);
      feedbackBox.classList.remove('text-success', 'text-danger');
      input.readOnly = true;
      feedbackBox.textContent = '';
      break;
    case 'failed':
      submitBtn.removeAttribute('disabled');
      input.select();
      break;
    default:
      throw Error(`Unknown form status: ${form.status}`);
  }
};
