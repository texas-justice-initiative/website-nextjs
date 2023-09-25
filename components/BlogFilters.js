import styled from 'styled-components';
import PropTypes from 'prop-types';

function BlogFilters({
  authors,
  handleSelectAuthors,
  topics,
  handleSelectTopics,
}) {
  return (
    <>
      {topics && (
        <div style={{ display: 'flex', flexWrap: 'wrap' }} id="topics-filters">
          <h3>Filter Posts by Topic:</h3>

          {topics.map((topic, key) => (
            <Label htmlFor={topic.title} key={key}>
              <input
                type="checkbox"
                name={topic.title}
                id={topic.title}
                className="topics-filters__filter"
                onClick={() => handleSelectTopics()}
              />{' '}
              {topic.title}
            </Label>
          ))}
        </div>
      )}
      {authors && (
        <div style={{ display: 'flex', flexWrap: 'wrap' }} id="authors-filters">
          <h3>Filter Posts by Author:</h3>

          {authors.map((author, key) => (
            <Label htmlFor={author.title} key={key}>
              <input
                type="checkbox"
                name={author.title}
                id={author.title}
                className="authors-filters__filter"
                onClick={() => handleSelectAuthors()}
              />{' '}
              {author.title}
            </Label>
          ))}
        </div>
      )}
    </>
  );
}

export default BlogFilters;

BlogFilters.propTypes = {
  authors: PropTypes.array,
  handleSelectAuthors: PropTypes.func,
  topics: PropTypes.array,
  handleSelectTopics: PropTypes.func,
};

const Label = styled.label`
  flex: 1 0 100%;
  margin: 0.25em 0;

  &:first-of-type {
    margin-top: 1em;
  }

  &:last-of-type {
    margin-bottom: 3em;
  }
`;
