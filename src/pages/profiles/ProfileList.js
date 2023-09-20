// React library & hooks
import React from "react";

// Context hooks
import { useProfileData } from "../../contexts/ProfileDataContext";

// Reusable components
import Profile from "./Profile";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';

// Styles
import styles from "../../styles/ProfileList.module.css";

// Assets
import Asset from "../../components/Asset";


const ListProfiles = ({ mobile }) => {
  const { listProfiles } = useProfileData();

  return (
    <Card className={`${styles.Card} mt-3`}>
      <Card.Body>
        <Card.Title className={styles.CardTitle}>Users</Card.Title>
          <Card.Text className={styles.CardText}>
            {listProfiles.results.length ? (
              mobile ? (
                <div className="d-flex justify-content-around">
                  {listProfiles.results.slice(0, 4).map((profile) => (
                    <Profile key={profile.id} profile={profile} mobile />
                  ))}
                </div>
              ) : (
                <Row className='justify-content-even'>
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