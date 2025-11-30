import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  to?: string;
  exact?: boolean;
  size?: string;
  inverse?: boolean;
  danger?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
};

function Button(props: ButtonProps) {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || 'default'} ${
          props.inverse ? 'button--inverse' : ''
        } ${props.danger ? 'button--danger' : ''}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`button button--${props.size || 'default'} ${
          props.inverse ? 'button--inverse' : ''
        } ${props.danger ? 'button--danger' : ''}`}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={`button button--${props.size || 'default'} ${
        props.inverse ? 'button--inverse' : ''
      } ${props.danger ? 'button--danger' : ''}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
