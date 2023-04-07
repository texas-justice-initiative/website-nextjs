import { React } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import slugify from './utils/slugify'

const styles = {
  padding: '0.5rem 2rem',
  marginRight: '1rem',
  borderRadius: '3px',
  textDecoration: 'none',
}

function TopicButton({ topic }) {
  const slug = slugify(topic)
  return (
    <Link
      href={`/topics/${slug}`}
      className="topic-button btn--primary"
      style={styles}
    >
      {topic}
    </Link>
  )
}

TopicButton.propTypes = {
  topic: PropTypes.string.isRequired,
}

export default TopicButton
