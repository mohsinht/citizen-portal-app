import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

const SignedInLinks = (props) => {
    return (
        <div>
            <NavLink to='/' className="btn btn-floating cpBtn lighten-1 cp-profileDP">
                {props.profile.initials}
            </NavLink>
            <p className="menu-profile-name">{ props.profile.firstName } { props.profile.lastName }</p>

            <hr className="menu-separator" />
            <ul>
                <li><NavLink to='/'><i className="material-icons">insert_chart_outlined</i>Dashboard</NavLink></li>
                <li><NavLink to='/selectdepartment'><i className="material-icons">note_add</i>Add Complaint</NavLink></li>
                <li><NavLink to='/view'><i className="material-icons">remove_red_eye</i>View Complaints</NavLink></li>
                <li><a onClick = {props.signOut} ><i className="material-icons">exit_to_app</i>Log Out</a></li>
            </ul>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch (signOut())
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return{

    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);