import React from 'react';

const Reason = ({complaint}) => {
    const markedBy = complaint ? complaint.markedBy : '';
    const content = complaint ? complaint.reason : '';
    var markedOn = new Date();

    var status;
    if(complaint){
        status =    complaint.status === 1 ? 
                    <span className="new badge" data-badge-caption="">Resolved</span> : 
                    <span className="new badge red" data-badge-caption="">Rejected</span>;
    }

    if(complaint && complaint.status<1){
        return '';
    }
    return(
    <div className="row" style={{marginTop: 50}}>
        <h1 style={{fontSize: 22}}>Evaluation Report</h1>
        <hr/>
          <div className="card-panel z-depth-0 grey darken-3">
            {status}
            <hr  style={{marginTop: 30, marginBottom: 10}} />
            <span className="white-text">
                <b>Reason: </b>{content}
            </span>
            <div className="card-action grey lighten-4 grey-text evaluation-footer">
                <div>Evaluated By {markedBy} - {complaint.markedByDesignation} </div>
                <div>{markedOn.toString()}</div>
            </div>
          </div>
      </div>
    )
}


export default Reason;