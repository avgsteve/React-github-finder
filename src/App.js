import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
// import UserItem from './components/users/UserItem';
import Users from './components/users/Users'; // "User" component uses UserItem and passes in the Props data as users Array

import axios from 'axios';

import './App.css';

class App extends Component {

  // ==== 1) 
  state = { //Set up state obj for components
    users: [],
    loadingApi: false, //initial state indicates if the content has been loaded in componentDidMount()
  }

  // ==== 2) 
  async componentDidMount() { // Initialize and change state properties upon loading the page

    this.setState( // changes the properties in the "state" object
      { loadingApi: true }
    );

    const fetchedData = await axios.get('https://api.github.com/users');
    // .then(responseFromAPI => console.log(responseFromAPI.data));

    console.log('\n=== The data fetched from response of Github API: === \n');
    console.log(fetchedData);

    this.setState( // changes the properties in the "state" object
      {
        users: fetchedData.data,
        loadingApi: false
      }
    );

    //ref:  https://reactjs.org/docs/react-component.html#componentdidmount

  } // end of 2) componentDidMount()


  // ==== 3)  
  render() { // pass data to components and display them

    return (
      <div className='App'>

        <Navbar />

        <div className="container">

          {/* Render "Users" component inside a div.
          And Users component uses UserItems to render users' data */}`

          <Users loading={this.state.loadingApi} users={this.state.users} />

        </div>

      </div>
    );
  }

}

export default App;
