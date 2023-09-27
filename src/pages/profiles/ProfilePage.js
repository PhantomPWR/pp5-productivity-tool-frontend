// React library & hooks
import React, { useEffect, useState } from "react";

// Context hooks
import { 
  useProfileData, 
  useSetProfileData,
} from "../../contexts/ProfileDataContext";

// react-router-dom components for routing & page navigation
import { useParams } from "react-router-dom";

// Axios library for HTTP requests
import { axiosReq } from "../../api/axiosDefaults";

// Utils
import { fetchMoreData } from "../../utils/utils";

// React components
import InfiniteScroll from "react-infinite-scroll-component";

// Reusable components
import Asset from "../../components/Asset";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import ProfileList from "./ProfileList";
import Task from "../tasks/Task";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

// Styles
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfilePage.module.css";


function ProfilePage() {
  // Set up state variables
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileTasks, setProfileTasks] = useState({ results: [] });
  const [assignedTasks, setAssignedTasks] = useState({ results: [] });
  const { id } = useParams();
  const { setProfileData } = useSetProfileData();
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
  const profileTaskCount = profileTasks.count;
  const assignedTaskCount = assignedTasks.count;

  // Returns profile & task details
  const mainProfile = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
        <Container>
          <Row className="justify-content-between">
            <Col>
              <Image 
                className={styles.ProfileImage}
                roundedCircle 
                src={profile?.image}
              />
              <h3 className="m-2">{profile?.owner}</h3>
            </Col>
            <Col className="d-flex flex-column justify-content-center align-items-center">
              <h3 className={`${appStyles.UnderlineOrange} ${appStyles.TextBold}`}>
                Tasks
              </h3>
              <Container>
                <Row className="row-cols-1 row-cols-md-2 g-0 mt-3">
                  <Col>
                    <span>Created: </span>
                    <span className={appStyles.TextOrange}>{profileTaskCount}</span>
                  </Col>
                  <Col>
                    <span>Assigned: </span>
                    <span className={appStyles.TextOrange}>{assignedTaskCount}</span>
                  </Col>
                </Row>
              </Container>
            </Col>
            {profile?.content && <Col className="p-3">{profile.content}</Col>}
          </Row>
        </Container>
    </>
  );

  // Returns tasks owned by profile owner
  const mainProfileTasks = (
    <>
      <h3 className={`${appStyles.TextBold} ${appStyles.UnderlineOrange} text-center`}>Created Tasks</h3>
      {profileTasks.results.length ? (
        <InfiniteScroll
          children={profileTasks.results.map((task) => (
            <Task key={task.id} {...task} setTasks={setProfileTasks} />
          ))}
          dataLength={profileTasks.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileTasks.next}
          next={() => fetchMoreData(profileTasks, setProfileTasks)}
        />
      ) : (
        <Asset
          message={`${profile?.owner} hasn't created any tasks yet.`}
        />
      )}
    </>
  );

  // Initialize task count
  let taskCount = 0;

  // Returns tasks assigned to profile owner
  const mainAssignedTasks = (
    <>
      <h3 className={`${appStyles.TextBold} ${appStyles.UnderlineOrange} text-center`}>
        Assigned Tasks
      </h3>
      {assignedTasks.results.length ? (
        <React.Fragment>
          <InfiniteScroll
            children={assignedTasks.results.map((task) => {
              // console.log(task);
              if (task.assigned_to === profile.id) {
                return (
                  <Task key={task.id} {...task} setTasks={setAssignedTasks} />
                );
              } else {
                return null;
              }
            })}
            dataLength={assignedTasks.results.length}
            loader={<Asset spinner />}
            hasMore={!!assignedTasks.next}
            next={() => fetchMoreData(assignedTasks, setAssignedTasks)}
          />
          {taskCount === assignedTasks.results.length && (
            <Asset
              message={`No tasks assigned to ${profile?.owner} yet.`}
            />
          )}
        </React.Fragment>
      ) : (
        <Asset
          message={`No tasks assigned to ${profile?.owner} yet.`}
        />
      )}
    </>
  );

  return (
    <>
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Card className={styles.Card}>
          <Card.Body>
            {hasLoaded ? (
              <>
                <Card.Title className={styles.CardTitle}>
                  {mainProfile}
                </Card.Title>
                  <div className={styles.CardText}>
                    {mainProfileTasks}
                    {mainAssignedTasks}
                  </div>
              </>
            ) : (
              <Asset spinner />
            )}
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <ProfileList />
      </Col>
    </Row>
    </>
  );
}

export default ProfilePage;