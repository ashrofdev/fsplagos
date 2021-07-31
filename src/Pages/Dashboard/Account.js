import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-fontawesome';
import Fade from 'react-reveal/Fade'
import { UserContext } from '../../Components/Context';
import { firebaseDB } from '../../firebase';
import Alert from '../../Components/Alert';

const Account = () => {
    const investor = React.useContext(UserContext)

    const banks =[
        { "id": "1", "name": "Access Bank" ,"code":"044" },
        { "id": "2", "name": "Citibank","code":"023" },
        { "id": "3", "name": "Diamond Bank","code":"063" },
        { "id": "4", "name": "Dynamic Standard Bank","code":"" },
        { "id": "5", "name": "Ecobank Nigeria","code":"050" },
        { "id": "6", "name": "Fidelity Bank Nigeria","code":"070" },
        { "id": "7", "name": "First Bank of Nigeria","code":"011" },
        { "id": "8", "name": "First City Monument Bank","code":"214" },
        { "id": "9", "name": "Guaranty Trust Bank","code":"058" },
        { "id": "10", "name": "Heritage Bank Plc","code":"030" },
        { "id": "11", "name": "Jaiz Bank","code":"301" },
        { "id": "12", "name": "Keystone Bank Limited","code":"082" },
        { "id": "13", "name": "Providus Bank Plc","code":"101" },
        { "id": "14", "name": "Polaris Bank","code":"076" },
        { "id": "15", "name": "Stanbic IBTC Bank Nigeria Limited","code":"221" },
        { "id": "16", "name": "Standard Chartered Bank","code":"068" },
        { "id": "17", "name": "Sterling Bank","code":"232" },
        { "id": "18", "name": "Suntrust Bank Nigeria Limited","code":"100" },
        { "id": "19", "name": "Union Bank of Nigeria","code":"032" },
        { "id": "20", "name": "United Bank for Africa","code":"033" },
        { "id": "21", "name": "Unity Bank Plc","code":"215" },
        { "id": "22", "name": "Wema Bank","code":"035" },
        { "id": "23", "name": "Zenith Bank","code":"057" }
    ]

    const [editState, toggleEdit] = useState(false)
    const [bankName, setBankName] = useState("--Bank Unverified--")
    const [bank, setBank] = useState("1,Access Bank,044")
    const [targetName, setTargetName] = useState("")
    const [accNo, setAccNo] = useState("")
    const [percentageEquality, setPercentageEquality] = useState(0)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({
        status: false,
        type: 'positive',
        message: ''
    })


    useEffect(()=>{
        if(investor.bankCode){
            fetch(`https://api.paystack.co/bank/resolve?account_number=${investor.acc_no.trim()}&bank_code=${investor.bankCode}`, {
                method: 'get',
                headers: {
                'Authorization': `Bearer sk_test_2684062172e67c4246c232f191b67190a5fb458b`
                },}
                ).then(e=>{
                    return e.json()
                    .then(e=>{
                        console.log(e)
                        setBankName(e.data.account_name)

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
                           e.isVerified = true
                        }else {
                           e.isVerified = false
                        }


                    })
                }).catch(e=>{
                    console.log(e)
            })
        }else {
            fetch(`https://api.paystack.co/bank/resolve?account_number=${investor.acc_no.trim()}&bank_code=044`, {
                method: 'get',
                headers: {
                'Authorization': `Bearer sk_test_2684062172e67c4246c232f191b67190a5fb458b`
                },}
                ).then(e=>{
                    return e.json()
                    .then(e=>{
                        console.log(e)
                        setBankName(e.data.account_name)

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
                            e.isVerified = true
                        }else {
                            e.isVerified = false
                        }


                    })
                }).catch(e=>{
                    console.log(e)
            })
        }
    },[])
    useEffect(()=> {
        if(alert.status===true){
          setTimeout(() => {
            setAlert({status: false})
          }, 10000);
        }
      })

    const getBankName = (e) => {
        setAccNo(e.trim())
        if(e.length>9){
            setTargetName('Fetching bank name...')
            fetch(`https://api.paystack.co/bank/resolve?account_number=${e.trim()}&bank_code=${bank.split(",")[2]}`, {
                method: 'get',
                headers: {
                'Authorization': `Bearer sk_test_2684062172e67c4246c232f191b67190a5fb458b`
                },}
                ).then(e=>{
                    return e.json()
                    .then(e=>{
                        console.log(e)
                        if(e.data.account_name){
                            setTargetName(e.data.account_name)
                        }else {
                            setTargetName('Couldn\'t fetch bank name!')
                        }

                    })
                }).catch(e=>{
                    console.log(e)
            })
        }
    }

    const editBank = () => {
        setLoading(true)
        // const invName = investor.Name.split("").sort().join("").toLowerCase()
        // const bankName = targetName.split("").sort().join("").toLowerCase()

        // const string1 = invName
        // const string2 = bankName
        // let compareNum = 0; 
        // console.log(string1,string2)

        // let l = Math.min(string1.length, string2.length);
        // for( let i=0; i<l; i++) {
        //     if( string1.charAt(i) === string2.charAt(i)) compareNum++;
        // }        
        // console.log(compareNum)
        
        
        // const percent = (compareNum/l)*100
        // setPercentageEquality(percent)
        // if(percent>=80){
            firebaseDB.ref('investors').child(investor.key).update({
                bank: bank.split(",")[1],
                bankCode: bank.split(",")[2],
                acc_no: accNo
            }).then(()=> {
                setAlert({
                    status: true,
                    type: 'positive',
                    message: 'Account details updates successfully'
                })
                setLoading(false)
            }).catch(err=>{
                setAlert({
                    status: true,
                    type: 'neg',
                    message: 'Verification error'
                })
            })
        // }else {
        //     setAlert({
        //         status: true,
        //         type: 'neg',
        //         message: 'Verification error'
        //     })
        //     setLoading(false)
        // }
    }

    return (
        <div className="account">
            {
                alert.status?
                <Alert type={alert.type} message={alert.message} />:null
            }
             <header>Account</header>
             <div className="body">
                 <div className="details">
                     <div className="left">
                        <h3>{bankName}</h3>
                        <p>{investor.bank}</p>
                        <h5>{investor.acc_no}</h5>
                        {/* <h6>044</h6> */}
                     </div>
                     <div onClick={()=> toggleEdit(!editState)} className="right">
                         <FontAwesome size="2x" name="edit" />
                     </div>
                 </div>


                 {/* // toggle edit content */}
                 {
                     editState?
                     <Fade duration={200}>
                         <div className="form">
                            <select onChange={(e)=> setBank(e.target.value)}>
                            {
                                banks.map(e=><option value={[...Object.values(e)]}>{e.id} - {e.name}</option>
                                )
                            }
                            </select>
                            <input onChange={(e)=> getBankName(e.target.value)} placeholder="Account number"/>
                            <p>{targetName} - {percentageEquality}% equal</p>
                            {
                                loading?
                                <button className="btn"><FontAwesome size="1x" name="spinner" spin={true}/></button>:
                                <button onClick={editBank}>Save changes</button>
                            }
                        </div>
                     </Fade>:null
                 }
             </div>
        </div>
    );
};

export default Account;