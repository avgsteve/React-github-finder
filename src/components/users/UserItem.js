import React, { Component } from 'react';

class UserItem extends Component {

  state = {
    id: 'id',
    login: 'Steve Leng',
    avatar_url: 'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp',
    html_url: 'https://github.com/avgsteve'
  };  // get value from arguments as state data

  render() {
    const { login, avatar_url, html_url } = this.state;  // get avatar_url, login(name) from state for any users instead of just one

    return (
      <div className='card text-center'>

        <img src={avatar_url} alt=''
          className='round-img' style={{ width: '60px' }} />

        <h3>{login}</h3>

        <a href={`/user/${html_url}`} className='btn btn-dark btn-sm my-1'>
          More
        </a>

      </div>);

  }
};

export default UserItem;
