import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

class UserItem extends Component {

  state = {
    id: id,
    login: 'Steve',
    avatar_url: 'http...',
    html_url: 'https://github.com/avgsteve'
  };

  render() {
    const { login, avartar_url, html_url } = this.state; //use destructuring to get value from state variable

    return (<div>
      // return a div with image
      <img src={avartar_url} alt='' className='roung-img' style={{
        width: '60px'
      }} />
    </div>)
  }

};

export default UserItem;
