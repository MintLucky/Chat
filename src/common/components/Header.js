import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';

const Header = () => (
    <div className="header-block">
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to={`/`}><a className="nav-link">Home</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/room`}><a className="nav-link">Give Me Room</a></Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/room`}><a className="nav-link">Bla bla About Chat</a></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
);

export default Header;