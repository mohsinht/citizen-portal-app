import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { Link } from 'react-router-dom';
import Reason from './Reason';
import MarkComplaint from '../admin/MarkComplaint';

const ComplaintDetails = (props) => {
    const { complaint, auth, profile, id } = props;
    if(!auth.uid){
        return <Redirect to='/signin' />
    }
    var status = '';
    var posterName;
    var markOption;
    if(profile && profile.isAdmin){
        const cdata = {complaint, id}
        markOption = <MarkComplaint complaint={cdata} />;
    }
    if(complaint){
        status = complaint.status === 0 ? 'Pending' : complaint.status === 1 ? 'Resolved' : 'Rejected';
        posterName = complaint.isAnnonymous ? 'Annonymous' : complaint.complaintFromFirstName + " " + complaint.complaintFromLastName;
    }
    if(complaint) {
        return (
        <div className="container section project-details cpContent">
            <div className="back-button">
                <Link to='/'><i className="material-icons">chevron_left</i><span style={{ position: 'absolute'}}>back</span></Link> 
            </div>
            
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title"><p style={{fontSize: 15}}>Status: { status }</p> { complaint.title }</span>
                    <p>{ complaint.content }</p>
                    <div className="card-action grey lighten-4 grey-text" style={{marginTop: 25}}>
                        <div>Posted by {posterName} against { complaint.department }</div>
                        <div>{moment(complaint.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
            </div>
            <Reason complaint = {complaint} />

            {markOption}
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
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        id: id
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'complaints' }
    ])
)(ComplaintDetails)
