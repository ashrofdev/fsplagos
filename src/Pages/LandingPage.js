import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import { NavLink, useHistory } from 'react-router-dom';
import { firebaseAuth } from '../firebase';

const LandingPage = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)

    const signin = (e) => {
        e.preventDefault()
        setLoading(true)
        const email = e.target.email.value
        const password = e.target.password.value

        firebaseAuth.signInWithEmailAndPassword(email, password).then(e=>{
            history.push("/admin")
        })
    }
    return (
        <div className="landing">
            
            <form className="signin" onSubmit={signin}>
                <p>Enter Your email address and password</p>
                <div className="fields">
                    <input name="email" className="input" placeholder="Email"/> 
                    <input name="password" type="password" className="input" placeholder="Password"/> 
                    <NavLink to="/resetpassword" title="Forgot your password?"/>
                </div>
                <div className="cta">
                    {
                        loading ?
                        <button><FontAwesome size="1x" name="spinner" spin={true} /></button>:
                        <button>Log in</button>
                    }
                </div>
            </form>
        </div>
    );
};

export default LandingPage;