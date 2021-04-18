import React, {useState} from 'react';
import { UserContext } from '../../Components/Context';
import { firebaseDB } from '../../firebase';

const Update = () => {
    const investor = React.useContext(UserContext)
    const [chambervalue, setChambervalue] = useState(0)

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
        firebaseDB.ref('investors').child(investor.key).update({
            Stage: chambervalue
        })
    }
    return (
        <div className="update">
            <header>Update stage</header>
            <div className="body">
                <p>Current Stage: {investor.Stage}</p>
                <div className="chamber">
                    <button onClick={()=> editValue('neg')}>-</button> 
                    <p className="chambervalue">{chambervalue}</p>
                    <button onClick={()=> editValue('increase')}>+</button> 
                </div>
                <button className="cta" onClick={save}>Save</button>
            </div>
        </div>
    );
};

export default Update;