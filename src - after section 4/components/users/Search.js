import React, { Component } from 'react'
import PropTypes from 'prop-types';

// Emmet: rce 
export class Search extends Component {

  state = {
    text: '', // the initial value for the input text field as search bar
  }

  static propType = {
    prop_searchUsers: PropTypes.func.isRequired,
    prop_clearUsers: PropTypes.func.isRequired,
    toggleClearButton: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  }

  onChange = (event) => {
    // Listening to the event from which the value of the "text" field has been changed


    this.setState({ [event.target.name]: event.target.value });
    // this function was modified from below: 
    // this.setState({ text: event.target.value });

    // The name (as in Object property) "event.target.name" equals "text" because, in the JSX , DOM element <input> has an attribute "name" which has a value called "text"
  }

  onSubmit = (fomrSubmitEvent) => {

    fomrSubmitEvent.preventDefault();

    if (this.state.text === "") {

      this.props.empty_input_alert(' Please enter something in the search field', 'light');

      /* 
      "this.props.empty_input_alert(...)" equals to 
      <Search empty_input_alert={...} />
      */

    } else {

      console.log("\nThe text value from Form's onSubmit function in Seach.js:\n", this.state.text);

      // Send this.state.text as argument to the Props method (callback function) : this.searchGithubUsers
      this.props.prop_searchUsers(this.state.text);

      this.setState({ text: "" });
    }

  };


  render() {

    //variables assigned with value from this.props in Components in <Search /> in App.js
    const { prop_clearUsers, prop_toggleClearButton } = this.props;

    return (

      <div>

        {/* ==== Main block in <Search /> : Search Form ==== */}

        <form className="Form" onSubmit={this.onSubmit}>

          {/* when submiting this form, the onSubmit was triggered to call this.onSubmit method which calls other functions to do something else  */}


          {/* ==== Sub-component#1: input text ==== */}

          <input type="text" name="text" placeholder="Search users on github..." value={this.state.text} onChange={this.onChange} />

          {/* when typing in this text field, the onChange was triggered to call this.onChange method which calls this.setState() to change the property in state  */}


          {/* ==== Sub-component#2: submit button ==== */}

          <input type="submit" value="Submit the search" className="btn btn-dark btn-block" />

          {/* Clicking submiting button triggers event listener then it calls this.onSubmit method which sends this.state.text to App.js's Props method:   this.searchGithubUsers
          */}

        </form>

        {/* Below is to use "Conditional Rendering" to render button element 
        // Syntax: Conditional Rendering in React: && 
        // ref:  https://www.robinwieruch.de/conditional-rendering-react#conditional-rendering-in-react-        
        */}

        {/* ==== Sub-component#3: Clear button (outside and below the Form) ==== */}
        {
          prop_toggleClearButton // {prop_toggleClearButton} equals to {this.props.prop_toggleClearButton}

          &&

          (
            <button className="btn btn-light btn-block" onClick={prop_clearUsers} >
              Clear results
            </button>
          )
          // #1 The value : {prop_clearUsers} equals to {this.props.prop_clearUsers}
          // #2 The value the attribute "this.props.prop_clearUsers" points to the attribute "clearUsers=" from  component <Search /> used in App.js 

          // #3 The clearUsers= points to the props method in App.js : "this.clearUsersData_andInputField

        }





      </div>
    )
  }
}

export default Search;
