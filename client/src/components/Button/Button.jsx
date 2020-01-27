import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Button.scss';

const renderButton = ({
  href,
  external,
  onClick,
  label,
  disabled,
  submit,
  className,
  externalTarget
}) => {
  if (href && href !== '') {
    if (external) {
      return (
        <a
          href={href}
          target={externalTarget || undefined}
          rel="noopener noreferrer"
          //   aria-label={ariaLabel}
          className={className || ''}
          // ref={this.button}
          onClick={onClick}
        >
          {this.handleIcon()}
        </a>
      );
    }

    return (
      <Link
        to={href}
        // aria-label={ariaLabel}
        className={className || ''}
        // ref={this.button}
        onClick={onClick}
      >
        {label}
      </Link>
    );
  }
  if (submit) {
    return (
      <button
        type="submit"
        // aria-label={ariaLabel}
        className={className || ''}
        disabled={disabled}
        ref={this.button}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
};

const Button = ({
  size,
  color,
  variation,
  href,
  external,
  externalTarget,
  loading,
  label,
  onClick,
  className,
  disabled,
  submit
}) => {
  //set class
  const [clx, setClx] = useState('button');
  useEffect(() => {
    setClx(`button ${className}`);

    if (variation && variation === 'secondary') {
      setClx(`${clx} button--secondary `);
    }

    if (variation && variation === 'tertiary') {
      setClx(`${clx} button--tertiary `);
    }

    if (size && size === 'small') {
      setClx(`${clx} button--small`);
    }
    if (disabled) {
      setClx(`${clx} button--disabled`);
    }
  }, [
    size,
    color,
    variation,
    href,
    external,
    externalTarget,
    loading,
    label,
    onClick,
    className,
    disabled,
    submit
  ]);

  if (loading === true) {
    return <p>...loading</p>;
  }
  return renderButton({
    href,
    external,
    onClick,
    label,
    disabled,
    submit,
    clx,
    externalTarget
  });
};

Button.defaultProps = {
  size: '',
  color: '',
  variation: '',
  href: '',
  external: false,
  externalTarget: '',
  loading: false,
  label: '',
  onClick: () => {},
  submit: false,
  disabled: false
};

Button.PropTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  variation: PropTypes.oneOfType([PropTypes.string]),
  href: PropTypes.string,
  externalTarget: PropTypes.string,
  external: PropTypes.bool,
  loading: PropTypes.bool,
  label: PropTypes.string,
  onClick: PropTypes.func,
  submit: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Button;
