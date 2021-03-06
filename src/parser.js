import _ from 'lodash';

const parser = (data, url) => {
  const parserXML = new DOMParser();
  const document = parserXML.parseFromString(data, 'application/xml');
  if (document.querySelector('parsererror')) {
    throw Error('Ресурс не содержит валидный RSS');
  }
  const feedId = _.uniqueId();
  const titleFeed = document.querySelector('channel > title');
  const descriptionFeed = document.querySelector('channel > description');

  const posts = document.querySelectorAll('item');
  const parsedPosts = Array.from(posts)
    .map((post) => {
      const title = post.querySelector('title');
      const link = post.querySelector('link');
      const description = post.querySelector('description');
      return {
        feedId,
        id: _.uniqueId(),
        title: title.textContent,
        link: link.textContent,
        description: description.textContent,
        visited: false,
      };
    });

  return {
    feed: {
      url,
      feedId,
      title: titleFeed.textContent,
      description: descriptionFeed.textContent,
    },
    posts: parsedPosts,
  };
};

export default parser;
