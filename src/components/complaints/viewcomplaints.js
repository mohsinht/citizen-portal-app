import React from 'react';
import ComplaintSummary from './ComplaintSummary';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const viewcomplaints = (props) => {
    const { complaints} = props;
    return (
        <div className="complaint-list section view-complaints">
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

const mapStateToProps = (state) => {
    console.log(state.firebase.auth.uid)
    const id = state.firebase.auth.uid;
    const data = state.firestore.ordered.complaints;
    var filteredData = [];
    if(data){
        Object.keys(data).forEach(function(key) {
            if(data[key].complaintFromId == id)
                filteredData.push(data[key]);
        });
    }
    console.log(filteredData)
    return{
        complaints: filteredData,
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
       { collection: 'complaints', orderBy: ['createdAt', 'desc'] },
    ])
)(viewcomplaints);;