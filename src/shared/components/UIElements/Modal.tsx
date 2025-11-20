import React, { ReactNode, CSSProperties, FormEvent, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';

import './Modal.css';

type ModalOverlayProps = {
  className?: string;
  style?: CSSProperties;
  headerClass?: string;
  header?: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  contentCLass?: string; // literówka z oryginału zachowana
  children?: ReactNode;
  footerClass?: string;
  footer?: ReactNode;
};

function ModalOverlay(props: ModalOverlayProps) {
  const modalHook = document.getElementById('modal-hook');

  if (!modalHook) {
    return null;
  }

  const content = (
    <div className={`modal ${props.className || ''}`} style={props.style}>
      <header className={`modal__header ${props.headerClass || ''}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit
            ? props.onSubmit
            : (event: FormEvent<HTMLFormElement>) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentCLass || ''}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass || ''}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, modalHook);
}

type ModalProps = ModalOverlayProps & {
  show: boolean;
  onCancel?: (event: MouseEvent<HTMLDivElement>) => void;
};

function Modal(props: ModalProps) {
  const { show, onCancel, ...overlayProps } = props;

  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames='modal'
      >
        <ModalOverlay {...overlayProps} />
      </CSSTransition>
    </>
  );
}

export default Modal;
