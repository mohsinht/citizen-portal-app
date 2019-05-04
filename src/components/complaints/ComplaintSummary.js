import React from 'react';
import moment from 'moment';

const ComplaintSummary = ({complaint}) => {
    return (
            <div className="card z-depth-0 complaint-summary ">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">
                        {complaint.title}
                    </span>
                    <p>Posted by {complaint.complaintFromFirstName} {complaint.complaintFromLastName}</p>
                    <p className="grey-text">{moment(complaint.createdAt.toDate()).calendar()}</p>
                </div>
            </div>
    );
}

export default ComplaintSummary;