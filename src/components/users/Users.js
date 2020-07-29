import React from 'react';
import UserItem from './UserItem';
// 1) Use and send data to "UserItem" component to render data

import Spinner from '../layout/Spinner';

const Users = ({ users, loadingApi }) => { // 2) Being used by App.js, get "state" from App.js (props) first


  // 3) === (NO NEED for render() ) when using Arrow function as exported component ) ===
  // In render(), use Component "UserItem" and pass in Props "key" and "user"

  // this IF condition will be executed every time the state is changed in Main Components (App.js)
  if (loadingApi) {
    return <Spinner />  // display the loader if the loading API process is ongoing
  } else { // if loading is finished (loadingApi set back to false),

    // 4) create CSS style for the <div style={userStyle}> to wrap UserItem
    const divStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: '1rem'
    };

    // 5) Wrap the function and component UserItem inside the div
    // user={user} is the "Props" data for UserItem component
    return (
      <div style={divStyle} >
        { // JSX Syntax
          users.map(
            user => (<UserItem key={user.id} user={user} />)
          )
        }
      </div>
    );

  }

} // end of line of : const Users = ({ users, loadingApi }) => {

export default Users;

