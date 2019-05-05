import React from 'react';
import moment from 'moment';
import departments from '../../config/departments'

const ComplaintSummary = ({complaint}) => {
    var department = departments.filter(item => {
        return Object.keys(item).some(key =>
          item[key].toLowerCase().includes(complaint.department)
        );
    });
    if(department.length < 1){
        department = [{name: 'No Department'}]
    }
    var status;
    if(complaint){
        status = complaint.status === 0 ? 
                    <span className="new badge blue" data-badge-caption="">Pending</span> : 
                    complaint.status === 1 ? 
                    <span className="new badge" data-badge-caption="">Resolved</span> : 
                    <span className="new badge red" data-badge-caption="">Rejected</span>;
    }
    return (
            <div className="card z-depth-0 complaint-summary ">
                <div className="card-content grey-text text-darken-3">
                    <span className="right text-lighten-3" style={{fontSize: 14}}>
                        {status}
                    </span>
                    <span className="card-title">
                        {complaint.title}
                    </span>
                    <p>Against <span className="cp-theme">{department[0].name}</span></p>
                    <p className="grey-text">{moment(complaint.createdAt.toDate()).calendar()}</p>
                </div>
            </div>
    );
}

export default ComplaintSummary;