export default (status, elements, i18nInstance) => {
  const { feedbackBox } = elements;
  if (status === 'filling') {
    feedbackBox.classList.add('text-success');
    feedbackBox.textContent = i18nInstance.t('success');
  }
};
