import * as React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import MarkdownIt from 'markdown-it';
import Parser from './Parser';

const md = new MarkdownIt();

export default function Accordion({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <MuiAccordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography style={{ fontWeight: 600, fontSize: '16px' }}>{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: '14px' }}>
              <Parser>{md.renderInline(item.description)}</Parser>
            </Typography>
          </AccordionDetails>
        </MuiAccordion>
      ))}
    </div>
  );
}

Accordion.propTypes = {
  items: PropTypes.array.isRequired,
};
