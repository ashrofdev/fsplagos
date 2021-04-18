import React from 'react';
import Fade from 'react-reveal/Fade'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Details from './Details';
import Profile from './Profile';
import Update from './Update';
import Account from './Account';
import Messaging from './Messaging';
import DueDates from './DueDates';
import Issue from './Issue';
import Upgrade from './Upgrade';

const Dashboard = ({openDashboard}) => {
    
    return (
        <>
            <Fade right duration={500}>
                <div className="dashboard">
                    <div className="close" onClick={openDashboard}></div>
                    <div className="container">
                        <header>
                            <button>{"<"} BACK</button>
                        </header>
                        <BrowserRouter>
                            <main>
                                <div className="large">
                                        <Switch>
                                            <Route path="/admin/profile" component={Profile}/>
                                            <Route path="/admin/update" component={Update}/>
                                            <Route path="/admin/account" component={Account}/>
                                            <Route path="/admin/duedates" component={DueDates}/>
                                            <Route path="/admin/messaging" component={Messaging}/>
                                            <Route path="/admin/issue" component={Issue}/>
                                            <Route path="/admin/upgrade" component={Upgrade}/>
                                            <Route path="/admin/" component={Details}/>
                                        </Switch>
                                </div>
                                <div className="sidebar">
                                    <Link to="/admin/"><button>Details</button></Link>
                                    <Link to="/admin/update"><button>Update</button></Link>
                                    <Link to="/admin/account"><button>Account</button></Link>
                                    <Link to="/admin/duedates"><button>Due dates</button></Link>
                                    <Link to="/admin/messaging"><button>Messaging</button></Link>
                                    <Link to="/admin/upgrade"><button>Upgrade account</button></Link>
                                    <Link to="/admin/issue"><button>New issue</button></Link>
                                    {/* <Link to="/admin/profile"><button>Profile</button></Link> */}
                                </div>
                            </main>
                        </BrowserRouter>
                    </div>
                </div>
            </Fade>
        </>
    );
};

export default Dashboard;