import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'



const renderElement =() => {

}

const Button = ({
    href,
    disabled,
    label,
    onClick,
    external,
    iconName
}) => {
    return (
        <div>
            
        </div>
    )
}


Button.defaultProps = {
    href: '',
    disabled: false,
    label: '',
    onClick: ()=>{},
    external: ''
}

Button.PropTypes={
    href: PropTypes.string,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    onClick: PropTypes.func,
    external: PropTypes.string
}

export default Button