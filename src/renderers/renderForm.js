export default (form, elements) => {
  const { submitBtn, input } = elements;
  switch (form.status) {
    case 'filling':
      submitBtn.removeAttribute('disabled');
      input.removeAttribute('readonly');
      input.value = '';
      input.focus();
      break;
    case 'loading':
      submitBtn.setAttribute('disabled', true);
      input.setAttribute('readonly', true);
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
