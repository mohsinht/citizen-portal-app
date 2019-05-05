import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom';

const Notifications = (props) => {
  const { notifications } = props;
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="online-users">
            { notifications && notifications.map(item =>{
              return <li key={item.id}>
              <Link to={"/complaint/"+ item.link}>
                <span className="pink-text">{item.user} </span>
                <span>{item.content} against {item.against}</span>
                <div className="note-date grey-text">{moment(item.time.toDate()).fromNow()}</div>
                </Link>
              </li>

            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Notifications