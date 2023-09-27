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
        to='/dashboard'
        aria-label='Dashboard'
      >
        <i aria-hidden="true" className='fs-6 fas fa-dashboard'></i>
        Dashboard
      </NavLink>

      {/* All Tasks */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to='/tasks'
        aria-label='All tasks'
      >
        <i aria-hidden="true" className="fas fa-list-check"></i>
        All tasks
      </NavLink>

      {/* Add Task */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/tasks/create"
        aria-label='Add task'
      >
        <i aria-hidden="true" className="far fa-plus-square"></i>
        Add task
      </NavLink>

      {/* Categories */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/categories"
        aria-label='Categories'
      >
        <i aria-hidden="true" className="fas fa-folder"></i>
        Categories
      </NavLink>


      {/* Sign Out */}
      <NavLink className={styles.NavLink}
        to="/"
        aria-label='Sign out'
        onClick={handleSignOut}
      >
        <i aria-hidden="true" className="fas fa-person-walking-arrow-right"></i>
        Sign out
      </NavLink>

      {/* Profile */}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profiles/${currentUser?.profile_id}`}
        aria-label='Profile'
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
      aria-label='Sign in'
    >
      <i aria-hidden="true" className='fs-6 fas fa-sign-in-alt'></i>
      Sign in
    </NavLink>
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to='/register'
      aria-label='Register'
    >
      <i aria-hidden="true" className='fs-6 fas fa-user-plus'></i>
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
            <i aria-hidden="true" className="fa-solid fa-calendar-check"></i>
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