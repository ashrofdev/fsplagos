import React from 'react';
import { UserContext } from '../../Components/Context';
import { firebaseDB } from '../../firebase';

const Issue = () => {
    const investor = React.useContext(UserContext)

    const createIssue = (data) => {
        let activeIssues = 0
        if(investor.activeIssues){
            activeIssues=investor.activeIssues
        }
        data.preventDefault()
        firebaseDB.ref('investors').child(investor.key).update({
            activeIssues: activeIssues+1
        })
        firebaseDB.ref('investors').child(investor.key).child('issues').push().set({
            title: data.target.title.value,
            comment: data.target.comment.value,
        }).then(()=>{

        })
    }

    return (
        <div className="issue">
            <header>Issue</header>
            <div className="body" onSubmit={(e)=> createIssue(e)}>
                <form>
                    <input name="title" placeholder="Issue title"/>
                    <textarea name="comment" placeholder="Comment"/>
                    <div className="cta">
                        <button>Creare new issue</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Issue;