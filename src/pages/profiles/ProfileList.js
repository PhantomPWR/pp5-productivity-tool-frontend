// React library & hooks
import React from "react";

// Context hooks
import { useProfileData } from "../../contexts/ProfileDataContext";

// react-router-dom components for page navigation
import { useLocation } from "react-router-dom";

// Reusable components
import Profile from "./Profile";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';

// Styles
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfileList.module.css";

// Assets
import Asset from "../../components/Asset";


const ListProfiles = ({ mobile }) => {

  // Set up state variables
  const location = useLocation();
  const { listProfiles } = useProfileData();

  // Check if on dashboard page
  const isDashboardPage = location.pathname === '/';

  return (
    <Card className={`${styles.Card} mt-3`}>
      <Card.Body>
        <Card.Title className={`${styles.CardTitle} ${appStyles.textBold} ${appStyles.underlineOrange}  ${appStyles.noRadius}`}>
          Users
        </Card.Title>
          <Card.Text className={styles.CardText}>
            {listProfiles.results.length ? (
              isDashboardPage ? (
                <Row className='justify-content-even'>
                  {listProfiles.results.map((profile) => (
                    <Col key={profile.id}>
                      <Profile key={profile.id} profile={profile} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Row className='flex-column'>
                  {listProfiles.results.map((profile) => (
                    <Col key={profile.id}>
                      <Profile key={profile.id} profile={profile} />
                    </Col>
                  ))}
                </Row>
              )
            ) : (
                <Asset spinner />
            )}
          </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ListProfiles;