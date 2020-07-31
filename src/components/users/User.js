//eslint-disable-next-line
import React, { Fragment, Component, useState, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const User = (
  { props,
    prop_userData,
    prop_userRepos,
    prop_LoadingSpinner,
    prop_getUserData,
    prop_getUserRepo,
    match //
  }
) => {

  useEffect(() => {

    prop_getUserData(match.params.username);

    // match.params.username points to the "username"'s value via component <Route exact path='/user/:username'   in App.js

    prop_getUserRepo(match.params.username);


    // for testing
    console.log('\nMsg: The component <User/> has been mounted!');
    console.log('\n\nMsg: Below is the props in component <User/>:\n');
    console.log(props);

    // Use below "//eslint-disable-next-line" to disable warning message in console: React Hook useEffect has missing dependencies
    // eslint-disable-next-line
  }, [] // this argument makes this useEffect run only once
  );


  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    company,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = prop_userData // deconstructed from this.props.prop_userData


  // console.log('\n\nMsg: Below is the "this.props.prop_userRepos" in component <User/>:\n');
  // console.log(this.props.prop_userRepos);


  if (prop_LoadingSpinner) {
    return <Spinner />

  }

  return (

    <div>

      {/* === For dev stage messages === */}
      <div>
        <h2>
          {`Current Component: <User />`}
        </h2>
        <p>----------------------------------------------</p>
      </div>

      {/* === React router's Link component === */}

      <Link to='/' className='btn btn-light'> Back to search </Link>

      {/* === User's name and hireable info === */}

      <h1>{name}</h1>

      <p> Hireable: {'  '}
        <span>
          {hireable ?
            <i className="fas fa-check text-success" /> :
            <i className="fas fa-times-circle text-danger" />
          }
        </span>
      </p>


      {/* === First div : personal profile === */}

      <div className="card grid-2">

        <div className="all-center" title="sub-grid #1">

          <img src={avatar_url}
            className="round-img my" alt={`profile pic of ${name}`}
            style={{ width: '150px' }}
          />

          <p className="my-1"> location: {location} </p>

        </div>

        <div title="sub-grid #2">

          { //if there's bio in profile, display it in <Fragment>
            bio && <Fragment>

              <h3>Bio</h3>
              <p>{bio}</p>

            </Fragment>}

          <a href={html_url} className='btn btn-dark my-1'>Visit my Github page</a>

          <ul>

            <li>
              {login && <Fragment>

                <strong>Username: </strong>
                {login}
              </Fragment>
              }
            </li>

            <li>
              {company && <Fragment>

                <strong>Company: </strong>
                {company}
              </Fragment>
              }
            </li>

            <li>
              {blog && <Fragment>

                <strong>Blog: </strong>

                <span>
                  <a href={`https://${blog}`} target="_blank" rel="noopener noreferrer">
                    {blog}
                  </a> </span>

              </Fragment>
              }
            </li>

          </ul>


        </div>

      </div>


      {/* === Second div : cards === */}

      <div className="card text-center">

        <div className="badge badge-primary">
          Followers : {followers}
        </div>

        <div className="badge badge-success">
          Following : {following}
        </div>

        <div className="badge badge-ligt">
          Public Repos : {public_repos}
        </div>

        <div className="badge badge-dark">
          Public Gists : {public_gists}
        </div>

      </div>


      {/* === Third section : Repos === */}

      <Repos reposArray={ //use <Repos/> Component and its attribute "reposArray" to send Array data to <Repos/> as argument

        prop_userRepos
        // this.props.prop_userRepos is from the attribute "prop_userRepos" from component <User /> used in app.js
      } />


    </div >

  ) // end od return (

}

User.propTypes = {
  prop_LoadingSpinner: PropTypes.bool,
  prop_getUserData: PropTypes.func.isRequired,
  prop_userData: PropTypes.object.isRequired,
  prop_getUserRepo: PropTypes.func.isRequired,
  prop_userRepos: PropTypes.array.isRequired
}

export default User
