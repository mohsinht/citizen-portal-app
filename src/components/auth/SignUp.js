import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'

export class SignUp extends Component {
    state = {
        email : '',
        password: '',
        firstName: '',
        lastName: '',
        cnic: '',
        address: '',
        city: '',
        province: '',
        jobtitle: '',
        jobcompany: '',
        phonenumber: '',
        errMsg: 'Please fill in all the details first'
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value 
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();

        var regex = '';
        regex = /.+@.+\.[A-Za-z]+$/;
        if(!regex.test(this.state.email)){
            this.setState({
                errMsg: 'Your email address is not correct!'
            })
            return;
        }
        regex =  /^[a-zA-Z]+$/ ;
        if(!(regex.test(this.state.firstName) || regex.test(this.state.lastName))){
            this.setState({
                errMsg: 'Your first name or last name is not correct!'
            })
            return;
        }
        regex = /^\(?([0-9]{4})\)?[-. ]?([0-9]{7})$/;
        if(!(regex.test(this.state.phonenumber))){
            this.setState({
                errMsg: 'Your phone number is badly formatted. Make sure to follow 03xx-123xxxx format!'
            })
            return;
        }
        regex = /^\(?([0-9]{5})\)?[-. ]?([0-9]{7})[-. ]?([0-9]{1})$/;
        if(!(regex.test(this.state.cnic))){
            this.setState({
                errMsg: 'Your CNIC number is badly formatted. Make sure to follow xxxxx-xxxxxxx-x format!'
            })
            return;
        }
        this.setState({
            errMsg: ''
        })
        this.props.signUp(this.state);
    }
    render() {
        const { auth, authError } = this.props;
        const errMsg = this.state.errMsg;
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
                        <p>Account</p>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange= {this.handleChange} />
                        </div>

                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange= {this.handleChange} />
                        </div>
                        <p style={{ marginTop: 40 }}>Personal</p>
                        <div className="row">
                            <div className="col s12 m6">
                                <div className="input-field">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" id="firstName" onChange= {this.handleChange} />
                                    <span className="helper-text" data-error="wrong" data-success="right">As mentioned on CNIC</span>
                                </div> 
                            </div> 
                        
                            <div className="col s12 m6">
                                <div className="input-field">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" id="lastName" onChange= {this.handleChange} />
                                    <span className="helper-text" data-error="wrong" data-success="right">As mentioned on CNIC</span>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col s12 m6">
                                <div className="input-field">
                                    <label htmlFor="phonenumber">Mobile Number</label>
                                    <input type="text" id="phonenumber" onChange= {this.handleChange} />
                                    <span className="helper-text" data-error="wrong" data-success="right">Format: 0336-4251234</span>
                                </div> 
                            </div> 
                        
                            <div className="col s12 m6">
                                <div className="input-field">
                                    <label htmlFor="cnic">CNIC Number</label>
                                    <input type="text" id="cnic" onChange= {this.handleChange} />
                                    <span className="helper-text" data-error="wrong" data-success="right">Format: 35202-1234561-9</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <label htmlFor="address">Complete Home Address</label>
                                <input type="text" id="address" onChange= {this.handleChange} />
                                <span className="helper-text" data-error="wrong" data-success="right">Include city and province name</span>
                            </div>
                        </div>


                        <div className="input-field">
                            <button className="btn cpBtn lighten-1 z-depth-0">Register</button>
                            <div className="center red-text">
                                { authError ? <p>{authError}</p> : null }
                                { errMsg ? <p>{errMsg}</p> : null }
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
