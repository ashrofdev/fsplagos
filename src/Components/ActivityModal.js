import React from 'react';

const ActivityModal = ({data, admin}) => {
    console.log(data, admin)

    const getActivity = () => {
        let action = ''
        if(data.val().lastActivityTitle==='encashment') {
            action = 'encashed for'
        }else if(data.val().lastActivityTitle==='registration') {
            action = 'registered'
        }else if(data.val().lastActivityTitle==='edit') {
            action = 'edited'
        }else if(data.val().lastActivityTitle==='update') {
            action = 'updated'
        }
        return action
    }
    return (
        <div className="activitymodal">
            <div>
                <h2>Activity monitor</h2>
                <p>{data.val().activeAdmin.email} {getActivity()} {data.val()["User name"]}</p>
            </div>
            <div className="bell">🔔</div>
        </div>
    );
};

export default ActivityModal;