import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux'

const Navbar = (props) => {
    const { auth, profile } = props;
    const links = auth.uid ? <SignedInLinks profile={ profile } /> : <SignedOutLinks />;
    const addButton = <li><Link to='/selectdepartment'><div className="waves-effect waves-light btn cp-button">Add A Complaint</div></Link></li>;
    const buttonsNav = auth.uid ? addButton : '';
    return (
        <div>
            <nav className = "nav-wrapper grey darken-3">
                <div className="container cpContent">
                    <ul className="right">
                        { buttonsNav }
                    </ul>
                </div>
            </nav>
            <ul id="slide-out" className="sidenav sidenav-fixed cp-menu">
                <Link to='/'><img src="/images/logo.png" alt="Citizen Portal" className="cp-logo"/></Link>
                <hr className="menuLine" />
                { links }
            </ul>
        </div>
    );
}

const mapStateToProps = (state) => {
  // console.log(state);
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)