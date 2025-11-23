import React, { useReducer, useEffect, ChangeEvent, FocusEvent } from 'react';

import { validate } from '../../util/validators';

import './Input.css';

type Validator = unknown;

type InputProps = {
  id: string;
  element: 'input' | 'textarea';
  type?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  errorText?: string;

  value?: string;
  valid?: boolean;
  validators?: Validator[];

  onInput: (id: string, value: string, isValid: boolean) => void;
};

type InputState = {
  value: string;
  isTouched: boolean;
  isValid: boolean;
};

type InputAction =
  | { type: 'CHANGE'; val: string; validators?: Validator[] }
  | { type: 'TOUCH' };

function inputReducer(state: InputState, action: InputAction): InputState {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
}

function Input(props: InputProps) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || '',
    isTouched: false,
    isValid: props.valid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const element =
    props.element === 'textarea' ? (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}

export default Input;
