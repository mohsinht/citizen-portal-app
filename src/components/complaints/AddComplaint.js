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
        status: 0,
        markedBy: '',
        markedOn: '',
        reason: '',
        isAnnonymous: 0
    }
    handleChange = (e) => {
        console.log(e.target.checked);
        if(e.target.id !== 'annonymous' && e.target.value.length < 5){
            this.setState({
                errMsg: [e.target.id] + ' cannot be less than 5 letters!'
            })
        }else{
            this.setState({
                errMsg: ''
            })
        }
        if(e.target.id !== 'annonymous'){
            this.setState({
                [e.target.id]: e.target.value 
            })
        }else{
            this.setState({
                isAnnonymous: e.target.checked
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.title.length < 5 || this.state.content.length  < 5 || this.state.address.length < 5){
            this.setState({
                errMsg: 'Details cannot be less than 5 letters!'
            })
        }
        else if(this.state.title.length > 50 || this.state.content.length > 1000 || this.state.address.length > 250){
            this.setState({
                errMsg: 'Too long content. Make sure that title is less than 50 characters and details are less than 1000 characters.'
            })
        }
        else if(this.state.errMsg === ''){
            this.props.addComplaint(this.state);
            this.props.history.push('/added');
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
        if(department.length === 0){
            this.props.history.push('/selectdepartment');
            return(
                <div>
                    <p>error</p>
                </div>
            )
        }
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
                            <span className="helper-text" data-error="wrong" data-success="right">Add up to 50 characters in the title</span>
                        </div>

                        <div className="input-field">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" onChange= {this.handleChange} />
                            <span className="helper-text" data-error="wrong" data-success="right">Complete address of the location where you find these irregularities</span>
                        </div>

                        <div className="switch">
                            <label>
                                Show My Name
                            <input id="annonymous" onChange= {this.handleChange} type="checkbox" />
                            <span className="lever"></span>
                                Remain Annonymous
                            </label>
                        </div>

                        <div className="input-field">
                            <label htmlFor="content">Complaint Details</label>
                            <textarea name="content" id="content" cols="30" rows="20" className="materialize-textarea add-complaint-details"  onChange= {this.handleChange} data-length="120"></textarea>
                            <span className="helper-text" data-error="wrong" data-success="right">Add all the details for the authorities to properly investigate your problem</span>
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
