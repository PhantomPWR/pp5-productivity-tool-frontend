// React library & hooks
import React from "react";

// react-router-dom components for page navigation
import { Link } from "react-router-dom";


// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Styles
import styles from "../../styles/Profile.module.css";

// Assets
import Avatar from "../../components/Avatar";


const Profile = (props) => {
  const { profile, mobile, imageSize = 55, dashboardPage } = props;
  const { id, image, owner } = profile;


  return (
    <Link className="align-self-center" to={`/profiles/${id}`}>
      <Container
        className={`my-3 d-flex align-items-center`}
      >
      {dashboardPage ? (
        <Row className='flex-column align-items-center justify-content-start g-0'>
          <Col>
            <Avatar src={image} height={imageSize} />
          </Col>
          <Col>
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