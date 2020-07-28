import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class Navbar extends Component {

  static defaultProps = {
    // default value when there's no props passed in
    title: 'Github Finder',
    icon: 'fab fa-github'
  };

  static propTypes = { // get value for rendering data from Props
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }

  render() {
    return (
      <nav className='navbar bg-primary'>
        <h1>
          <i className={this.props.icon} />
          {this.props.title}
        </h1>
      </nav>);
  }

}
export default Navbar;