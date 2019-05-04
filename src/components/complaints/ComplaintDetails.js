import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { Link } from 'react-router-dom';

const ComplaintDetails = (props) => {
    const { complaint, auth } = props;
    if(!auth.uid){
        return <Redirect to='/signin' />
    }
    if(complaint) {
        return (
            
            <div className="container section project-details cpContent">
            <div className="back-button">
                <Link to='/'><i className="material-icons">chevron_left</i><span style={{ position: 'absolute'}}>back</span></Link> 
            </div>
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title"><p style={{fontSize: 15}}># { complaint.complaintFromId }</p> { complaint.title }</span>
                    <p>{ complaint.content }</p>
                    <div className="card-action grey lighten-4 grey-text" style={{marginTop: 25}}>
                        <div>Posted by { complaint.complaintFromFirstName } { complaint.complaintFromLastName }</div>
                        <div>{moment(complaint.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    else{
        return (
            <div className="container center cpContent">
                <p>LOADING COMPLAINT...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    //console.log(state);
    const id = ownProps.match.params.id;
    const complaints = state.firestore.data.complaints;
    const complaint = complaints ? complaints[id] : null;
    return {
        complaint: complaint,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'complaints' }
    ])
)(ComplaintDetails)
