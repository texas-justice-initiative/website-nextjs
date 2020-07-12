import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Modal = props => {
  const [active, setActive] = React.useState(true);
  const { children } = props;

  // Allow esc key to close form
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      setActive(false);
    }
  };

  // Handles user declining to fill out form
  const cancelForm = () => {
    setActive(false);
  };

  if (!active) {
    return null;
  }

  return (
    <Container onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="tji-modal">
        <div className="tji-modal__close" role="button" tabIndex={0} onClick={cancelForm} onKeyDown={handleKeyDown}>
          ⓧ
        </div>
        {children && children}
      </div>
    </Container>
  );
};
export default Modal;

Modal.propTypes = {
  children: PropTypes.element,
};

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 97;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${props => props.theme.colors.black};
    opacity: 0.25;
    z-index: 98;
  }
`;
