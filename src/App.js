import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
// import UserItem from './components/users/UserItem';
import Users from './components/users/Users'; // "User" component uses UserItem and passes in the Props data as users Array

import './App.css';

class App extends Component {

  render() {

    return (
      <div className='App'>

        <Navbar />

        {/* Render Users component inside a div.
        And Users component uses UserItems to render users' data */}
        <div className="container">
          <Users />
        </div>

      </div>
    );
  }

}

export default App;
