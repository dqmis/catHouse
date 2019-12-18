import React, { Component } from 'react';
import './Navbar.css'

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-12 col-md-12 mr-0 center-title"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          🐱 Super CatHouse 🐱
        </a>
      </nav>
    );
  }
}
export default Navbar;