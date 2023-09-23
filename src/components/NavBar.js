// React library
import React from 'react';

// Context hooks
import { 
  useCurrentUser,
  useSetCurrentUser
} from '../contexts/CurrentUserContext';

// React-router-dom components for page navigation
import { NavLink, useHistory } from 'react-router-dom';

// Custom hooks
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

// Axios library for HTTP requests
import axios from 'axios';

// Utils
import { removeTokenTimestamp } from '../utils/utils';

// Reusable components
import Avatar from './Avatar';

// Bootstrap components
import Navbar from 'react-bootstrap/Navbar';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

// Styles
import styles from '../styles/NavBar.module.css';


const NavBar = () => {
  // State variables
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  // Custom hook for toggling the navbar
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      history.push("/");
    } catch (err) {
      // console.log(err);
    }
  };

  // Logged in icons
  const loggedInIcons = (
    <>
      {/* Dashboard */}
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to='/'
      >
        <i className='fs-6 fas fa-dashboard'></i>
        Dashboard
      </NavLink>

      {/* Add Task */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/tasks/create"
      >
        <i className="far fa-plus-square"></i>
        Add task
      </NavLink>

      {/* Add Category */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/categories/create"
      >
        <i className="fas fa-folder-plus"></i>
        Add category
      </NavLink>

      {/* All Tasks */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/tasks/`}
      >
        <i className="fas fa-list-check"></i>
        All Tasks
      </NavLink>

      {/* Sign Out */}
      <NavLink className={styles.NavLink}
        to="/"
        onClick={handleSignOut}
      >
        <i className="fas fa-sign-out-alt"></i>
        Sign out
      </NavLink>

      {/* Profile */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <Avatar src={currentUser?.profile_image} height={40} />
      </NavLink>
    </>
  );

  // Logged out icons
  const loggedOutIcons = (
  <>
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to='/signin'
    >
      <i className='fs-6 fas fa-sign-in-alt'></i>
      Sign in
    </NavLink>
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to='/register'
    >
      <i className='fs-6 fas fa-user-plus'></i>
      Register
    </NavLink>
  </>
  );

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="lg" fixed="top">
      <Container>
        <NavLink
          to='/'
          className={styles.BrandLink}
        >
          <Navbar.Brand className={styles.Brand}>
            <i className="fa-solid fa-calendar-check"></i>
            <em><strong>TICK</strong> OFF</em>
          </Navbar.Brand>
        </NavLink>

        {/* Navbar Toggle */}
        <NavbarToggle
          bsPrefix='tickoff-toggle'
          className={styles.Toggle}
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-start">

            {currentUser ? loggedInIcons : loggedOutIcons}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavBar;