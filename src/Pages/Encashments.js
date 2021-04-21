import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import { UserContext } from '../Components/Context';
import { firebaseDB } from '../firebase';
import {json2excel} from 'js2excel';

const Encashments = () => {
    const [encashments, setEncashments] = useState([])

    useEffect(()=> {
        getEncashments()
    }, [])

    const getEncashments = () => {
            const encashments = []
        firebaseDB.ref("encashments").on('value', snapshot => {
            snapshot.forEach(e=>{
                encashments.push({...e.val(), key: e.key})
            })
            setEncashments(encashments)
        })
        console.log(encashments)
    }
    const toggleEncash = (account) => {
        firebaseDB.ref('encashments').child(account.key).update({
            openEncash: !account.openEncash
        })
        getEncashments()
    }

    const encash = (e, key) => {
        e.preventDefault()
        firebaseDB.ref('encashments').child(key).update({
            encashedAmount: parseInt(e.target.amount.value)
        })
        getEncashments()
    }

    const deleteEncashment = (key) => {
        firebaseDB.ref('encashments').child(key).remove().then(e=> {
            getEncashments()
        })
    }

    const downloadSpreadsheet = () => {
        const payRoll = []
        encashments.forEach(payment=> {
            payRoll.push({
                "BeneficiaryName":payment.bankName,
                "BankCode":payment.bankCode,
                "AccountNo":payment.acc_no,
                "Amount": payment.amount-payment.encashedAmount,
                "Narration": 'Payment from FSPRO',
            })
        })
        try {
            json2excel({
                data: payRoll,
                name: 'Payment List',
            });
        } catch (e) {
            console.log(e,'export error');
        }
    }
    
    return (
        <div className="encashments">
            <div className="header">
                <h2>Encashments</h2>
            </div>
            <div className="list">

                {
                    encashments.map((encashment,i) => {
                        return (
                            <div className="item">
                                <input type="checkbox"/>
                                <p>{i}</p>
                                <p>{encashment.date}</p>
                                <h3>{encashment.username}</h3>
                                <p>{encashment.bank}</p>
                                <p>{encashment.acc_no}</p>
                                <h3 className="amount">NGN {encashment.amount-encashment.encashedAmount}</h3>
                                <button onClick={()=> toggleEncash(encashment)} className="sidebtn" title="encash"><FontAwesome size="1x" name="money"/></button>
                                <button onDoubleClick={()=> deleteEncashment(encashment.key)} className="sidebtn delete" title="delete"><FontAwesome size="1x" name="times"/></button>
                                {
                                    encashment.openEncash?
                                    <form onSubmit={(e)=> encash(e, encashment.key)} className="form">
                                        <input name="amount" placeholder="Amount..."/>
                                        <button>&rarr;</button>
                                    </form>:null
                                }
                            </div>
                        )
                    })
                }

                
                
            </div>
            <div className="cta">
                <button onClick={downloadSpreadsheet}>Authorize</button>
            </div>
        </div>
    );
};

export default Encashments;