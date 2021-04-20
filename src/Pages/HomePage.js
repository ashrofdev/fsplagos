import React, { useEffect, useState } from 'react';
import Register from '../Components/Register';
import Table from '../Components/Table'
import Alert from '../Components/Alert'
import Encashments from './Encashments';
import FontAwesome from 'react-fontawesome';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';

const HomePage = () => {
    const [alert, setAlert] = useState({
        status: false,
        type: 'positive',
        message: ''
    })


    return (
        <div className="homepage">
            <BrowserRouter>
                {
                    alert.status?
                    <Alert type={alert.type} message={alert.message} />:null
                }
                <header>
                    <div className="left">
                        <NavLink to="/"><h2 className="heading">Freedom Synergy Pro</h2></NavLink>
                    </div>
                    <div className="right">
                        <NavLink to="/encashments"><FontAwesome size="2x" name="money" /></NavLink>
                    </div>
                </header>
                <div className="body">
                    <div className="cont">
                        
                        {/* <Table/> */}
                            <Switch>
                                <Route path="/encashments" component={Encashments}/>
                                <Route path="/" component={Table}/>
                            </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default HomePage;