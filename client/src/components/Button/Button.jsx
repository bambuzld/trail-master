import React, { useState } from "react";
import './Button.scss'
import propTypes from 'prop-types'


const  Button = ({size,variant, label, onClick}) => {
  const [buttonSize] = useState(size);
  const [buttonVariant] = useState(variant);
  return (
    <button
      className={`button ${buttonVariant} ${buttonSize}`}
      onClick={onClick}
      data-testid = 'button'
    >
      {label}
    </button>
  );
}


Button.defaultProps = {
  size: '',
  variant: 'primary',
  label: '',
  onClick: () => {}
}

Button.propTypes = {
  size: propTypes.string,
  variant: propTypes.string,
  label: propTypes.string,
  onClick: propTypes.func
};

export default Button;