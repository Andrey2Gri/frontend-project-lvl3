import { setLocale } from 'yup';
import i18n from 'i18next';
import 'bootstrap/js/dist/modal';

import ru from './locales/ru.js';
import initView from './view.js';
import { handlerForModal, handlerForForm, handlerForLink } from './handlers';

const app = () => {
  const state = {
    form: {
      status: 'filling',
      fields: {
        url: {
          error: null,
          valid: true,
        },
      },
    },
    error: null,
    modal: false,
    postId: null,
    feeds: [],
    posts: [],
  };

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('.rss-input'),
    submitBtn: document.querySelector('.rss-submit'),
    feedbackBox: document.querySelector('.feedback'),
    feedsBox: document.querySelector('.feeds'),
    postsBox: document.querySelector('.posts'),
    modal: document.querySelector('.modal'),
    modalTitle: document.querySelector('.modal-title'),
    modalBody: document.querySelector('.modal-body'),
    modalBtnRead: document.querySelector('.modal-footer a'),
    modalHeaderBtnClose: document.querySelector('.modal-header .close'),
    modalFooterBtnClose: document.querySelector('.modal-footer button'),
  };

  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  }).then(() => {
    setLocale({
      mixed: {
        notOneOf: () => i18nInstance.t('errors.rssExists'),
      },
      string: {
        url: () => i18nInstance.t('errors.invalidURL'),
      },
    });
  });

  const watched = initView(state, elements, i18nInstance);

  elements.form.addEventListener('submit', handlerForForm(watched, i18nInstance));
  elements.postsBox.addEventListener('click', handlerForLink(watched));
  elements.postsBox.addEventListener('click', handlerForModal(watched));
  elements.modalHeaderBtnClose.addEventListener('click', handlerForModal(watched));
  elements.modalFooterBtnClose.addEventListener('click', handlerForModal(watched));
};

export default app;
