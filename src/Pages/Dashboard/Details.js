import React from 'react';
import { UserContext } from '../../Components/Context';

const Details = () => {
    const investor = React.useContext(UserContext)
    return (
        <div className="details">
            <header>Details</header>
            <div className="body">
                <div className="user">
                    <span>Name</span>
                    <h3>{investor.Name}</h3>
                    <span>Username</span>
                    <p>{investor["User name"]}</p>
                    <span>Capital</span>
                    <p>{investor.invplan}</p>
                    <span>Registration Date</span>
                    <p>{investor["Registration Date"]}</p>
                    <span>Bank</span>
                    <p>{investor.bank}</p>
                    <span>Account number</span>
                    <p>{investor.acc_no}</p>
                </div>
            </div>
        </div>
    );
};

export default Details;