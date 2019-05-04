import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComplaint } from '../../store/actions/complaintActions'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import departments from '../../config/departments'

export class AddComplaint extends Component {
    state = {
        title : '',
        content: '',
        address: '',
        errMsg: 'please fill in the details',
        department: this.props.match.params.slug,
        status: 0
    }
    handleChange = (e) => {
        if(e.target.value.length < 5){
            console.log('error!')
            this.setState({
                errMsg: [e.target.id] + ' cannot be less than 5 letters!'
            })
        }else{
            this.setState({
                errMsg: ''
            })
        }
        this.setState({
            [e.target.id]: e.target.value 
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.errMsg == ''){
            console.log('no error!')
            this.props.addComplaint(this.state);
            this.props.history.push('/');
        }
    }
    render() {
        const { auth } = this.props;
        if(!auth.uid){
            return <Redirect to='/signin' />
        }
        const slug = this.props.match.params.slug;
        const department = departments.filter(item => {
            return Object.keys(item).some(key =>
              item[key].toLowerCase().includes(slug)
            );
        });
        console.log(department);
        const errMsg = this.state.errMsg;
        return (
            <div>
                <div className="container cpContent">
                    <div className="back-button" style={{marginTop: 20}}>
                        <Link to='/selectdepartment'><i className="material-icons">chevron_left</i><span style={{ position: 'absolute'}}>back</span></Link> 
                    </div>
                    <form onSubmit={this.handleSubmit} className="white">
                        <h5 className="grey-text text-darken-3">
                            Add a Complaint - <span className="add-complaint-department">{department[0].name}</span>
                        </h5>
                        <div className="input-field">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" onChange= {this.handleChange} data-length="50" />
                        </div>

                        <div className="input-field">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" onChange= {this.handleChange} />
                        </div>

                        <div className="input-field">
                            <label htmlFor="content">Complaint Details</label>
                            <textarea name="content" id="content" cols="30" rows="20" className="materialize-textarea add-complaint-details"  onChange= {this.handleChange} data-length="120"></textarea>
                        </div>

                        <div className="input-field">
                            <button className="btn cpBtn lighten-1 z-depth-0">Submit</button>
                        </div>
                        <div className="center red-text">
                            { errMsg ? <p>{errMsg}</p> : null }
                        </div>
                    </form>
                </div>
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    //console.log(state);
    return{
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addComplaint: (complaint) => dispatch(addComplaint(complaint))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComplaint)
