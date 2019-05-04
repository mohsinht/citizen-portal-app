import React, { Component } from 'react'
import { connect } from 'react-redux'
import DepartmentBox from './DepartmentBox'
import { Redirect } from 'react-router-dom'
import departments from '../../config/departments'
import { Link } from 'react-router-dom'


export class ChooseDept extends Component {
    state = {
        searchQuery: '', 
        fDept: ''
    }

    constructor(){
        super()
        this.state = { searchQuery: '', fDept: departments }
    }

    handleChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        })

    }
    render() {
        const { auth } = this.props;
        if(!auth.uid){
            return <Redirect to='/signin' />
        }
        const { searchQuery, fDept } = this.state;
        const lowercasedFilter = searchQuery.toLowerCase();
        const filteredData = fDept.filter(item => {
          return Object.keys(item).some(key =>
            item[key].toLowerCase().includes(lowercasedFilter)
          );
        });
        console.log(filteredData);
        return (
            <div>
                <div className="container cpContent">
                    <div className="complaint-heading">
                        <h1>Complaint Form</h1>
                    </div>
                    <div>
                        <div className="row" style={{marginTop: 0}}>
                            <div className="col s12 m3 complaint-department-heading">
                                <h2>Select Department</h2>
                            </div>
                            <div className="col s12 m9 offset-m3 complaint-department-separator">
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="row">
                            <div className="input-field col s3 offset-m4">
                                <input id="searchText" type="text" placeholder="Search" className="validate" onChange= {this.handleChange}  />
                                <span><i className="material-icons searchIcon">search</i></span>
                            </div>
                        </div>
                    </div>

                    <div className="row departments-list section">
                        { filteredData && filteredData.map(department => {
                            return (
                                <Link to={'/add/' + department.slug} key = {department.slug}>
                                    <DepartmentBox department={department}  />
                                </Link>
                            )
                        })}
                    </div>
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

export  default connect(mapStateToProps,)(ChooseDept);