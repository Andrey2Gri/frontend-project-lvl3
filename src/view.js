import onChange from 'on-change';
import {
  renderAppError,
  renderFeeds,
  renderPosts,
  renderForm,
  renderModal,
  renderFormError,
  renderFeedback,
} from './renderers';

const initView = (state, elements, i18nInstance) => {
  const mapping = {
    error: () => renderAppError(state.error, elements, i18nInstance),
    feeds: () => renderFeeds(state.feeds, elements, i18nInstance),
    posts: () => renderPosts(state, elements, i18nInstance),
    'form.status': () => {
      renderForm(state.form, elements, i18nInstance);
      renderFeedback(state.form.status, elements, i18nInstance);
    },
    'form.fields.url': () => renderFormError(state.form.fields, elements),
    modal: () => renderModal(state, elements),
  };

  const watchedState = onChange(state, (path) => {
    if (mapping[path]) {
      mapping[path]();
    }
  });

  return watchedState;
};

export default initView;
