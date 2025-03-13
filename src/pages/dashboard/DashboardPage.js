// React
import React from 'react';

import { useCurrentUser } from '../../contexts/CurrentUserContext';

// Reusable components
import DashboardTaskList from './DashboardTaskList';
import ProfileList from '../profiles/ProfileList';

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Styles
import styles from '../../styles/DashboardPage.module.css';

function DashboardPage() {
	// Set up state variables
	const currentUser = useCurrentUser();

	const dashboardTitle = (
		<h1 className={styles.DashboardTitle}>
			{currentUser.username}'s Dashboard
		</h1>
	);

	return (
		<>
			<Container fluid className={`dashboard px-0 {styles.Container}`}>
				<Row>{dashboardTitle}</Row>
			</Container>
			<Container fluid className={`dashboard px-0 {styles.Container}`}>
				<Row>
					<Col className='px-0'>
						<DashboardTaskList />
					</Col>
				</Row>
				<Row>
					<Col>
						{/* <ProfileList/> */}
						<h1>Profile List</h1>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default DashboardPage;
