export function filterPosts(posts: any[], topics: any[], authors: any[]) {
  return posts.filter((post) => {
    let inTopic = false;
    let hasAuthor = false;

    if (topics.length !== 0) {
      topics.forEach((topic) => {
        if (post.topics.indexOf(topic.title) !== -1) {
          inTopic = true;
        }
      });
    } else {
      inTopic = true;
    }

    if (authors.length !== 0) {
      authors.forEach((author) => {
        if (post.authors.indexOf(author.title) !== -1) {
          hasAuthor = true;
        }
      });
    } else {
      hasAuthor = true;
    }

    return inTopic && hasAuthor;
  });
}

export default filterPosts;
