// React
import React from 'react';

import {useCurrentUser} from '../../contexts/CurrentUserContext';

// Reusable components
import ProfileList from "../profiles/ProfileList";

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// Styles
import appStyles from '../../App.module.css';
import styles from '../../styles/HomePage.module.css';


function HomePage() {
    // Set up state variables
    const currentUser = useCurrentUser();

    const homeTitle = (
        <h1 className={styles.HomePageTitle}>
            Welcome {currentUser.username} !
        </h1>
    );

    // Intro text
    const homeIntro = (
        <div>
            <hr className={appStyles.Divider}/>
            <p className={`${styles.HomePageIntro} pt-2`}>
                <strong><em>Tick Off!</em></strong> allows you to create tasks, assign them to users, and track task status.
            </p>
            <p className={`${styles.HomePageIntro} pb-2`}>
                You can also create categories to organize your tasks.
            </p>
            <hr className={appStyles.Divider}/>
        </div>
    );

    return (
        <>
            <Container fluid className={`{styles.Container}`}>
                <Row>
                {homeTitle}
                </Row>
            </Container>
            <Container fluid className={`{styles.Container}`}>
                <Row>
                    <Col lg={6} className='px-0 mx-auto mb-3 text-center'>
                        {homeIntro}
                    </Col>
                </Row>
                <Row>
                    <Col className=''>
                        <ProfileList/>
                    </Col>
                </Row>

            </Container>
        </>
    );
}

export default HomePage;