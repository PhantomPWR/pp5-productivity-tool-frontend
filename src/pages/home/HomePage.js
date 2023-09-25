// React
import React from 'react';

import {useCurrentUser} from '../../contexts/CurrentUserContext';

// Reusable components
import ProfileList from "../profiles/ProfileList";

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Styles
import styles from '../../styles/HomePage.module.css';


function HomePage() {
    // Set up state variables
    const currentUser = useCurrentUser();

    const homeTitle = (
        <h1 className={styles.HomePageTitle}>
            Hi {currentUser.username}
        </h1>
    );

    
    return (
        <>
            <Container fluid className={`dashboard px-0 {styles.Container}`}>
                <Row>
                {homeTitle}
                </Row>
            </Container>
            <Container fluid className={`dashboard px-0 {styles.Container}`}>
                <Row>
                    <Col className='px-0'>
                        home page content here
                    </Col>
                </Row>
                <Row>
                    <Col className='px-0'>
                        <ProfileList/>
                    </Col>
                </Row>

            </Container>
        </>
    );
}

export default HomePage;