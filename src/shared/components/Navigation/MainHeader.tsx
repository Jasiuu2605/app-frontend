import React, { ReactNode } from 'react';

import './MainHeader.css';

type MainHeaderProps = {
  children: ReactNode;
};

function MainHeader(props: MainHeaderProps) {
  return <header className='main-header'>{props.children}</header>;
}

export default MainHeader;
