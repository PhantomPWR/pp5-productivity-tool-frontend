import React, { useEffect, useState } from "react";

import { Container, Row, Col, Image } from "react-bootstrap";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import ProfileList from "./ProfileList";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
      setHasLoaded(true);
  }, [])

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <p>Image</p>
        </Col>
        <Col lg={6}>
          <h3 className="m-2">Profile username</h3>
          <p>Profile stats</p>
        </Col>
        <Col className="p-3">Profile content</Col>
      </Row>
    </>
  );

  const mainProfileTasks = (
    <>
      <hr />
      <p className="text-center">Profile owner's tasks</p>
      <hr />
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileTasks}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        User List
        <ProfileList />
      </Col>
    </Row>
  );
}

export default ProfilePage;