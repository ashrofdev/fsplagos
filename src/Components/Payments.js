import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import { firebaseDB } from '../firebase';
import {json2excel} from 'js2excel';

const Payments = ({togglePayments}) => {
    const [payments, setPayments] = useState([])

    useEffect(()=> {
        firebaseDB.ref('payments').on('value', snapshot => {
            const payments = []
            snapshot.forEach(payment => {
                payments.push({...payment.val(), key: payment.key})
            })
            setPayments(payments)
        })
    }, [])

    const handleChange = (value, payment) => {
        console.log(payment)
        const pays = payments
        const index = payments.findIndex(p => payment===p)
        if(value){
            pays[index].selected=true

        }else {
            pays[index].selected=true
        }
        setPayments(pays)
    }
    const generateSpreadSheet = () => {
        const payRoll = []
        payments.forEach(e=> {
            if(e.selected){
                payRoll.push({
                    "BeneficiaryName":e.bankName,
                    "BankCode":e.bankCode,
                    "AccountNo":e.acc_no.trim(),
                    "Amount": e.nextEarningAmount,
                    "Narration":e.naration,
                })
            }
        })
        
        try {
            json2excel({
                data:payRoll,
                name: 'Payment List',
            });
        } catch (e) {
            console.log(e,'export error');
        }
    }

    const declineSelected = () => {
        
        payments.forEach(pay=> {
            // payList.splice(indexPayList, 1)
            if(pay.selected){
                firebaseDB.ref('payments').child(pay.key).remove().then(()=>{

                    // const paymentss = []
                    // firebaseDB.ref('payments').on('value', snapshot => {
                    //     snapshot.forEach(payment => {
                    //         paymentss.push({...payment.val(), key: payment.key})
                    //     })
                    //     setPayments(paymentss)
                    // })
                })
            }
        })
    }

    const update = () => {
        // payRoll.forEach(roll=> {
        //     firebaseDB.ref('investors').child(roll.key).update({
        //         Stage: parseInt(roll.stage)+1
        //     })
        // })
    }

    return (
        <div className="paymentspop">
            <div className="paymentsmodal">
                <header>
                    <h3>Payments</h3>
                    <button onClick={()=> togglePayments(false)}><FontAwesome sixe="2x" name="times"/></button>
                </header>
                <div className="bodyy">
                    <div style={{fontWeight: 900}} className="roll">
                        <input type="checkbox"/>
                        <p>Date Added</p>
                        <p>Name</p>
                        <p>Narration</p>
                        <p>Amount</p>
                        <p>Account number</p>
                    </div>
                    
                   {
                       payments.map((payment, i)=>{
                            return <div className="roll">
                                {
                                    payment.selected?
                                    <input checked={true} onChange={(e)=> handleChange(e.target.checked, payment)} type="checkbox"/>:
                                    <input onChange={(e)=> handleChange(e.target.checked, payment)} type="checkbox"/>
                                }
                                {/* <p>{i+1}</p> */}
                                <p>{payment.dateAdded.slice(0, 10)}</p>
                                <p>{payment.Name}</p>
                                <p>Stage {parseInt(payment.Stage)+1} payment from FSPRO</p>
                                <p>{payment.nextEarningAmount}</p>
                                <p>{payment.acc_no}</p>
                            </div>
                       })
                   }

                </div>

                <div className="cta">
                    <button className="decline" onClick={declineSelected}>Decline selected</button>
                    <button className="initiate" onClick={update}>Update selected</button>
                </div>
                
                <div className="cta">
                    <button className="paystack">Proceed with PAYSTACK</button>
                    <button className="primus" onClick={generateSpreadSheet}>Proceed with PRIMUS</button>
                </div>
            </div>
        </div>
    );
};

export default Payments;