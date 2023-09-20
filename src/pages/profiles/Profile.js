// React library & hooks
import React from "react";

// react-router-dom components for page navigation
import { Link, useLocation } from "react-router-dom";


// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Styles
import styles from "../../styles/Profile.module.css";

// Assets
import Avatar from "../../components/Avatar";


const Profile = (props) => {

  // Set up state variables
  const location = useLocation();

  // Destructure props
  const { profile, mobile, imageSize = 55 } = props;
  const { id, image, owner } = profile;

  // Check if on dashboard page
  const isDashboardPage = location.pathname === '/';


  return (
    <Link className="align-self-center" to={`/profiles/${id}`}>
      <Container
        className={`my-3 d-flex align-items-center justify-content-center ${isDashboardPage ? styles.DashboardProfile : styles.Profile}`}
      >
      {isDashboardPage ? (
        <Row className='flex-column align-items-center justify-content-center g-0'>
          <Col className='text-center'>
            <Avatar src={image} height={imageSize} />
          </Col>
          <Col className='text-center mt-1'>
            {owner}
          </Col>
        </Row>
      ):(
        <Row className='align-items-center justify-content-start g-0'>
          <Col>
            <Avatar src={image} height={imageSize} />
          </Col>
          <Col>
            {owner}
          </Col>
        </Row>
      )}
          
      </Container>
    </Link>
  );
};

export default Profile;