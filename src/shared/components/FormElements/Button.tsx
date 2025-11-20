import React, { ReactNode, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

type ButtonProps = {
  children?: ReactNode;
  size?: 'small' | 'default' | 'big' | string;
  inverse?: boolean;
  danger?: boolean;
  href?: string;
  to?: string;
  exact: boolean;
  type?: 'button' | 'submit' | 'reset';
  onCLick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

function Button(props: ButtonProps) {
  const classes = `button button--${props.size || 'default'} ${
    props.inverse && 'button--inverse'
  } ${props.danger && 'button--danger'}`;

  if (props.href) {
    return (
      <a href={props.href} className={classes}>
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link
        to={props.to}
        {...(props.exact ? { exact: true } : {})}
        className={classes}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      type={props.type}
      onClick={props.onCLick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
