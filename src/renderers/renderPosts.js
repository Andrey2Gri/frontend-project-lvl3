const getListItems = (state, i18nInstance) => state.posts.map((post) => {
  const {
    title,
    link,
    id,
    visited,
  } = post;
  const listItem = document.createElement('li');
  listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
  const itemLink = document.createElement('a');
  itemLink.setAttribute('href', link);
  itemLink.setAttribute('target', '_blank');
  itemLink.dataset.id = id;
  if (visited) {
    itemLink.classList.add('fw-normal');
  } else {
    itemLink.classList.add('fw-bold');
  }
  itemLink.textContent = title;
  const btn = document.createElement('button');
  btn.dataset.id = id;
  btn.classList.add('btn', 'btn-primary', 'btn-sm');
  btn.textContent = i18nInstance.t('buttons.view');
  listItem.append(itemLink, btn);
  return listItem;
});

export default (state, elements, i18nInstance) => {
  const { postsBox } = elements;
  postsBox.innerHTML = '';
  const head = document.createElement('h2');
  head.textContent = i18nInstance.t('posts');
  const listPosts = document.createElement('ul');
  listPosts.classList.add('list-group');
  postsBox.append(head, listPosts);
  const listPostsItems = getListItems(state, i18nInstance);
  listPosts.append(...listPostsItems);
};
