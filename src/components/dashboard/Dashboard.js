import React, { Component } from 'react';
import Notifications from './Notifications';
import ComplaintList from '../complaints/ComplaintList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Dashboard extends Component {
    render(){
        const { complaints, auth, notifications } = this.props
        //console.log(complaints);

        if(!auth.uid){
            return <Redirect to='/signin' />
        }
        return (
            <div className="dashboard container cpContent">
                <div className="row">
                    <div className="col s12 m6">
                        <ComplaintList complaints = { complaints } />
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications = { notifications } />
                    </div>
                </div>
            </div>
        );
    }
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
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
       { collection: 'complaints', orderBy: ['createdAt', 'desc'] },
       { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
    ])
)(Dashboard);