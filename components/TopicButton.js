import { React } from 'react';
import PropTypes from 'prop-types';
import slugify from './utils/slugify';
import Button from '@/components/Button';

const styles = {
  padding: '0.5rem 2rem',
  marginRight: '1rem',
  borderRadius: '3px',
  textDecoration: 'none',
  fontSize: '12px',
};

function TopicButton({ topic }) {
  const slug = slugify(topic);
  return (
    <Button href={`/topics/${slug}`} style={styles}>
      {topic}
    </Button>
  );
}

TopicButton.propTypes = {
  topic: PropTypes.string.isRequired,
};

export default TopicButton;
