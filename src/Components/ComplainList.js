import React, { Component } from 'react';
import { firebaseDB } from '../firebase';
import {json2excel, excel2json} from 'js2excel';
import moment from 'moment';

class ComplainList extends Component {

    state = {
        complain: [],
        selected: [],
    }


    componentDidMount() {
        const complain = []
        firebaseDB.ref('complainlist').on('value', e=>{
            e.forEach(e=>{
                complain.push(e.val())
                this.setState({complain})
            })
        })
    }

    selectUser = (a,e,i) => {
        const selected = []
        const complain = this.state.complain
        let amount = 0
        if(e.encashment){
            amount+=e.nextEarningAmount-e.encashment.amount
        }else{
            amount+=e.nextEarningAmount
        }
        console.log(a,e)
        if(e.selected){
            complain[i].selected=false
        }else{
            complain.selected=true
            selected.push({
                "BeneficiaryName": e.Name,
                "BankCode": e.bankCode,
                "AccountNo": e.acc_no.trim(),
                "Amount": amount,
                "Narration": e.naration
            })
        }
        this.setState({complain, selected})
    }

    download = () => {
        try {
            json2excel({
                data: this.state.selected,
                name: 'Complain list'+ moment().format('YYYY-MM-DD').toString(),
            });
        } catch (e) {
            console.log(e,'export error');
        }
    }

    render() {
        return (
            <div className="complainlist">
                <header>
                    <h2>Complain List</h2>
                </header>
                <div>
                {
                   this.state.complain.map((e, i)=>{
                       return <div className="invv">
                           <input type="checkbox" onChange={(a)=> this.selectUser(a, e, i)} />
                           <p>{e["Registration Date"]}</p>
                           <p>{e.Name}</p>
                           <p>{e["User name"]}</p>
                           <p>{e.invplan}</p>
                           <p>{e.nextEarningAmount}</p>
                           <p>{`${e.upcomingEarning.day}-${e.upcomingEarning.month}-${e.upcomingEarning.year}`}</p>
                       </div>
                   })
               }
                </div>
                <button onClick={this.download}>DOWNLOAD</button>
            </div>
        );
    }
}

export default ComplainList;