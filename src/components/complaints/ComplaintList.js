import React from 'react';
import ComplaintSummary from './ComplaintSummary';
import { Link } from 'react-router-dom'


const ComplaintList = ({complaints}) => {
    if(complaints.length === 0){
        return (
            <div className="complaint-list section center">
                <p style={{marginLeft: -12}}>no complaints yet</p>
            </div>
        )
    }
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