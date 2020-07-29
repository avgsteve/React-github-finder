import React, { Component } from 'react'
import PropTypes from 'prop-types';

// Emmet: rce 
export class Search extends Component {

  state = {
    text: '', // the initial value for the input text field as search bar
  }

  static propType = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
  }

  onChange = (event) => {
    // Listening to the event from which the value of the "text" field has been changed


    this.setState({ [event.target.name]: event.target.value });
    // this function was modified from below: 
    // this.setState({ text: event.target.value });

    // The name (as in Object property) "event.target.name" equals "text" because, in the JSX , DOM element <input> has an attribute "name" which has a value called "text"
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log("\nThe text value from Form's onSubmit function in Seach.js:\n", this.state.text);

    // onSubmit() also triggers the method "this.props.searchUsers" with the element (The <Search /> ) at one level up (in app.js)
    this.props.searchUsers(this.state.text);

  };


  render() {
    return (
      <div>
        <form className="Form" onSubmit={this.onSubmit}>
          {/* when submiting this form, the onSubmit was triggered to call this.onSubmit method which calls other functions to do something else  */}

          <input type="text" name="text" placeholder="Search users on github..." value={this.state.text} onChange={this.onChange} />
          {/* when typing in this text field, the onChange was triggered to call this.onChange method which calls this.setState() to change the property in state  */}

          <input type="submit" value="Submit the search" className="btn btn-dark btn-block" />
          {/* Clicking submiting button triggers event listener then it calls this.onSubmit method which sends this.state.text to App.js's Props method:   this.searchGithubUsers
          */}

        </form>

        <button className="btn btn-light btn-block" onClick={this.props.clearUsers} >Clear</button>
        {/* Clicking submiting button triggers event listener then it calls the App.js's Props method:  this.clearUsersData_andInputField
          */}

      </div>
    )
  }
}
export default Search;
