// React
import React, {useState, useEffect} from 'react';

// Context hooks
import {
    useProfileData,
    useSetProfileData
} from '../../contexts/ProfileDataContext';
import {useCurrentUser} from '../../contexts/CurrentUserContext';

// react-router-dom components for page navigation
import {useParams} from 'react-router-dom';

// Axios library for HTTP requests
import { axiosReq } from "../../api/axiosDefaults";

// Utils
import {fetchMoreData} from '../../utils/utils';

// React components
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from 'react-router-dom/Link';

// Reusable components
import Asset from '../../components/Asset';
import DashboardTaskList from './DashboardTaskList';
import ProfileList from "../profiles/ProfileList";

// Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Styles
import appStyles from '../../App.module.css';
import styles from '../../styles/DashboardPage.module.css';

// Assets
import NoResults from '../../assets/no-results.png';


function DashboardPage() {
    // Set up state variables
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profileTasks, setProfileTasks] = useState({results: []});
    const [assignedTasks, setAssignedTasks] = useState({results: []});
    const currentUser = useCurrentUser();
    const id = currentUser?.profile_id || '';
    const {setProfileData} = useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;

    // Fetch data for profile, profile owner tasks and assigned tasks
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    { data: pageProfile },
                    { data: profileTasks },
                    { data: assignedTasks }
                ] =
                await Promise.all([
                    axiosReq.get(`/profiles/${id}/`),
                    axiosReq.get(`/tasks/?owner__profile=${id}`),
                    axiosReq.get(`/tasks/?assigned_to=${id}`),
                ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: {results: [pageProfile]},
                }));
                setProfileTasks(profileTasks);
                setAssignedTasks(assignedTasks);
                setHasLoaded(true);
            } catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, [id, setProfileData]);

    // Calculate task count
    const profileTaskCount = profileTasks.results.length;
    const assignedTaskCount = assignedTasks.results.length;

    const dashboardTitle = (
        <h1 className={styles.DashboardTitle}>
            {currentUser.username}'s Dashboard
        </h1>
    );

    
    return (
        <>
            <Container fluid className={`dashboard px-0 {styles.Container}`}>
                <Row>
                    <h1>{dashboardTitle}</h1>
                </Row>
            </Container>
            <Container fluid className={`dashboard px-0 {styles.Container}`}>
                <Row>
                    <Col className='px-0'>
                        <DashboardTaskList/>
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

export default DashboardPage;