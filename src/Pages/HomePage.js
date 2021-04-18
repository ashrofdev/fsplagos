import React, { useEffect, useState } from 'react';
import Register from '../Components/Register';
import Table from '../Components/Table'
import Alert from '../Components/Alert'

const HomePage = () => {
    const [alert, setAlert] = useState({
        status: false,
        type: 'positive',
        message: ''
    })


    return (
        <div className="homepage">
            {
                alert.status?
                <Alert type={alert.type} message={alert.message} />:null
            }
            <header>
                <div className="left">
                    <h2 className="heading">Freedom Synergy Pro</h2>
                </div>
                <div className="right">

                </div>
            </header>
            <div className="body">
                <div className="cont">
                    
                    <Table/>
                    <Register/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;