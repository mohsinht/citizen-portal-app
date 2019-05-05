import React from 'react';
import { Link } from 'react-router-dom';
const ComplaintAdded = () => {
    return (
            <div className="cpContent">
                <i className="material-icons success-icon cp-theme">done</i>
                <p className="center success-text" style={{width: 574}}>Your complaint has been added. Please wait while the authorities accept and resolve your complaint. This may take a little time to complete.</p>
                <Link to='/'><div className="waves-effect waves-light btn cp-button success-btn">Go back to dashboard</div></Link>
            </div>
    );
}

export default ComplaintAdded;