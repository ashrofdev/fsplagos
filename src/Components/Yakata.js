import React, { Component } from 'react';
import { firebaseDB } from '../firebase';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import business from 'moment-business-days';
import { PrimaryBtn } from './Btns';
import {json2excel, excel2json} from 'js2excel';


class Yakata extends Component {

    state = {
        yakata: [],
        balance: 0,
        totaldue: 0,
        plans: [],
        totalAmount: 0,
        amountRequired: 0,
        newAmount: 0,
        selectedList: [],
    }

    componentDidMount(){
        console.log('e.val()')
        firebaseDB.ref('dailyEncashment').on('value', e=>{
            const yakata = []
            console.log(e.val())
            e.forEach(e=>{
                yakata.push({...e.val(), key: e.key})
                this.setState({yakata})
                console.log(yakata, 'g')
            })
          
        })

    }

    handleCheck = (checked, user) => {
        const selectedList = this.state.selectedList
        const indexOfSelected = selectedList.findIndex(e => e.id===user.id)
        if(checked){
            selectedList.push(user)
        }else {
            selectedList.splice(indexOfSelected, 1)
        }
        this.setState({selectedList})
    }

    initiateSelected = () => {
        const payRoll = this.state.selectedList
        payRoll.forEach((investor,i)=>{
            fetch(`https://api.paystack.co/bank/resolve?account_number=${investor.acc_no.trim()}&bank_code=${investor.bankCode}`, {
                method: 'get',
                headers: {
                'Authorization': `Bearer sk_test_2684062172e67c4246c232f191b67190a5fb458b`
                },}
                ).then(e=>{
                    return e.json()
                    .then(e=>{
                        console.log(e)
                        payRoll[i].isLoading = false
                        payRoll[i].bankName = e.data.account_name

                        let string1 = investor.Name
                        let bankname = e.data.account_name
                    
                        if(string1.includes('(')){
                            let n = string1.split("(")
                            string1= n[0]
                        }
                        const nameLength = string1.split(" ").length
                        let string1ch = string1.split(" ").join("").toLowerCase()
                        let banknameArr = bankname.split(" ")
                    
                        let num = 0
                    
                        for (let i = 0; i<banknameArr.length; i++) {
                            if(string1ch.includes(banknameArr[i].toLowerCase())){
                              num+=1
                            }
                        } 
                        
                        const percent = (num/nameLength)*100
       
                        if(percent>=50){
                            payRoll[i].isVerified = 'true'
                        }else {
                            payRoll[i].isVerified = 'false'
                        }

                        setTimeout(() => {
                            this.setState({selectedList: payRoll})
                            console.log(this.state.selectedList, payRoll)
                        }, 1000);

                    })



                }).catch(e=>{
                    console.log(e)
            })
        })

    }

    download = () => {
        const data = []
        this.state.selectedList.forEach(e=>{
            if(e.isVerified){
                   
                data.push({
                    "BeneficiaryName": e.bankName,
                    "BankCode": e.bankCode,
                    "AccountNo": e.acc_no.trim(),
                    "Amount": e.amount,
                    "Narration": e.naration,
                })
            }
        })
        setTimeout(() => {
            try {
                json2excel({
                    data,
                    name: 'Payment List'+ moment().format('YYYY-MM-DD').toString(),
                });
            } catch (e) {
                console.log(e,'export error');
            }
        }, 1000);
        
    }
    
    render() {
        return (
            <div className="yakata">
               <header>
                    <h2>Total Amount</h2>
                    <h4>{this.state.totalAmount}</h4>
               </header>
               <div className="inv">
                    <p>Select</p>
                    <p>Date</p>
                    <p>Transaction Id</p>
                    <p>Username</p>
                    <p>Bank code</p>
                    <p>Account Number</p>
                    <p>Amount</p>
                    <p>Current stage</p>
                </div>

               {
                   this.state.yakata.map(user=>{
                       return <div className="inv" style={{backgroundColor: user.isVerified? 'rgba(206, 255, 197, 0.253)': 'transparent'}} >
                           <input type="checkbox" onChange={(e)=> this.handleCheck(e.target.checked, user)} />
                           <p>{user.date.slice(0, 20)}</p>
                           <p>#{user.id}</p>
                           <p>{user.username}</p>
                           <p>{user.bankCode}</p>
                           <p>{user.acc_no}</p>
                           <p>NGN {user.amount}</p>
                           <p>{user.stage}</p>
                       </div>
                   })
               }
               <div className="cta">
                    <PrimaryBtn onClick={this.initiateSelected} title="✔️ Verify selected"/>
                    <PrimaryBtn onClick={this.download} title="⬇ Download File"/>
               </div>
            </div>
        );
    }
}

export default Yakata;