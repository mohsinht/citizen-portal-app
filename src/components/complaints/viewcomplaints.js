import React from 'react';
import ComplaintSummary from './ComplaintSummary';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const viewcomplaints = (props) => {
    const { complaints, auth } = props;
    if(!auth.uid){
        return <Redirect to='/signin' />
    }
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
    const isAdmin = state.firebase.profile.isAdmin;
    const data = state.firestore.ordered.complaints;
    var filteredData = [];
    if(data){
        Object.keys(data).forEach(function(key) {
            if(isAdmin || data[key].complaintFromId === id)
                filteredData.push(data[key]);
        });
    }
    console.log(filteredData)
    return{
        complaints: filteredData,
        auth: state.firebase.auth
    }
}



export default compose(
    connect(mapStateToProps),
    firestoreConnect([
       { collection: 'complaints', orderBy: ['createdAt', 'desc'] },
    ])
)(viewcomplaints);;