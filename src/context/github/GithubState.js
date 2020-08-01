import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

// =============== githubState.js 是用在 App.js 裡面 =================

// let githubClientId;
// let githubClientSecret;

// if (process.env.NODE_ENV !== 'production') {
//   githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
//   githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
// } else {
//   githubClientId = process.env.GITHUB_CLIENT_ID;
//   githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
// }

//global state for github
const GithubState = props => {

  const initialState = {
    users: [],
    user: {}, // for single user page
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, // githubReducer.js
    initialState // 上面的最初資料
  );


  ///================================
  // Search Users ( getUsersByName 原本為 searchUsers )
  // send GET req to API to find user
  const getUsersByName = async text => {

    setState_LoadingState(); // trigger dispatch()

    // for testing
    console.log('==> Text input received in method "getUsersByName":\n', text);

    // get results from API
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
        }
      }
    );

    // setState_UsersData(res.data.items);
    // setState_LoadingState(false);
    console.log('\ndispatch的內容:\n');
    console.log(dispatch);

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  }

  // ===================================


  // // Get User
  // const getUser = async username => {
  //   setState_LoadingState();

  //   const res = await axios.get(
  //     `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
  //   );

  //   dispatch({
  //     type: GET_USER,
  //     payload: res.data
  //   });
  // };


  const getSingleUserData = async username => {

    // setState_LoadingState(true);
    setState_LoadingState(); // trigger dispatch()


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

    // Change below to dispatch
    // setState_SingleUserData(response_userProfile.data);
    dispatch({
      type: GET_USER,
      payload: response_userProfile.data
    })

    // setState_LoadingState(false);

  }

  //================================================


  // // Get Repos
  // const getUserRepos = async username => {
  //   setState_LoadingState();

  //   const res = await axios.get(
  //     `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
  //   );

  //   dispatch({
  //     type: GET_REPOS,
  //     payload: res.data
  //   });
  // };


  // response_userRepos was getUserRepos
  const getUserRepos = async username => {
    // setState_LoadingState(true);
    setState_LoadingState(); // trigger dispatch()

    const response_userRepos = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
        }
      }
    );

    dispatch({
      type: GET_REPOS,
      payload: response_userRepos.data
    })



  }


  //================================
  // Clear Users
  // const clearUsers = () => dispatch(
  //  { type: CLEAR_USERS }
  // );

  // Clear search results from page
  const clearUsers = () => {

    console.log(`\nUsers' data and search field have been cleared!\n`);

    // setState_UsersData([]);
    // setState_LoadingState(false);

    // clear all results by sending dispatch to gitHubReducer
    dispatch({ type: CLEAR_USERS });

  };

  // ================================

  // // Set Loading
  // const setLoading = () => dispatch({ type: SET_LOADING });

  // Set Loading 原本為 const setLoading
  const setState_LoadingState = () => dispatch({ type: SET_LOADING });
  // #1
  // 會觸發 githubReducer.js 裡面的 
  // export default (state, action) => {
  // switch (action.type) {  case SET_LOADING
  // 讓 reducer catch 這個function的物件
  // #2
  // type.s 裡面:  export const SET_LOADING = 'SET_LOADING';



  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        userReposData: state.repos,
        loading: state.loading,
        getUsersByName, // was "searchUsers"
        clearUsers,
        getSingleUserData, //was getUser,
        getUserRepos, // was getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
