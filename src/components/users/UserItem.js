import React from 'react';
import PropTypes from 'prop-types';


const UserItem = ({ user: { login, avatar_url, html_url } }) => {

  // Removed code: const {  } = props.user;  and use { user: { login, avatar_url, html_url } } as parameters instead.

  // As now UserItem is an arrow function getting data by using destructuring arguments. Also no need to use render() in Arrow function

  return (
    <div className='card text-center'>

      <img src={avatar_url} alt=''
        className='round-img' style={{ width: '60px' }} />

      <h3>{login}</h3>

      <a href={html_url} className='btn btn-dark btn-sm my-1'>
        More
        </a>

    </div>
  );

};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,  //To define the type of argument passed into arrow function has to be obj and required to make this function work

}



export default UserItem;
