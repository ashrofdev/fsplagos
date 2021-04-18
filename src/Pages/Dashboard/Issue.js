import React, {useState, useEffect} from 'react';
import { UserContext } from '../../Components/Context';
import { firebaseDB } from '../../firebase';
import FontAwesome from 'react-fontawesome';
import Alert from '../../Components/Alert';

const Issue = () => {
    const investor = React.useContext(UserContext)
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

    const createIssue = (data) => {
        data.preventDefault()
        setLoading(true)
        let activeIssues = 0
        if(investor.activeIssues){
            activeIssues=investor.activeIssues
        }
        const details = {
            title: data.target.title.value,
            comment: data.target.comment.value,
        }
        firebaseDB.ref('investors').child(investor.key).update({
            activeIssues: activeIssues+1
        }).then(()=> {
            firebaseDB.ref('investors').child(investor.key).child('issues').push().set(details).then(()=>{
                setAlert({
                    status: true,
                    type: 'positive',
                    message: 'New issue created successfully'
                })
                setLoading(false)
            })
        })
        
    }

    return (
        <div className="issue">
            {
                alert.status?
                <Alert type={alert.type} message={alert.message} />:null
            }
            <header>Issue</header>
            <div className="body">
                <form onSubmit={(e)=> createIssue(e)}>
                    <input name="title" placeholder="Issue title"/>
                    <textarea name="comment" placeholder="Comment"/>
                    <div className="cta">
                        {
                            loading?
                            <button><FontAwesome size="1x" name="spinner" spin={true}/></button>:
                            <button>Creare new issue</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Issue;