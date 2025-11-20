import React, { CSSProperties, ReactNode } from 'react';

import './Card.css';

type CardProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

const Card: React.FC<CardProps> = ({ className = '', style, children }) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
