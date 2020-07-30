import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User'; // display single user's profil page
import Search from './components/users/Search';
import About from './components/pages/About';

import PropTypes from 'prop-types';

import axios from 'axios';

import './App.css';

class App extends Component {

  // ==== 1) Set-Ups for components
  state = {
    users: [],
    state_singleUserData: {},
    loadingApi: false, //initial state indicates if the content has been loaded in componentDidMount()
    state_LoadingSpinner: false,
    alertConfig: null, // set up by settingAlert method
  }

  static propTypes = {
    searchGithubUsers: PropTypes.func // .isRequired
    // to check searchGithubUsers must be a function
  }

  // ==== 2) Initialize and change state properties upon loading the page
  async componentDidMount() {

    this.setState( // changes the properties in the "state" object
      { state_LoadingSpinner: false }
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

    this.setState({ state_LoadingSpinner: true });

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
    this.setState({ users: res.data.items, state_LoadingSpinner: false });

    // for testing
    console.log('User query result fetched!\n\n');

  }


  getSingleUserData = async username => {

    this.setState({ state_LoadingSpinner: true });

    // for testing
    console.log('==> Current username received in "getSingleUserData":\n', username);

    // get results from API
    const response_userProfile = await axios.get(`https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
        }
      }
    );

    // For testing, log results from API
    console.log('Single user\'s data from Github API:\n');
    console.log(response_userProfile.data);


    // Update the object "state_singleUserData" in state, 
    this.setState({
      state_singleUserData: response_userProfile.data,
      state_LoadingSpinner: false
    });



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

    const { users, state_singleUserData, state_LoadingSpinner } = this.state;
    // pull out the data from this.state and assign the data by destucturing

    return (
      <Router>
        {/* === React Router: Start === */}

        <div className='App'>

          <Navbar />

          <div className="container"> {/* Render ALL components INSIDE a div. */}

            <Alert configs=
              {
                this.state.alertConfig
              } />

            <Switch>

              <Route exact path='/' render=
                {props =>
                  (
                    <Fragment>

                      <Search
                        searchUsers={this.searchGithubUsers}
                        prop_clearUsers={this.clearUsersData_andInputField}

                        prop_toggleClearButton={users.length > 0 ? true : false}

                        empty_input_alert={
                          this.setAlert
                          // this.setAlert is a method method will receive arguments from the value passed in from the value of the attribute "empty_input_alert" in a form's onSubmit event in Search.js
                        } />

                      {/* 
                        #1) The attribute "searchUsers" is triggered by Search.js's form "onSubmit" event listener.
                        
                        The value in attribute: "this.searchGithubUsers" is the "Props methods" in this file
                        #2) 
                        */}

                      <Users stateOf_displayLoadingSpinner={state_LoadingSpinner} users={this.state.users} />

                      {/* "Users" component uses "UserItems" to render users' data on page

                        #1) The attributes' names like "stateOf_displayLoadingSpinner", "users" must match the function parameter names in Users.js (as arguments in arrow function component)

                        #2) The attributes' value is linked to the "state" obj in this file.
                        */}

                    </Fragment>
                  )
                }
              />

              <Route exact path='/about' component={About} />

              <Route exact path='/user/:username' render={props => (


                < User // display single user's profil page

                  // When mounting this component, its componentDidMount() calls getSingleUserData() from props.methods

                  {...props}

                  prop_getUserData={this.getSingleUserData
                    // need to pass username to this method to query user's profile data via Github API
                  }

                  prop_userData={
                    state_singleUserData
                    // singleUserData equals to this.state_singleUserData obj for data from HTTP response from this.getSingleUserData()
                  }

                  prop_state_LoadingSpinner={state_LoadingSpinner
                    // The loading status to toggle spinner icon while loading the data from API query
                  }

                  prop_allProos={props}
                />


              )} />

            </Switch>
          </div>

        </div> {/* === end of <div className='App'> == */}
      </Router>

    );
  }

}

export default App;
