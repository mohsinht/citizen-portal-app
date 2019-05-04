import React from 'react';
import ComplaintSummary from './ComplaintSummary';
import { Link } from 'react-router-dom'


const ComplaintList = ({complaints}) => {
    return (
        <div className="complaint-list section">
            { complaints && complaints.map(complaint => {
                return (
                    <Link to={'/complaint/' + complaint.id} key = {complaint.id}>
                        <ComplaintSummary complaint={complaint}  />
                    </Link>
                )
            })}
        </div>
    );
}

export default ComplaintList;