import React from 'react';
import PropTypes from 'prop-types';


const Navbar = ({ title, icon }) => {
  //With destructuring parameter with variables title and icon, render the content in H1 tag

  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={icon} />
        {title}
      </h1>
    </nav>
  );

}


Navbar.defaultProps = {
  // default value when there's no props passed in
  title: 'Github Finder',
  icon: 'fab fa-github'
};

Navbar.propTypes = { // get value for rendering data from Props
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}




export default Navbar;