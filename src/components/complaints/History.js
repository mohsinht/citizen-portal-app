import React, { Component } from 'react';
import Notifications from '../dashboard/Notifications';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class History extends Component {
    render(){
        const { auth, notifications } = this.props
        //console.log(complaints);

        if(!auth.uid){
            return <Redirect to='/signin' />
        }
        return (
            <div className="dashboard container cpContent">
                <div className="row">
                        <Notifications notifications = { notifications } />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const id = state.firebase.auth.uid;
    const data2 = state.firestore.ordered.notifications;
    var filteredData2 = [];
    if(data2){
        Object.keys(data2).forEach(function(key) {
            if(data2[key].userid === id){
                filteredData2.push(data2[key]);
            }
        });
    }
    return{
        auth: state.firebase.auth,
        notifications: filteredData2
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
       { collection: 'notifications', orderBy: ['time', 'desc'] }
    ])
)(History);