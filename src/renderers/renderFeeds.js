export default (feeds, elements, i18nInstance) => {
  const { feedsBox } = elements;
  feedsBox.textContent = '';
  const head = document.createElement('h2');
  head.textContent = i18nInstance.t('feeds');
  const listFeeds = document.createElement('ul');
  listFeeds.classList.add('list-group', 'mb-5');
  feedsBox.append(head, listFeeds);

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
  listFeeds.append(...listItems);
};
