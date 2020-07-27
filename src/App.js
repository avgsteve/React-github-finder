import React, {
  Component
} from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';


class App extends Component {

  render() {

    return ( 
      <div className = 'App'>
        <Navbar title='Helloooo...'/> 
        {/* titil is the props passes data to Navbar */}
      </div>
      );
    }

  }
  export default App;
