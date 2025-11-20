import React, { CSSProperties, ReactNode } from 'react';

import './Card.css';

type CardProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

function Card({ className = '', style, children }: CardProps) {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
}

export default Card;
