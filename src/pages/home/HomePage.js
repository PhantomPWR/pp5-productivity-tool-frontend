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
            <strong className={`${appStyles.TextOrange} d-block mt-3 mb-1 fs-6`}><i className='fs-6 fas fa-dashboard ps-0' /> Dashboard</strong>
            <p>Gives you a bird's-eye view of pending tasks you created, and pending tasks assigned to you.</p>
            <p>Colour-coded due dates allow you to immediately see tasks due in the future, tasks due today and overdue tasks.</p>
            <p>Completed tasks are not displayed on the dashboard, to avoid noise and clutter.</p>
            <p>Clicking/tapping on a tasks will take you to the Task Detail page, where you can manage the task further.</p>

            {/* All Tasks */}
            <strong className={`${appStyles.TextOrange} d-block mt-3 mb-1 fs-6`}><i className='fs-6 fas fa-list-check ps-0' /> All Tasks</strong>
            <p>Displays a complete list of tasks, with additional details, including users working on a task, priority, status & category.</p>
            <p>At the top of the page you'll find a search bar with the result count, as well as pre-determined filters.</p>

            {/* Task Detail */}
            <strong className={`${appStyles.TextOrange} d-block mt-3 mb-1 fs-6`}><i className='fs-6 fas fa-list-check ps-0' />Task Detail</strong>
            <p>Clicking/tapping on the task title, will take you to the detail view of the selected task.</p>
            <p>Here you can find further details about the task content, view attached images/screenshots, take part in discussions and update the task status.</p>
            <p>If you are the original task creator, you'll have access to an additional menu (<i className='fas fa-ellipsis-v' />) in the task header, which will allow you to edit or delete the task.</p>

            {/* Add Task */}
            <strong className={`${appStyles.TextOrange} d-block mt-3 mb-1 fs-6`}><i className='fs-6 fas fa-plus-square ps-0' /> Add Task</strong>
            <p>Clicking/tapping on the task title, will take you to the detail view of the selected task.</p>

            {/* Categories */}
            <strong className={`${appStyles.TextOrange} d-block mt-3 mb-1 fs-6`}><i className='fs-6 fas fa-folder ps-0' /> Categories</strong>
            <p>Here you can view a list of all task categories, again with a menu button (<i className='fas fa-ellipsis-v' />) in each category header, allowing you to edit/delete a category.</p>

            {/* Sign Out */}
            <strong className={`${appStyles.TextOrange} d-block mt-3 mb-1 fs-6`}><i className="fas fa-person-walking-arrow-right" /> Sign out</strong>
            <p>As the name suggests, this link will sign you out of the app and take you back to the sign-in page.</p>

            {/* Profile */}
            <strong className={`${appStyles.TextOrange} d-block mt-3 mb-1 fs-6`}><i className="fas fa-circle-user" /> Profile</strong>
            <p>Clicking/tapping on your profile picture, will take you to your profile page.</p>
            <p>Here you can view your profile details, as well as a list of tasks you created, and tasks assigned to you.</p>
            <p>A list of all other users is also available, so you can see which tasks they're working on.</p>
            <p>Using the <i className='fas fa-ellipsis-v' /> icon, you'll have access to editing your profile, updating your username or resetting your password.</p>
        </>
    );
    
    // Glossary
    const homeGlossary = (
        <>
            <h3 className={`${appStyles.UnderlineOrange} mt-5`}>Task Icons</h3>
            <p>Here is a list of task icons and their meaning:</p>
            <strong className={`d-block mt-3 mb-1 fs-6`}><i className='fs-6 fas fa-crown ps-0' /> - Task creator/owner</strong>
            <strong className={`d-block mt-3 mb-1 fs-6`}><i className='fs-6 fas fa-user-check ps-0' /> - Task assignee</strong>
            <strong className={`d-block mt-3 mb-1 fs-6`}><i className='fs-6 fas fa-folder ps-0' /> - Task category</strong>
            <strong className={`d-block mt-3 mb-1 fs-6`}><i className='fs-6 fas fa-list-check ps-0' /> - Task status</strong>
            <strong className={`d-block mt-3 mb-1 fs-6`}><i className='fs-6 fas fa-triangle-exclamation ps-0' /> - Task Priority</strong>
            
        </>
    );

    // Task Dates
    const homeTaskDates = (
        <>
            <h3 className={`${appStyles.UnderlineOrange} mt-5`}>Task Dates</h3>
            <p>Task dates are presented with different backgrounds, depending on their status:</p>
            {/* Due Date In Future */}
            <strong className={`d-block mt-3 mb-1 fs-6`}>Pending - due date in future</strong>
            <div className={`${styles.StatusBadge} ${styles.DueDate}`}>
                <label className={styles.BadgeLabel}>Due on</label>
                <span className={styles.BadgeDate}>
                    25 Oct 2023
                </span>
            </div>
            {/* Completed Date */}
            <strong className={`d-block mt-3 mb-1 fs-6`}>Completed task</strong>
            <div className={`${styles.StatusBadge} ${styles.Completed}`}>
                <label className={styles.BadgeLabel}>Completed</label>
                <span className={styles.BadgeDate}>
                    25 Sept 2023
                </span>
            </div>
            {/* Due Today */}
            <strong className={`d-block mt-3 mb-1 fs-6`}>Pending - due today</strong>
            <div className={`${styles.StatusBadge} ${styles.DueToday}`}>
                <label className={styles.BadgeLabel}>Due today</label>
                <span className={styles.BadgeDate}>
                    25 Sept 2023
                </span>
            </div>
            {/* Overdue */}
            <strong className={`d-block mt-3 mb-1 fs-6`}>Pending - overdue</strong>
            <div className={`${styles.StatusBadge} ${styles.OverDue}`}>
                <label className={styles.BadgeLabel}>Due today</label>
                <span className={styles.BadgeDate}>
                    25 Sept 2023
                </span>
            </div>
        </>
    );

    return (
        <>
            <Container fluid>
                <Row>
                {homeTitle}
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col lg={6} className='px-0 mx-auto mb-3 text-center'>
                        {homeIntro}
                    </Col>
                </Row>
            </Container>
            <Container fluid className={`${styles.BodyContainer} ${styles.ContainerLast}`}>
                <Row>
                    <Col>
                        {homeNavigate}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {homeGlossary}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {homeTaskDates}
                    </Col>
                </Row>

            </Container>
        </>
    );
}

export default HomePage;