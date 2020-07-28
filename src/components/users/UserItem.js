import React, { Component } from 'react';

class UserItem extends Component {

  // The state (Props) will now be passed in from the Users component

  render() {
    // get avatar_url, login(name), html_url from the data passed in from "this.props" via "Users" component in other file 
    // instead of from this.state via the state obj in this file

    const { login, avatar_url, html_url } = this.props.user;

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

  }

};

export default UserItem;
