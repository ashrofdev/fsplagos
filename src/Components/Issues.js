import React from 'react';

const Issues = ({issues, openDashboard}) => {
    return (
        <div>
                   <div className="tablehead">
                        <h3>S/N</h3>
                        <h3>Title</h3>
                        <h3>Username</h3>
                        <h3>Capital</h3>
                        <h3>Stage</h3>
                        <h3>Next Earning</h3>
                    </div>
                    {
                        issues?
                        <div className="tablebody">
                        
                        {
                            Object.values(issues).map((investor, i) => {
                                return <div className="inv">
                                       
                                        <h4 onClick={()=> openDashboard(investor)}>{investor.Name}</h4>
                                        <p>{investor["User name"]}</p>
                                        <p>{investor.invplan}</p>
                                        <p>{investor.Stage}</p>
                                        {
                                            investor.dueDate?
                                            <p>{investor.dueDate.toString()}</p>:null
                                        }
                                        {
                                            investor.issuesArray.map((issue, i)=>  <div className="issuee">
                                                                            <p>{i+1}</p>
                                                                            <p>{issue.title}</p>  
                                                                            <p>{issue.comment}</p>  
                                                                        </div>
                                            )
                                        }
                                    </div>
                            })
                        }

                    </div>:
                    <div className="tablebody">
                        <h4 style={{padding: '2rem'}}>Empty list</h4>
                    </div>
                    }
               </div>
    );
};

export default Issues;