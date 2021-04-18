import React, { useEffect, useState} from 'react';
import Dashboard from '../Pages/Dashboard/';
import {firebaseDB} from '../firebase'
import { UserContext } from './Context';
import moment from 'moment';
import business from 'moment-business-days';
import Payments from './Payments';

const Table = () => {
    const [openBoard, setOpenDashboard] = useState(false)
    const [payment, togglePayment] = useState(false)
    const [payments, togglePayments] = useState(false)
    const [issuesActive, openIssues] = useState(false)
    const [issues, setIssues] = useState([])
    const [investors, setInvestors] = useState([])
    const [filteredinvestors, setFilteredInvestors] = useState([])
    const [upgrades, setUpgrades] = useState([])
    const [email, setEmail] = useState([])
    const [investor, setInvestor] = useState({})
    const [rois, setRois] = useState({})
    const [activeIssues, setActiveIssues] = useState(0)

        // getRoi()
        useEffect(()=>{
            getInvestors()
        },[])

    useEffect(()=>{
        window.addEventListener('keypress', e=>{
            console.log(e.key)
            if(e.key==="P"){
                togglePayment(!payment)
            }
        })
    })

    const getIssues = (investors) => {
        let activeIssues = 0
        investors.forEach(e=>{
            if(e.activeIssues){
                activeIssues+=e.activeIssues
            }
        })
        setActiveIssues(activeIssues)
    }


    const filterTable = (state) => {
            const filtered = investors.filter(investor=>{
                openIssues(false)
                
                if(state==='today'){
                    return investor.dueDate.isSame(moment(), 'day')
                }else if(state==='thisweek'){
                    return investor.dueDate.isSame(moment(), 'week')
                }else if(state==='nextweek'){
                    return investor.dueDate.isSame(moment().add(1, 'week'), 'week')
                }else if(state==='issues'){
                    openIssues(true)
                    return investor.activeIssues>0
                }

                return investor
            })
            setFilteredInvestors(filtered)
    }

    const getInvestors = async () => {
        await firebaseDB.ref('investors').limitToLast(10).once('value').then(snapshot => {
            const investors = []
            const issues = []
            const email = []
            snapshot.forEach(e=>{
                let upgrade = []
                if(e.val().upgrade){
                    const upgradesArray = upgrades
                    upgrade = Object.values(e.val().upgrade)
                    upgradesArray.push(...upgrade)
                    setUpgrades(upgradesArray)
                }
                investors.push({...e.val(), key: e.key, upgrade})
                email.push(e.val()["EMAIL ADDRESS"])
                setEmail(email)

                // getting roi 
                let roiss = rois

                firebaseDB.ref('plans').once('value').then(snapshot => {
                    roiss = snapshot.val()
                    setRois(roiss)
                    console.log(roiss)
                    setFilteredInvestors(investors)
                    setInvestors(investors)

                    // fetching issues
                    if(e.val().activeIssues>0){
                        const issuesArray = Object.values(e.val().issues)
                        issues.push({issuesArray, ...e.val(), key: e.key})
                        setIssues(issues)
                        getIssues(investors)
                    }
                    generateDueDate(investors, roiss)
                })

                
            })
            console.log(investors)
            
        })

    }


    const generateDueDate = (investors, roiss) => {
        console.log(roiss, 'hghghghghghghghghg')
        const inv = []
        investors.forEach(investor => {
            const regDate = investor["Registration Date"]
            const days = 30*(parseInt(investor.Stage)+1)
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

            const dueDate = moment(business(regDate, 'DD-MM-YYYY').businessAdd(days)._d)

            const stage = parseInt(investor.Stage)
            const roi = roiss[investor.invplan]
            console.log(roi)

            inv.push({
                ...investor,
                dueDate,
                nextEarningAmount: roi[stage]
            })

            console.log(inv)
        })
        setInvestors(inv)
        setFilteredInvestors(inv)
    }

    const openDashboard = (investor) => {
        setInvestor(investor)
        setOpenDashboard(!openBoard)
    }

    const handleSearchChange = (value) => {
        const filtered = investors.filter(investor=>{
            if(investor.Name){
                return investor.Name.toLowerCase().includes(value.toLowerCase())
            }
            return investor
        })
        setFilteredInvestors(filtered)
    }
    
    const pushUser = (investor, checked) => {
        if(checked){
            firebaseDB.ref('payments').child(investor.key).set({...investor, dateAdded: moment().toString()})
        }else {
            firebaseDB.ref('payments').child(investor.key).set(null)
        }
    }

    return (
        <div className="table">
            {
                payments?
                <Payments togglePayments={togglePayments}/>:null
            }

            {/* Dashboard side pop */}
            {
                openBoard?
                <UserContext.Provider value={investor}>
                    <Dashboard openDashboard={openDashboard}/>
                </UserContext.Provider>:null
            }


            {/* Table  */}
            {/* Sraech model */}
            <div className="search">
                <input onChange={(e)=> handleSearchChange(e.target.value)} placeholder="Filter investors..."/>
                <button className="payments" onClick={()=> togglePayments(true)}>Payments</button>
            </div>
            <nav>
                <ul>
                    <li onClick={()=> filterTable('all')}>All</li>
                    <li onClick={()=> filterTable('today')}>Due Today</li>
                    <li onClick={()=> filterTable('thisweek')}>Due This week</li>
                    <li onClick={()=> filterTable('nextweek')}>Due Next week</li>
                    <li onClick={()=> filterTable('issues')}>Issues <span>{activeIssues}</span></li>
                </ul>
            </nav>


           {
               issuesActive?
               <div>
                   <div className="tablehead">
                        <h3>S/N</h3>
                        <h3>Title</h3>
                        <h3>Username</h3>
                        <h3>Capital</h3>
                        <h3>Stage</h3>
                        <h3>Next Earning</h3>
                    </div>
                    <div className="tablebody">
                        
                        {
                            issues.map((investor, i) => {
                                return <div className="inv">
                                        <div>
                                            {
                                                payment?
                                                <input type="checkbox" onChange={(e)=> pushUser(investor, e.target.checked)} />:i+1
                                            }
                                        </div>
                                        <h4 onClick={()=> openDashboard(investor)}>{investor.Name}</h4>
                                        <p>{investor["User name"]}</p>
                                        <p>{investor.invplan}</p>
                                        <p>{investor.Stage}</p>
                                        {
                                            investor.dueDate?
                                            <p>{investor.dueDate.toString()}</p>:null
                                        }
                                        {
                                            investor.issuesArray.map(issue=>  <div>
                                                                            <p>{issue.title}</p>  
                                                                            <p>{issue.comment}</p>  
                                                                        </div>
                                            )
                                        }
                                    </div>
                            })
                        }

                    </div>
               </div>:

               <div>
                    <div className="tablehead">
                        <h3>S/N</h3>
                        <h3>Name</h3>
                        <h3>Username</h3>
                        <h3>Capital</h3>
                        <h3>Stage</h3>
                        <h3>Next Earning</h3>
                    </div>
                    <div className="tablebody">
                        
                        {
                            filteredinvestors.map((investor, i) => {
                                return <div className="inv">
                                            <div>
                                                {
                                                    payment?
                                                    <input type="checkbox" onChange={(e)=> pushUser(investor, e.target.checked)} />:i+1
                                                }
                                            </div>
                                            <h4 onClick={()=> openDashboard(investor)}>{investor.Name}</h4>
                                            <p>{investor["User name"]}</p>
                                            <p>{investor.invplan}</p>
                                            <p>{investor.Stage}</p>
                                            {
                                                investor.dueDate?
                                                <p>{investor.dueDate.toString()}</p>:null
                                            }
                                        </div>
                            })
                        }

                    </div>
               </div>
           }
        </div>
    );
};

export default Table;