import React, { CSSProperties } from 'react';

import './Avatar.css';

type AvatarProps = {
  className?: string;
  style?: CSSProperties;
  image: string;
  alt?: string;
  width?: string | number;
};

function Avatar(props: AvatarProps) {
  return (
    <div className={`avatar ${props.className || ''}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
}

export default Avatar;
