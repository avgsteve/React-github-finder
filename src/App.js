import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';

import PropTypes from 'prop-types';

import axios from 'axios';

import './App.css';

class App extends Component {

  // ==== 1) Set-Ups for components
  state = {
    users: [],
    loadingApi: false, //initial state indicates if the content has been loaded in componentDidMount()
    alertConfig: null, // set up by settingAlert method
  }

  static propTypes = {
    searchGithubUsers: PropTypes.func // .isRequired
    // to check searchGithubUsers must be a function
  }

  // ==== 2) Initialize and change state properties upon loading the page
  async componentDidMount() {

    this.setState( // changes the properties in the "state" object
      { loadingApi: false }
    );

    // setTimeout( //use setTimeout for testing purpose
    //   async () => {

    //     // const res = await axios.get('https://api.github.com/users'); //still async/await

    //     const res = await axios.get('https://api.github.com/users', {
    //       headers: {
    //         Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
    //       }
    //     })

    //     this.setState({ users: res.data, loadingApi: false });

    //     console.log('fetched!');

    //   }, 600);

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


  // =======3) PROPS methods =======

  // send GET req to API to find user
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


  clearUsersData_andInputField = () => {
    // for testing
    console.log(`\nUsers' data and search field have been cleared!\n`);

    this.setState({ users: [], loading: false })
  };

  setAlert = (msg, type) => {
    console.log('\n\n"this" obj in setAlert() in App.js:\n', this); //

    this.setState(
      {
        alertConfig:
        {
          msg: msg, type: type
        }
      }
    )

    setTimeout(() => {
      this.setState(
        { alertConfig: null }
      )
    }, 3000);


  }


  // ==== 4) The Components to be rendered 
  render() {
    /*
    // #1 render() can pass data to components and display them
    // #2 render() is needed ONLY WHEN this App is exported as Class.
    */

    const { users, loadingApi } = this.state;

    return (
      <div className='App'>

        <Navbar />

        <div className="container">
          {/* Render "Users" component INSIDE a div. */}
          <Alert configs=
            {
              this.state.alertConfig
            } />

          <Search
            searchUsers={this.searchGithubUsers}

            clearUsers={this.clearUsersData_andInputField}

            toggleClearButton={users.length > 0 ? true : false}

            empty_input_alert={
              this.setAlert
              // this.setAlert is a method method will receive arguments from the value passed in from the value of the attribute "empty_input_alert" in a form's onSubmit event in Search.js
            }
          />
          {/* 
          #1) The attribute "searchUsers" is triggered by Search.js's form "onSubmit" event listener.
          
          The value in attribute: "this.searchGithubUsers" is the "Props methods" in this file
          #2) 
          */}

          <Users loadingApi={loadingApi} users={this.state.users} />
          {/* "Users" component uses "UserItems" to render users' data on page

          #1) The attributes' names like "loadingApi", "users" must match the function parameter names in Users.js (as arguments in arrow function component)

          #2) The attributes' value is linked to the "state" obj in this file.
          */}

        </div>

      </div>
    );
  }

}

export default App;
