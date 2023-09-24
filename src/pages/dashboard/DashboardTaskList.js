// React library & hooks
import React, { useEffect, useState } from "react";

// Context hooks
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// Axios library for HTTP requests
import { axiosReq } from "../../api/axiosDefaults";

// Utils
import { fetchMoreData } from "../../utils/utils";

// React components
import InfiniteScroll from "react-infinite-scroll-component";

// Reusable components
import APIConnectionCheck from "../../components/APIConnectionCheck";
import Asset from "../../components/Asset";
import DashboardTask from "./DashboardTask";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

// Styles
import appStyles from "../../App.module.css";
import dashboardStyles from "../../styles/DashboardPage.module.css";
import styles from "../../styles/DashboardTaskList.module.css";


function DashboardTaskList({ message, filter = "" }) {
    const [outstandingTasks, setOutstandingTasks] = useState({ results: [] });
    const [assignedTasks, setAssignedTasks] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    const id = currentUser.pk;

    APIConnectionCheck('tasks');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    { data: outstandingTasks },
                    { data: assignedTasks }
                ] =
                await Promise.all([
                    axiosReq.get(`/tasks/?owner__profile=${id}`),
                    axiosReq.get(`/tasks/?assigned_to=${id}`),
                ]);
                
                // Filter out completed tasks
                const filteredOutstandingTasks = outstandingTasks.results.filter(task => task.task_status !== 'COMPLETED');
                const filteredAssignedTasks = assignedTasks.results.filter(task => task.task_status !== 'COMPLETED');
    
                setOutstandingTasks({ results: filteredOutstandingTasks });
                setAssignedTasks({ results: filteredAssignedTasks });
                setHasLoaded(true);
            } catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, [id]);
    

    return (
        <Container className="h-100">
            <div className="py-2 p-0 p-lg-2 MainCol">
                <Row className={`row-cols-1 row-cols-md-2 ${styles.Row}`}>
                    <Col className={styles.Col}>
                        <Card className={dashboardStyles.Card}>
                            <Card.Body>
                                <Card.Title className={`${dashboardStyles.CardTitle} ${appStyles.UnderlineOrange}`}>Pending Tasks Owned</Card.Title>
                                <Card.Text className={dashboardStyles.CardText}>
                                    {hasLoaded ? (
                                        <>
                                            {console.log('outstandingTasks: ', outstandingTasks)}
                                            {outstandingTasks.results.length ? (
                                                <InfiniteScroll
                                                    style={{overflow: 'hidden'}}
                                                    key={outstandingTasks.results.map(outstandingTask => outstandingTask.id).join(",")}
                                                    children={
                                                        outstandingTasks.results.map((outstandingTask) => (
                                                            <DashboardTask key={outstandingTask.id} {...outstandingTask} setTasks={setOutstandingTasks} />
                                                        ))
                                                    }
                                                    dataLength={outstandingTasks.results.length}
                                                    loader={<Asset spinner />}
                                                    hasMore={!!outstandingTasks.next}
                                                    next={() => fetchMoreData(outstandingTasks, setOutstandingTasks)}
                                                />
                                            ) : (
                                                <Container className={appStyles.Content}>
                                                    <Asset message='You have no pending tasks you own' />
                                                </Container>
                                            )}
                                        </>
                                    ) : (
                                        <Container className={appStyles.Content}>
                                            <Asset spinner />
                                        </Container>
                                    )}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className={`${styles.Col} mt-3 mt-sm-0`}>
                        <Card className={dashboardStyles.Card}>
                            <Card.Body>
                                <Card.Title className={`${dashboardStyles.CardTitle} ${appStyles.UnderlineOrange}`}>Pending Tasks Assigned</Card.Title>
                                <Card.Text className={dashboardStyles.CardText}>
                                    {hasLoaded ? (
                                        <>
                                            {console.log('assignedTasks: ', assignedTasks)}
                                            {assignedTasks.results.length ? (
                                                <InfiniteScroll
                                                    style={{overflow: 'hidden'}}
                                                    key={assignedTasks.results.map(assignedTask => assignedTask.id).join(",")}
                                                    children={
                                                        assignedTasks.results.map((assignedTask) => (
                                                            <DashboardTask key={assignedTask.id} {...assignedTask} setTasks={setAssignedTasks} />
                                                        ))
                                                    }
                                                    dataLength={assignedTasks.results.length}
                                                    loader={<Asset spinner />}
                                                    hasMore={!!assignedTasks.next}
                                                    next={() => fetchMoreData(assignedTasks, setAssignedTasks)}
                                                />
                                            ) : (
                                                <Container className={appStyles.Content}>
                                                    <Asset message='You have no pending tasks assigned to you' />
                                                </Container>
                                            )}
                                        </>
                                    ) : (
                                        <Container className={appStyles.Content}>
                                            <Asset spinner />
                                        </Container>
                                    )}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default DashboardTaskList;
