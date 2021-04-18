import React, {useState, useEffect} from 'react';
import { UserContext } from '../../Components/Context';
import { firebaseDB } from '../../firebase';
import FontAwesome from 'react-fontawesome';
import Alert from '../../Components/Alert';

const Update = () => {
    const investor = React.useContext(UserContext)
    const [chambervalue, setChambervalue] = useState(0)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({
        status: false,
        type: 'positive',
        message: ''
    })

    useEffect(()=> {
        if(alert.status===true){
          setTimeout(() => {
            setAlert({status: false})
          }, 10000);
        }
      })

    const editValue = (type) => {
            if(type==='increase'){
                if(chambervalue<8){
                    setChambervalue(chambervalue+1)
                }
            }else {
                if(chambervalue>0){
                    setChambervalue(chambervalue-1)
                }
            }
    }
    const save = () => {
        setLoading(true)
        firebaseDB.ref('investors').child(investor.key).update({
            Stage: chambervalue
        }).then(()=> {
            setAlert({
                status: true,
                type: 'positive',
                message: 'Account details updates successfully'
            })
            setLoading(false)
        })
    }
    return (
        <div className="update">
             {
                alert.status?
                <Alert type={alert.type} message={alert.message} />:null
            }
            <header>Update stage</header>
            <div className="body">
                <p>Current Stage: {investor.Stage}</p>
                <div className="chamber">
                    <button onClick={()=> editValue('neg')}>-</button> 
                    <p className="chambervalue">{chambervalue}</p>
                    <button onClick={()=> editValue('increase')}>+</button> 
                </div>
                {
                    loading?
                    <button className="cta"><FontAwesome size="1x" name="spinner" spin={true}/></button>:
                    <button className="cta" onClick={save}>Save</button>
                }
            </div>
        </div>
    );
};

export default Update;