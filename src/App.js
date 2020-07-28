import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
// import UserItem from './components/users/UserItem';
import Users from './components/users/Users'; // "User" component uses UserItem and passes in the Props data as users Array
import Search from './components/users/Search';
import PropTypes from 'prop-types';

import axios from 'axios';

import './App.css';

class App extends Component {

  // ==== 1) Set up state obj for components
  state = {
    users: [],
    loadingApi: false, //initial state indicates if the content has been loaded in componentDidMount()
  }

  static propTypes = {
    searchGithubUsers: PropTypes.func.isRequired, // to check searchGithubUsers must be a function
  }


  // ==== 2) Initialize and change state properties upon loading the page
  async componentDidMount() {

    this.setState( // changes the properties in the "state" object
      { loadingApi: true }
    );

    setTimeout( //use setTimeout for testing purpose

      async () => {

        // const res = await axios.get('https://api.github.com/users'); //still async/await

        const res = await axios.get('https://api.github.com/users', {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
          }
        })

        this.setState({ users: res.data, loadingApi: false });

        console.log('fetched!');

      }, 600);

    // const fetchedData = await axios.get('https://api.github.com/users');
    // // .then(responseFromAPI => console.log(responseFromAPI.data));
    // console.log('\n=== The data fetched from response of Github API: === \n');
    // console.log(fetchedData);

    // this.setState(
    //   {
    //     users: fetchedData.data,
    //     loadingApi: false
    //   });

    //ref:  https://reactjs.org/docs/react-component.html#componentdidmount

  } // end of 2) componentDidMount()



  // App'js static method used to send GET req to API to find user
  searchGithubUsers = async text => {

    this.setState({ loadingApi: true });


    // for testing
    console.log('==> Text input received in method "searchUsers":\n', text);

    // get results from API
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
        }
      }
    );

    // use result data to update the objects in state
    this.setState({ users: res.data.items, loadingApi: false });

    // for testing
    console.log('User query result fetched!');

  }


  // ==== 3)  
  render() { // pass data to components and display them

    return (
      <div className='App'>

        <Navbar />

        <div className="container">
          {/* Render "Users" component inside a div.
          And Users component uses UserItems to render users' data */}

          <Search searchUsers={this.searchGithubUsers} />

          <Users loadingApi={this.state.loadingApi} users={this.state.users} />

          {/* The attribute names in <Users />  must match the function parameter names */}

        </div>

      </div>
    );
  }

}

export default App;
