import React, { useEffect, useState } from 'react';
import { UserContext } from '../../Components/Context';
import moment from 'moment';
import business from 'moment-business-days';

const DueDates = () => {
    const investor = React.useContext(UserContext)
    const [dueDates, setDueDates] = useState([])

    useEffect(()=>{
            
        const dueDates = []
        const regDate = investor["Registration Date"]

        let stage = 1
        let count = 8
        let step = 1
        if(investor.account_type==='bT2'){
            stage = 2
            count = 6
            step = 2
        }
        if(investor.account_type&&investor.account_type.includes("bT")){
            for (stage; stage <=count; stage+=step) {
    
                const holidays = ['2019-01-01','2019-02-22','2019-04-19','2019-04-22','2019-05-01','2019-05-29',
                '2019-06-04','2019-06-05','2019-06-12','2019-08-12','2019-08-13','2019-10-01','2019-11-9',
                '2019-11-11','2019-12-25','2019-12-26','2020-01-01','2020-04-10','2020-04-13','2020-05-01',
                '2020-05-25','2020-05-26','2020-06-12','2020-07-30','2020-07-31','2020-10-01','2020-10-29',
                '2020-12-25','2020-12-26','2021-01-01','2021-04-02','2021-04-05','2021-05-01','2021-05-12',
                '2021-06-12','2021-07-19','2021-10-01','2021-10-18','2021-12-25','2021-12-26' ]
                moment.updateLocale('us', {
                    holidays,
                    holidayFormat: 'YYYY-MM-DD'
                });
    
                const dueDate = moment(regDate, 'DD-MM-YYYY').add(stage, 'month').businessAdd(1, 'day').toString()
    
                dueDates.push(dueDate)
    
                
                
            }
        }else if(investor.account_type==='st'){
            const dueDate = moment(regDate, 'DD-MM-YYYY').add(6, 'month').businessAdd(1, 'day').toString()
    
            dueDates.push(dueDate)
        }else {
            const dueDate = moment(regDate, 'DD-MM-YYYY').add(1, 'year').businessAdd(1, 'day').toString()
    
            dueDates.push(dueDate)
        }
        setDueDates(dueDates)

    },[investor])

    return (
        <div className="duedates">
            <header>Duedates</header>
            <div className="gridd">
                {
                    dueDates.map((date, i)=> {
                        console.log(date)
                        return <div className="date">
                            <p>{i+1}</p>
                            <p>{date}</p>
                        </div>
                    })
                }
            </div>
            <div className="cta">
                <button>Resend duedates</button>
            </div>
        </div>
    );
};

export default DueDates;