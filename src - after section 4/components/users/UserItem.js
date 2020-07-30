import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const UserItem = (
  { user: { login, avatar_url, html_url }
    // "login" is the user name (also the user id) to be attached to /user/ URI to display user's page on Github

  }) => {

  // Removed code: const {  } = props.user;  and use { user: { login, avatar_url, html_url } } as parameters instead.

  // As now UserItem is an arrow function getting data by using destructuring arguments. Also no need to use render() in Arrow function

  return (
    <div className='card text-center'>

      <img src={avatar_url} alt=''
        className='round-img' style={{ width: '60px' }} />

      <h3>{login}</h3>

      <div>
        <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
          More
        </Link>
      </div>

    </div>
  );

};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,  //To define the type of argument passed into arrow function has to be obj and required to make this function work

}



export default UserItem;
