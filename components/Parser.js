/* eslint-disable react/destructuring-assignment */

import React from 'react';
import PropTypes from 'prop-types';
import HTMLParser from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';

const parseContent = content => HTMLParser(sanitizeHtml(content));

const Parser = props => <React.Fragment>{parseContent(props.children)}</React.Fragment>;

export default Parser;

Parser.propTypes = {
  children: PropTypes.string,
};
