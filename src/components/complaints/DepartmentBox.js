import React from 'react';

const DepartmentBox = ({department}) => {
    return (
            <div className="card z-depth-0 complaint-summary col s12 m6 l3 department-box">
                <div className="card-content grey-text text-darken-3">
                    <span><i className="material-icons department-icon">{department.icon}</i></span>
                    < hr className="department-icon-separator" />
                    <span className="card-title department-name">
                        {department.name}
                    </span>
                </div>
            </div>
    );
}

export default DepartmentBox;