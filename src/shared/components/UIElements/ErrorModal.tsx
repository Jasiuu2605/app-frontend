import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

type ErrorModalProps = {
  error?: string | null;
  onClear: () => void;
};

function ErrorModal(props: ErrorModalProps) {
  return (
    <Modal
      onCancel={props.onClear}
      header='An Error Occurred!'
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
}

export default ErrorModal;
