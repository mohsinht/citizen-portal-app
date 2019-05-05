import React, { Component } from 'react';
import Notifications from './Notifications';
import ComplaintList from '../complaints/ComplaintList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Stats from './Stats'
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    render(){
        const { complaints, auth, notifications, allComplaints } = this.props
        //console.log(complaints);

        if(!auth.uid){
            return <Redirect to='/signin' />
        }
        return (
            <div className="dashboard container cpContent">
                <div className="row">
                    <div className="col s12 m6">
                        <ComplaintList complaints = { complaints } />
                        <Link to='/view'><div className="waves-effect waves-light btn cp-button" style={{marginLeft: 125}}>View all complaints</div></Link>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications = { notifications } />
                        <Stats complaints = { allComplaints } />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    var LIMIT = 3;

    const isAdmin = state.firebase.profile.isAdmin;
    const id = state.firebase.auth.uid;
    const data = state.firestore.ordered.complaints;
    var filteredData = [];
    var count = 0;
    if(data){
        Object.keys(data).forEach(function(key) {
            if(count<LIMIT+1 && (isAdmin || data[key].complaintFromId === id)){
                filteredData.push(data[key]);
                count++;
            }
        });
    }

    var unfilteredData = [];
    if(data){
        Object.keys(data).forEach(function(key) {
            if(isAdmin || data[key].complaintFromId === id){
                unfilteredData.push(data[key]);
            }
        });
    }

    const data2 = state.firestore.ordered.notifications;
    var filteredData2 = [];
    count = 0;
    if(data2){
        Object.keys(data2).forEach(function(key) {
            if(count<LIMIT && (isAdmin || data2[key].userid === id)){
                filteredData2.push(data2[key]);
                count++;
            }
        });
    }


    return{
        complaints: filteredData,
        auth: state.firebase.auth,
        notifications: filteredData2,
        allComplaints: unfilteredData
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
       { collection: 'complaints', orderBy: ['createdAt', 'desc'] },
       { collection: 'notifications', orderBy: ['time', 'desc'] }
    ])
)(Dashboard);