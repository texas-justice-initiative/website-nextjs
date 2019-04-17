import React from 'react';
import HTMLParser from 'html-react-parser';

const parseContent = content => HTMLParser(content);

const Parser = props => <React.Fragment>{parseContent(props.children)}</React.Fragment>;

export default Parser;
