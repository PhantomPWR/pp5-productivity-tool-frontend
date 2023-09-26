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

    // Navigating
    const homeNavigate = (
        <>
            <h3 className={`${appStyles.UnderlineOrange} my-3`}>Finding your way</h3>
            <strong className={`${appStyles.TextOrange} d-block mt-3 fs-6`}>Tick Off Logo</strong>
            <p>Brings you back to this page.</p>

            {/* Dashboard */}
            <strong className={`${appStyles.TextOrange} d-block mt-3 mb-1 fs-6`}><i className='fs-6 fas fa-dashboard ps-0'></i> Dashboard</strong>
            <p>Gives you a bird's-eye view of pending tasks you created, and pending tasks assigned to you.</p>
            <p>Colour-coded due dates allow you to immediately see tasks due in the future, tasks due today and overdue tasks.</p>
            <p>Completed tasks are not displayed on the dashboard, to avoid noise and clutter.</p>
            <p>Clicking/tapping on a tasks will take you to the Task Detail page, where you can manage the task further.</p>

            {/* All Tasks */}
            <strong className={`${appStyles.TextOrange} d-block mt-3 mb-1 fs-6`}><i className='fs-6 fas fa-list-check ps-0'></i> All Tasks</strong>
            <p>Displays a complete list of tasks, </p>
        </>
    )

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
                    <Col>
                        {homeNavigate}
                    </Col>
                </Row>
                {/* <Row>
                    <Col className=''>
                        <ProfileList/>
                    </Col>
                </Row> */}

            </Container>
        </>
    );
}

export default HomePage;