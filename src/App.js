import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User'; // display single user's profil page
import Search from './components/users/Search';
import About from './components/pages/About';
// import PropTypes from 'prop-types';
import axios from 'axios';

import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {

  // ==== [state_Of_Obj, state_Setter] = useState(default_State) ===
  const [state_searchResults_usersData, setState_UsersData] = useState([]);
  const [state_singleUserData, setState_SingleUserData] = useState({}); //
  const [state_userRepos_inArray, setState_UserRepos] = useState([]); //
  const [state_LoadingSpinner, setState_LoadingState] = useState(false); //
  const [state_alertConfig, setState_setAlert] = useState(null); // default: empty Array, set up by settingAlert method


  // send GET req to API to find user
  const getUsersByName = async text => {

    setState_LoadingState(true);

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

    // for testing
    console.log('User query result fetched!\n\n');
    setState_UsersData(res.data.items);
    setState_LoadingState(false);
  }


  const getSingleUserData = async username => {

    setState_LoadingState(true);

    // for testing
    // console.log('==> Current username received in "getSingleUserData":\n', username);

    // === get user's profile ===
    const response_userProfile = await axios.get(`https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
        }
      }
    );

    // For testing, log out results from API
    // console.log('Single user\'s data from Github API:\n');
    // console.log(response_userProfile.data);

    setState_SingleUserData(response_userProfile.data);
    setState_LoadingState(false);
  }


  const getUserRepos = async username => {

    setState_LoadingState(true);

    // for testing the user name from React Router's params
    // console.log('==> Current username received in "getSingleUserData":\n', username);

    const response_userRepos = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
        }
      }
    );

    // // For testing, log results from API
    console.log('Single user\'s repo from Github API:\n');
    console.log(response_userRepos.data);

    // Update the object "state_singleUserData" in state, 

    setState_UserRepos(response_userRepos.data);
    setState_LoadingState(false);

  }

  // Clear search results from page
  const clearUsersData = () => {

    console.log(`\nUsers' data and search field have been cleared!\n`);

    setState_UsersData([]);
    setState_LoadingState(false);

  };


  const setAlert = (msg, type) => {

    console.log('\n\n"this" obj in setAlert() in App.js:\n', this);

    setState_setAlert({ msg: msg, type: type })

    setTimeout(
      () => {
        setState_setAlert(null);
      }, 3000);
  }


  return (
    <GithubState>
      <Router>
        {/* === React Router: Start === */}

        <div className='App'>

          <Navbar />

          <div className="container"> {/* Render ALL components INSIDE a div. */}

            <Alert displayConfigs=
              {
                state_alertConfig
              } />

            <Switch>

              <Route exact path='/' render=
                {props =>
                  (
                    <Fragment>

                      <Search
                        prop_searchUsers={getUsersByName}
                        prop_clearUsers={clearUsersData}

                        prop_toggleClearButton={state_searchResults_usersData.length > 0 ? true : false}

                        empty_input_alert={
                          setAlert
                          // this.setAlert is a method method will receive arguments from the value passed in from the value of the attribute "empty_input_alert" in a form's onSubmit event in Search.js
                        } />

                      <Users
                        stateOf_displayLoadingSpinner={state_LoadingSpinner}
                        usersData={state_searchResults_usersData} />

                    </Fragment>
                  )
                }
              />

              <Route exact path='/about' component={About} />


              {/* ==== For single user's profile and repos ==== */}

              <Route exact path='/user/:username' render={props => (


                < User // display single user's profil page

                  {...props} // this will pass in the Objects as props from Router

                  prop_getUserData={getSingleUserData
                    // need to pass username to this method to query user's profile data via Github API
                  }

                  prop_userData={
                    state_singleUserData
                  }

                  prop_getUserRepo={getUserRepos
                    // need to pass username to this method to query user's profile data via Github API
                  }


                  prop_userRepos={state_userRepos_inArray
                  } // get repos data from variable "state_userRepos_inArray" by destructuring this.state


                  prop_LoadingSpinner={state_LoadingSpinner
                  }

                  prop_allProos={props}
                />


              )} />

            </Switch>
          </div>

        </div> {/* === end of <div className='App'> == */}
      </Router>
    </GithubState>
  );

}

export default App;
