import React from 'react'

const Stats = (props) => {
    var totalPending = 0;
    var totalRejected = 0;
    var totalResolved = 0;
    const {complaints} = props;
    for(var i=0; i<complaints.length; i++){
        if(complaints[i].status === 0)
            totalPending++;
        else if(complaints[i].status === 1)
            totalResolved++;
        else
            totalRejected++;
    }
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Stats</span>
          <div className="card green stat-card z-depth-0"> 
             <span className="stat-value"><b>{totalResolved}</b> resolved complaints</span>
          </div>
          <div className="card blue stat-card z-depth-0"> 
             <span className="stat-value"><b>{totalPending}</b> pending complaints</span>
          </div>
          <div className="card red stat-card z-depth-0"> 
             <span className="stat-value"><b>{totalRejected}</b> rejected complaints</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats