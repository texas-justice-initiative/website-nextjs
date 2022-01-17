import styled from 'styled-components';
import PropTypes from 'prop-types';

function BlogFilters({ authors, handleSelectAuthors }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }} id="authors-filters">
      <h3>View Posts by Author:</h3>

      {authors.map((author, key) => (
        <Label htmlFor={author.name} key={key}>
          <input
            type="checkbox"
            name={author.name}
            id={author.name}
            className="authors-filters__filter"
            onClick={() => handleSelectAuthors()}
          />{' '}
          {author.name}
        </Label>
      ))}
    </div>
  );
}

export default BlogFilters;

BlogFilters.propTypes = {
  authors: PropTypes.object,
  handleSelectAuthors: PropTypes.func,
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
