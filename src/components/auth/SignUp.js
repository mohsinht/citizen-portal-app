import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'

export class SignUp extends Component {
    state = {
        email : '',
        password: '',
        firstName: '',
        lastName: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value 
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        this.props.signUp(this.state);
    }
    render() {
        const { auth, authError } = this.props;
        if(auth.uid){
            return <Redirect to='/' />
        }
        return (
            <div>
                <div className="container cpContent">
                    <form onSubmit={this.handleSubmit} className="white">
                        <h5 className="grey-text text-darken-3">
                            Register
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
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" onChange= {this.handleChange} />
                        </div>

                        <div className="input-field">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" onChange= {this.handleChange} />
                        </div>

                        <div className="input-field">
                            <button className="btn cpBtn lighten-1 z-depth-0">Register</button>
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
    return{
      auth: state.firebase.auth,
      authError: state.auth.authError
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      signUp: (info) => dispatch(signUp(info))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
