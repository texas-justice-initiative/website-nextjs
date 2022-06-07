/**
 * A simple utility to convert any string to url friendly slug.
 *
 * @param {string} str
 * @returns string
 */
export default function slugify(str) {
  let slug = str.toLowerCase();
  slug = slug.replace(/[^a-z0-9]+/g, '-');
  slug = slug.replace(/^-+|-+$/g, '');
  return slug;
}
