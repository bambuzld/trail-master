import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const FloatingNotification = () => {
    return (
        <div className="floating-notifications">
            <ReactCSSTransitionGroup
                    transitionName="notification--transition"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <p style={{color: 'red'}}>notificka</p>
                </ReactCSSTransitionGroup>
        </div>
    )
}

export default FloatingNotification
