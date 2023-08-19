import fs from 'fs';
import matter from 'gray-matter';

/**
 * Get frontmatter and body from markdown files in a folder
 * @param pathToFiles string
 * @returns object
 */
function useMarkdownFiles(pathToFiles: string) {
  // List all files
  const files = fs.readdirSync(pathToFiles);

  console.log({ files });

  debugger;
  // Get the front matter and slug (the filename without .md) of all files
  const data = files.map((filename) => {
    const file = fs.readFileSync(`${pathToFiles}${filename}`, 'utf8');
    const matterData = matter(file);

    return {
      attributes: matterData.data,
      markdownBody: matterData.content,
      slug: filename.slice(0, filename.indexOf('.')),
    };
  });

  return { data };
}

export default useMarkdownFiles;
