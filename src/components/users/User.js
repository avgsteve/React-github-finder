import React, { Component } from 'react'


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
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.prop_userData




    return (
      <div>

        <div>
          <h2>
            {`Current Component: <${this.constructor.name}`} /> </h2>
          <p>----------------------------------------------</p>
        </div>

        {name}
      </div>
    )
  }
}

export default User
