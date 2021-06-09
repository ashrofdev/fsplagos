import React, { useEffect, useState } from 'react';
import Register from '../Components/Register';
import Table from '../Components/Table'
import Alert from '../Components/Alert'
import Encashments from './Encashments';
import FontAwesome from 'react-fontawesome';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import { firebaseDB } from '../firebase';

const HomePage = () => {
    const [alert, setAlert] = useState({
        status: false,
        type: 'positive',
        message: ''
    })
    const [online, setOnline] = useState([])

    useEffect(()=> {
        getPayments()
    }, [])

    const getPayments = () => {
        const onlineArr = []
        firebaseDB.ref('onlinepayments').on('value', snapshot => {
                snapshot.forEach(e=> {
                    console.log(e.val())
                    if(e.val().status==='pending'){
                        onlineArr.push(e.val())
                    }
                })
            
                        setOnline(onlineArr)
        })
    }

    const declineReg = (key) => {
        firebaseDB.ref('onlinepayments').child(key).update({
            status: 'declined'
        })
        getPayments()
    }

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
                        <Register/>
                    </div>

                    
                </div>

                {/* <div className="onlines">
                
                    {
                        online.map((account, i)=> {
                            return <div className="card">
                                        <h3>{account.Name}</h3>
                                        <p className="amount">{account.invplan}</p>
                                        <div className="cta">
                                            <button>Confirm</button>
                                            <button onClick={()=>declineReg(account["Phone Number"])}>Decline</button>
                                        </div>
                                    </div>
                        })
                    }
                </div> */}

            </BrowserRouter>
        </div>
    );
};

export default HomePage;