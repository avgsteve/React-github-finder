import React, { useState } from 'react'
import PropTypes from 'prop-types';

// Emmet: rce 
const Search = ({ prop_searchUsers, prop_toggleClearButton, prop_clearUsers, empty_input_alert }) => {

  const [keyWord_searchUser, updateKeyWord] = useState(''); // set initial value of text to ''  (which is empty)


  const onChange = (event) => {
    // Listening to the event from the input element "keyWord_searchUser" every time the value in the field has been changed
    updateKeyWord(event.target.value);

    // // For testing purpose
    // console.log('=== The "event" in onChange() method in Search.js ===\n');
    // console.log(event.target);

  };


  const onSubmit = fomrSubmitEvent => {

    fomrSubmitEvent.preventDefault();

    if (keyWord_searchUser === "") {

      empty_input_alert(' Please enter something in the search field', 'light');

      /* 
      "empty_input_alert(...)" equals to 
      <Search empty_input_alert={...} />
      */

    } else {

      console.log("\nThe keyWord_searchUser value from Form's onSubmit function in Seach.js:\n", keyWord_searchUser);

      // Send this.state.text as argument to the Props method (callback function) : this.searchGithubUsers
      prop_searchUsers(keyWord_searchUser);

      updateKeyWord(''); // this.setState({ text: "" });
    }

    console.log('\n=== Content of "useState":\n', useState);

  };




  //variables assigned with value from this.props in Components in <Search /> in App.js

  // const { prop_clearUsers, prop_toggleClearButton } = this.props;

  return (

    <div>

      {/* ==== Main block in <Search /> : Search Form ==== */}

      <form className="Form" onSubmit={onSubmit}>

        {/* when submiting this form, the onSubmit was triggered to call this.onSubmit method which calls other functions to do something else  */}


        {/* ==== Sub-component#1: input text ==== */}

        <input type="text" name="keyWord_searchUser" placeholder="Search users on github..." value={keyWord_searchUser} onChange={onChange} />

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
      {prop_toggleClearButton // {prop_toggleClearButton} equals to {this.props.prop_toggleClearButton}
        && (
          <button className="btn btn-light btn-block" onClick={prop_clearUsers} >
            Clear results
          </button>
        )
      }

    </div>

  ); // end of return
}


Search.propType = {
  prop_searchUsers: PropTypes.func.isRequired,
  prop_clearUsers: PropTypes.func.isRequired,
  toggleClearButton: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default Search;
