import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import Alert from '../../Components/Alert';
import { UserContext } from '../../Components/Context';
import { firebaseDB } from '../../firebase';

const UserId = () => {
    const investor = React.useContext(UserContext)
    
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({
        status: false,
        type: 'positive',
        message: ''
    })

    const saveId = () => {

        firebaseDB.ref('investors').child(investor.key).update({
            userId: id
        }).then(()=> {
            setAlert({
                status: true,
                type: 'positive',
                message: 'User ID updated successfully'
            })
            setLoading(false)
        })
    }

    return (
        <div className="account">
            {
                alert.status?
                <Alert type={alert.type} message={alert.message} />:null
            }
             <header>User ID</header>
            <div className="body">
                <div className="form">
                    <input onChange={(e)=> setId(e.target.value)} placeholder="Enter User ID"/>
                    {
                        loading?
                        <button className="btn"><FontAwesome size="1x" name="spinner" spin={true}/></button>:
                        <button onClick={saveId}>Save</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserId;