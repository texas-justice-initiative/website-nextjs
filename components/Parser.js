/* eslint-disable react/destructuring-assignment */

import React from 'react'
import PropTypes from 'prop-types'
import HTMLParser from 'html-react-parser'
import sanitizeHtml from 'sanitize-html'

// NOTE: sanitizeHtml strips img tags by default
// See the default options at https://www.npmjs.com/package/sanitize-html#what-are-the-default-options
const parseContent = (content) =>
  HTMLParser(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  })
const Parser = (props) => <>{parseContent(props.children)}</>

export default Parser

Parser.propTypes = {
  children: PropTypes.string,
}
