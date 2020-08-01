import React, {
  // Fragment,
  // useState // removed. No more component level state
} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import User from './components/users/User'; // display single user's profil page

import Home from './components/pages/Home'; // Included components: Search & Users

import About from './components/pages/About';

import NotFound from './components/pages/NotFound';

// ==== Component for providing global state ====
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => {

  // ==== [state_Of_Obj, state_Setter] = useState(default_State) ===

  // const [state_searchResults_usersData, setState_UsersData] = useState([]);

  // const [state_singleUserData, setState_SingleUserData] = useState({}); //

  // const [state_userRepos_inArray, setState_UserRepos] = useState([]); //

  // const [state_LoadingSpinner, setState_LoadingState] = useState(false); //

  // const [state_alertConfig, setState_setAlert] = useState(null); // default: empty Array, set up by settingAlert method


  // const getSingleUserData = async username => {

  // function body moved to GithubState.js

  // }


  // const getUserRepos = async username => {

  //   setState_LoadingState(true);

  //   // for testing the user name from React Router's params
  //   // console.log('==> Current username received in "getSingleUserData":\n', username);

  //   const response_userRepos = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
  //     {
  //       headers: {
  //         Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
  //       }
  //     }
  //   );

  //   // // For testing, log results from API
  //   console.log('Single user\'s repo from Github API:\n');
  //   console.log(response_userRepos.data);

  //   // Update the object "state_singleUserData" in state, 

  //   setState_UserRepos(response_userRepos.data);
  //   setState_LoadingState(false);

  // }




  // const setAlert = (msg, type) => {

  //   console.log('\n\n"this" obj in setAlert() in App.js:\n', this);

  //   setState_setAlert({ msg: msg, type: type })

  //   setTimeout(
  //     () => {
  //       setState_setAlert(null);
  //     }, 3000);
  // }


  return (
    <GithubState>
      <AlertState>

        <Router>

          {/* === React Router: Start === */}

          <div className='App'>

            <Navbar />

            <div className="container">
              {/* Render ALL components INSIDE a div. */}

              <Alert  // displayConfigs= { state_alertConfig } 
              />

              <Switch>

                <Route exact path='/' component={Home}
                // contains <Search /> and <Users />
                />

                <Route exact path='/about' component={About} />


                {/* ==== For single user's profile and repos ==== */}

                <Route exact path='/user/:username' component={User} />


                <Route component={NotFound} />


              </Switch>
            </div>

          </div> {/* === end of <div className='App'> == */}
        </Router>
      </AlertState>
    </GithubState>
  );

}

export default App;
