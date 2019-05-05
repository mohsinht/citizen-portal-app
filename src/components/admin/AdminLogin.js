import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

export class AdminLogin extends Component {
    state = {
        email : '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value 
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
    }
    render() {
        const { authError, auth } = this.props;
        if(auth.uid){
            return <Redirect to='/' />
        }

        
        return (
            <div>
                <div className="container cpContent">
                    <form onSubmit={this.handleSubmit} className="white" style={{ width: 600, marginLeft: 180 }}>
                        <h5 className="grey-text text-darken-3">
                            Account Access - Admin Only
                        </h5>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange= {this.handleChange} />
                        </div>

                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange= {this.handleChange} />
                        </div>

                        <div className="input-field">
                            <button className="btn cpBtn lighten-1 z-depth-0 cpBtn2">Access Admin</button>
                            <div className="center red-text">
                                { authError ? <p>{authError}</p> : null }
                            </div>
                        </div>
                    </form>
                </div>
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      signIn: (creds) => dispatch(signIn(creds))
    }
  }
  

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);
  
