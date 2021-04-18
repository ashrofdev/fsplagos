import React from 'react';
import Register from '../Components/Register';
import Table from '../Components/Table'

const HomePage = () => {

  

    return (
        <div className="homepage">
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