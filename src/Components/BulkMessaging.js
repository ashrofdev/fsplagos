import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import Bounce from 'react-reveal/Bounce'
import { firebaseDB } from '../firebase';

const BulkMessaging = () => {
    const [message, setMessage] = useState("")
    const [phones, setPhones] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const phones = []
        firebaseDB.ref('investors').once('value').then(snapshot=> {
            snapshot.forEach(inv=> {
                if(inv.val().phone){
                    phones.push(inv.val().phone)
                }
            })
        }).then(e=> {
            setPhones(phones)
        })

    }, [])

    const sendMessage = () => {
        setLoading(true)
        const mobiles = phones.join(',')
        console.log(phones, mobiles)
        if(message===''){
            // can't send an empty message

        }else{
            fetch(`https://portal.nigeriabulksms.com/api/?username=freedomsynergypro@gmail.com&password=fsp003&message=${message}&sender=F S P&mobiles=${mobiles}&type=message`).then(e=>{
                return e.json()
            }).then(e=> {
                if(e.status==="OK"){
                    
                }
            })
        }
    }

    return (
        <Bounce top>
            <div className="bulkmessaging">
                <h3>Messanger</h3>
                <div className="bodyy">
                    <select>
                        <option value="all">All</option>
                        {/* <option value="Stage1">Stage1</option>
                        <option value="Stage2">Stage2</option>
                        <option value="Stage3">Stage3</option>
                        <option value="Stage4">Stage4</option>
                        <option value="Stage5">Stage5</option>
                        <option value="Stage6">Stage6</option>
                        <option value="Stage7">Stage7</option>
                        <option value="Stage8">Stage8</option> */}
                    </select>
                    <textarea onChange={(e)=> setMessage(e.target.value)}></textarea>
                    <div className="cta">
                        {
                            loading?
                            <button className="btn"><FontAwesome size="1x" name="spinner" spin={true}/></button>:
                            <button onClick={sendMessage}>Send</button>
                        }
                    </div>
                </div>
            </div>
        </Bounce>
    );
};

export default BulkMessaging;