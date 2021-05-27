export default (form, elements, i18nInstance) => {
  const { submitBtn, feedbackBox, input } = elements;
  switch (form.status) {
    case 'filling':
      submitBtn.removeAttribute('disabled');
      feedbackBox.classList.add('text-success');
      feedbackBox.textContent = i18nInstance.t('success');
      input.value = '';
      input.removeAttribute('readonly');
      break;
    case 'loading':
      submitBtn.setAttribute('disabled', true);
      feedbackBox.classList.remove('text-success', 'text-danger');
      input.setAttribute('readonly', true);
      feedbackBox.textContent = '';
      break;
    case 'failed':
      submitBtn.removeAttribute('disabled');
      input.removeAttribute('readonly');
      input.select();
      break;
    default:
      throw Error(`Unknown form status: ${form.status}`);
  }
};
