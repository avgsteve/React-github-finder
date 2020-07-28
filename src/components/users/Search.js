import React, { Component } from 'react'

// Emmet: rce
export class Search extends Component {

  state = {
    text: '',
  }

  onChange = (event) => {

    // point the value of the "text" field to the event's target (input)

    // this function was this.setState({ text: event.target.value });
    // modified as below 
    // (use (element) the value of attribute 'name' as state property's name):
    this.setState({ [event.target.name]: event.target.value });
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


        </form>
      </div>
    )
  }
}
export default Search;
