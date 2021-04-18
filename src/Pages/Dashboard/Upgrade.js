import React, { useEffect, useState } from 'react';
import { UserContext } from '../../Components/Context';
import CurrencyFormat from 'react-currency-format';
import { firebaseDB } from '../../firebase';
import moment from 'moment';

const Upgrade = () => {
    const investor = React.useContext(UserContext)
    const [capital, setCapital]= useState("")
    const [upgradeAmount, setUpgradeAmount]= useState(capital)

    useEffect(()=>{
        getCapital()
    },[])
    useEffect(()=>{
        if(upgradeAmount+capital>500000){
            setUpgradeAmount(upgradeAmount-50000)
        }else if(upgradeAmount<50000){
            setUpgradeAmount(50000)
        }
    })

    const getCapital = () => {
        const invplan = investor.invplan.split("_")
        setCapital(parseInt(invplan[1])*1000)
    }

    const handleIncrement = (type) => {
        if(type==='+'){
            setUpgradeAmount(upgradeAmount+50000)
        }else{
            setUpgradeAmount(upgradeAmount-50000)
        }
    }

    const upgrade = () => {
        firebaseDB.ref('investors').child(investor.key).child('upgrade').push().set({
            date: moment().toString(),
            amount: `p_${upgradeAmount/1000}k`,
            username:   `${investor["User name"]}(1)`
        }).then(()=>{

        })
    }

    return (
        <div className="upgrade">
            <header>Upgrade</header>
            <div className="body">
                <h2>Initial Capital: <CurrencyFormat value={capital} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <h3 className="amount" >{value}</h3>} /></h2>
                <div className="upgradecard">
                    <button onClick={()=> handleIncrement('-')}>-</button>
                    <CurrencyFormat value={upgradeAmount} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={value => <h3 className="amount" >{value}</h3>} />
                    
                    <button onClick={()=> handleIncrement('+')}>+</button>
                </div>
                <div className="cta">
                    <button onClick={upgrade} className="btn">Upgrade</button>
                </div>

                <div className="upgrades">
                    <h2>Upgrades</h2>
                    {
                        investor.upgrade.length<1?
                        <p>Upgrade records will be displayed here</p>:
                        <div>
                            {
                                investor.upgrade.map(e=>{
                                    return (
                                        <div className="upgrade">
                                            <p>Date: {e.date}</p>
                                            <p>Upgrade Id: {e.username}</p>
                                            <p>Amount: {e.amount}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Upgrade;