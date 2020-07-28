import React, { Component } from 'react';
import UserItem from './UserItem';

// 1) This component "Users" uses UserItem moudle to send data to it.
// 2) Then use UserItem to display results in App.js

class Users extends Component {

  // 3) In render(), use Component "UserItem" and pass in Props "key" and "user"
  // Props is the data from this.state


  render() {

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
        {
          this.props.users.map(user => (
            <UserItem key={user.id} user={user} />
          )
          )
        }
      </div>
    );
  }
}

export default Users;

