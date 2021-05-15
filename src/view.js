import onChange from 'on-change';

const renderFeeds = (feeds, elements) => {
  const { feedsBox } = elements;
  feedsBox.textContent = '';
  const head = document.createElement('h2');
  head.textContent = 'Фиды';
  const list = document.createElement('ul');
  list.classList.add('list-group', 'mb-5');
  feedsBox.append(head, list);

  const listItems = feeds.map((feed) => {
    const { title, description } = feed;
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    const itemHead = document.createElement('h3');
    itemHead.textContent = title;
    const content = document.createElement('p');
    content.textContent = description;
    item.append(itemHead, content);
    return item;
  });
  list.append(...listItems);
};

const renderPosts = (posts, elements) => {
  const { postsBox } = elements;
  postsBox.innerHTML = '';
  const head = document.createElement('h2');
  head.textContent = 'Посты';
  const list = document.createElement('ul');
  list.classList.add('list-group');
  postsBox.append(head, list);

  const listItems = posts.map((post) => {
    const { title, link } = post;
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
    const itemLink = document.createElement('a');
    itemLink.setAttribute('href', link);
    itemLink.classList.add('font-weight-bold');
    itemLink.textContent = title;
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-primary', 'btn-sm');
    btn.textContent = 'Просмотр';
    listItem.append(itemLink, btn);
    return listItem;
  });

  list.append(...listItems);
};

const renderAppError = (error, elements) => {
  const { feedbackBox } = elements;
  feedbackBox.classList.add('text-danger');
  feedbackBox.textContent = error;
};

const renderForm = (form, elements) => {
  const { submitBtn, feedbackBox, input } = elements;
  switch (form.status) {
    case 'filling':
      submitBtn.removeAttribute('disabled');
      feedbackBox.classList.add('text-success');
      feedbackBox.textContent = 'RSS успешно загружен';
      input.value = '';
      break;
    case 'loading':
      submitBtn.setAttribute('disabled', true);
      feedbackBox.classList.remove('text-success', 'text-danger');
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

const renderFormError = (fields, elements) => {
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

const initView = (state, elements) => {
  const mapping = {
    error: () => renderAppError(state.error, elements),
    feeds: () => renderFeeds(state.feeds, elements),
    posts: () => renderPosts(state.posts, elements),
    'form.status': () => renderForm(state.form, elements),
    'form.fields.url': () => renderFormError(state.form.fields, elements),
  };

  const watchedState = onChange(state, (path) => {
    if (mapping[path]) {
      mapping[path]();
    }
  });
  return watchedState;
};

export default initView;
