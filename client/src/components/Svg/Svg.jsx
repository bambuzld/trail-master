import React from 'react'
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import icons from './iconManager';
import './Svg.scss'

const Svg = ({icon,className}) => {
    if (icon && icon !== '')
        return <SVG className={`svg ${className}`} src={icons[icon]} cacheGetRequests/>;
    return null;
}

Svg.defaultProps = {
    className: 'svg'
};
Svg.propTypes = {
    icon: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default Svg
