import React, { Component } from 'react'
import { connect } from 'react-redux'
import { markComplaint } from '../../store/actions/markComplaint'

export class MarkComplaint extends Component {
    state = {
        status : '',
        markedByDesignation: '',
        reason:'',
        errMsg: '',
        comId: ''
    }
    constructor(props){
        super(props)
        this.state = { status: 1, reason: '', markedByDesignation: 'head', comId: this.props.complaint.id }
    }
    handleChange = (e) => {
        if(e.target.id === 'status'){
            var num = parseInt(e.target.value);
            this.setState({
                status: num 
            })
        }else{
            this.setState({
                [e.target.id]: e.target.value 
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.markComplaint(this.state);
    }
    render(){
        const { complaint } = this.props;
        const errMsg = this.state.errMsg;
        return (
            <div className="card z-depth-0 grey darken-3">
                <div className="card-content">
                    <span className="card-title white-text"><p>Admin Options</p></span>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s6">
                                <p className="white-text" style={{marginBottom: 10}}>Change status to</p>
                                <select id="status" className="browser-default" onChange= {this.handleChange} >
                                    <option value="1">Resolved</option>
                                    <option value="2">Rejected</option>
                                    <option value="0">Pending</option>
                                </select>
                            </div>
                            <div className="input-field col s6">
                                <p className="white-text" style={{marginBottom: 10}}>From {complaint.department}, mark this complaint as</p>
                                <select id="markedByDesignation" className="browser-default" onChange= {this.handleChange} >
                                    <option value="Head">Head</option>
                                    <option value="Deputy_Director">Deputy Director</option>
                                    <option value="Assistant_Director">Assistant Director</option>
                                    <option value="Secretary">Secretary</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field">
                                <label htmlFor="content" className="reason-label">Reason</label>
                                <textarea id="reason" name="content" cols="30" rows="20" className="materialize-textarea add-complaint-details reason-details"  onChange= {this.handleChange} data-length="120"></textarea>
                                <span className="helper-text white-text" data-error="wrong" data-success="right">Add all the details that you've gone through to solve this issue</span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field">
                                <button className="btn cpBtn lighten-1 z-depth-0 right">Update</button>
                                <div className="center red-text">
                                    { errMsg ? <p>{errMsg}</p> : null }
                                </div>
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
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markComplaint: (rData) => dispatch(markComplaint(rData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkComplaint);