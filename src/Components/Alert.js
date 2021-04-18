import React from 'react';
import Fade from 'react-reveal/Fade'
import FontAwesome from 'react-fontawesome';

const Alert = ({type, message, details}) => {
    return (
        <Fade top>  
            {
                type==='positive'?
                <div className="alert">
                    <FontAwesome style={{color:"green"}} className="font" name="check-circle"/>
                    <p className="message">{message}</p>
                </div>:
                <div className="alert">
                    <FontAwesome style={{color:"red"}} className="font" name="exclamation-triangle"/>
                    <p className="message">{message}</p>
                </div>
            }
        </Fade>  
    );
};

export default Alert;