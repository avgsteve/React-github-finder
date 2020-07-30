import React, { Fragment, Component } from 'react';

import Spinner from '../layout/Spinner';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class User extends Component {

  // Whenever this component "User" is mounted by any other component, it will trigger "componentDidMount()" inside the <User> component to do something
  componentDidMount() {

    console.log('\nMsg: The component <User/> has been mounted!');

    console.log('\n\nMsg: Below is the props in component <User/>:\n');

    console.log(this.props);


    /* 
    When reached this URI host/user/:username, inside the <Route exact path='/user/:username' /> will mount the component <User> and use the property method "getSingleUserData" via the property "prop_getUserData" inside App.js
     */

    this.props.prop_getUserData(this.props.match.params.username);

    // this.props.match.params.username points to the "username"'s value via component <Route exact path='/user/:username'   in App.js

  }

  static propTypes = {
    prop_LoadingSpinner: PropTypes.bool,
    prop_userData: PropTypes.object.isRequired,
    prop_getUserData: PropTypes.func.isRequired,
  }


  render() {

    //get data obj from <User userData={ state_singleUserData } /> in App.js

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
    } = this.props.prop_userData

    const { prop_LoadingSpinner } = this.props; // Read the Boolean value for "state_LoadingSpinner" in App.js via User tag's prop attribute "prop_LoadingSpinner", 

    if (prop_LoadingSpinner) {
      return <Spinner />
    }

    return (



      <div>

        {/* === For dev stage messages === */}
        <div>
          <h2>
            {`Current Component: <${this.constructor.name}`} /> </h2>
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
              className="round-img my" alt={`profile picture of ${name}`}
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


      </div >
    )
  }
}

export default User
