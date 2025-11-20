import React, { MouseEvent } from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

type BackdropProps = {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

function Backdrop(props: BackdropProps) {
  const backdropHook = document.getElementById('backdrop-hook');

  if (!backdropHook) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className='backdrop' onClick={props.onClick}></div>,
    backdropHook
  );
}

export default Backdrop;
