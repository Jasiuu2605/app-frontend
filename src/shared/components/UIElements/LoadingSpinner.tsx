import React from 'react';

import './LoadingSpinner.css';

type LoadingSpinnerProps = {
  asOverlay?: boolean;
};

function LoadingSpinner(props: LoadingSpinnerProps) {
  const classes = props.asOverlay ? 'loading-spinner__overlay' : '';

  return (
    <div className={classes}>
      <div className='lds-dual-ring'></div>
    </div>
  );
}

export default LoadingSpinner;
