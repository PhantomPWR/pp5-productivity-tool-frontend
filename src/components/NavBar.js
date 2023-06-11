import React, { useContext } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../App';

const NavBar = () => {
  const currentUser = useContext(CurrentUserContext);
  const loggedInIcons = <>{currentUser?.username}</>
  const loggedOutIcons = <>
  
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

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to='/'>
          <Navbar.Brand className={styles.Brand}>
            <i className="fa-solid fa-calendar-check"></i>
            <em><strong>PRODUCTIVITY</strong> TOOL</em>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-start">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to='/'
            >
              <i className='fs-6 fas fa-home'></i>
              Home
            </NavLink>

            {currentUser ? loggedInIcons : loggedOutIcons}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavBar