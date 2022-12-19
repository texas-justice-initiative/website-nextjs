import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Modal = (props) => {
  const { title, description, button, children, onClose } = props;

  // Allow esc key to close form
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  // Handles user declining to fill out form
  const cancelForm = () => {
    onClose();
  };

  return (
    <Container onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="tji-modal">
        <div className="tji-modal__close" role="button" tabIndex={0} onClick={cancelForm} onKeyDown={handleKeyDown}>
          ⓧ
        </div>
        {title && <h2 className="tji-modal__title">{title}</h2>}
        <div className="tji-modal__description">
          {description && description}
          {children && children}
        </div>
        <div className="tji-modal__actions">
          {button && (
            <button type="button" className="btn btn--primary" onClick={button.clickFunction}>
              {button.text}
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};
export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.object,
  children: PropTypes.element,
  onClose: PropTypes.func,
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
    background: ${(props) => props.theme.colors.black};
    opacity: 0.25;
    z-index: 98;
  }
  .tji-modal {
    background: ${(props) => props.theme.colors.white};
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    padding: 4rem;
    margin: 0 2rem;
    z-index: 99;
    width: 450px;
    position: relative;
  }
  .tji-modal__title,
  .tji-modal__actions {
    text-align: center;
  }
  .tji-modal__actions {
    margin-top: 2rem;
  }
  .tji-modal__description {
    text-align: left;
    margin: 2.4rem 0;
  }
  .tji-modal__close {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    color: ${(props) => props.theme.colors.gray};
    cursor: pointer;
  }
`;
