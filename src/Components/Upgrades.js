import React from 'react';

const Upgrades = ({upgrades}) => {
    return (
        <div>
            <div className="tablehead">
                <h3>S/N</h3>
                <h3>Date</h3>
                <h3>Username</h3>
                <h3>Stage</h3>
                <h3>Amount</h3>
            </div>
            {
                upgrades.length>0?
                <div className="tablebody">
                
                {
                    upgrades.map((e, i) => {
                        return <div className="inv">
                                <p>{i+1}</p>
                                <p>{e.date}</p>
                                <p>{e.username}</p>
                                <p>{e.Stage}</p>
                                <p>{e.amount}</p>
                            </div>
                    })
                }

            </div>:
            <div className="tablebody">
                <h4 style={{padding: '2rem'}}>Empty list</h4>
            </div>
            }
        </div>
    );
};

export default Upgrades;