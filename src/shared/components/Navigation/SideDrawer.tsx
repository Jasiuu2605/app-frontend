import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import './SideDrawer.css';

type SideDrawerProps = {
  children: ReactNode;
  onClick?: () => void;
};

function SideDrawer(props: SideDrawerProps) {
  const content = (
    <aside onClick={props.onClick} className='side-drawer'>
      {props.children}
    </aside>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById('drawer-hook') as HTMLElement
  );
}

export default SideDrawer;
