// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/posts/**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    authors: { type: 'list', of: { type: 'string' }, required: true },
    topics: { type: 'list', of: { type: 'string' }, required: false },
    hero: { type: 'string', required: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/post/${post._raw.flattenedPath}`,
    },
  },
}));

export const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: `blog/authors/**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    headshot: { type: 'string', required: false },
    biography: { type: 'string', required: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (author) => `/authors/${author._raw.flattenedPath}`,
    },
  },
}));

export const Topic = defineDocumentType(() => ({
  name: 'Topic',
  filePathPattern: `blog/topics/**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: false },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (topic) => `/topics/${topic._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Author, Topic],
});
