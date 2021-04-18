import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade'
import FontAwesome from 'react-fontawesome';

const Alert = ({type, message, details}) => {
    const [status, setStatus] = useState(true)

    useEffect(()=> {
        setStatus(true)
    }, [])

    setTimeout(() => {
        setStatus(false)
    }, 10000);
    return (
        <div>
            {
                status?
                <Fade right>  
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
                </Fade>:null
            }
        </div>
    );
};

export default Alert;