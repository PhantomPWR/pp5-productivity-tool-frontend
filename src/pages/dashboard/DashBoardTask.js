// React library & hooks
import React, { useState, useEffect } from "react";

// Context hooks
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// react-router-dom components for page navigation
import { Link, useHistory } from "react-router-dom";

// Axios library for HTTP requests
import axios from "axios";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

// Reusable components
import { MoreDropdown } from "../../components/MoreDropdown";
import TaskStatus from "../../components/TaskStatus";
import StatusUpdateForm from "../../components/StatusUpdateForm";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Modal from "react-bootstrap/Modal";
import { response } from "msw";

// Styles
import styles from "../../styles/Task.module.css";

// Define priority choices
const priority_choices = {
    PRIORITY1: "High",
    PRIORITY2: "Medium",
    PRIORITY3: "Low",
};

const DashboardTask = (props) => {
    // Destructure task props
    const {
    id,
    owner,
    assigned_to,
    task_status,
    priority,
    category,
    title,
    description,
    image,
    created_date,
    due_date,
    completed_date,
    comment_count,
    taskPage,
    } = props;

    // Get current user from context
    const currentUser = useCurrentUser();

    // Check if current user is task owner
    const is_owner = currentUser?.username === owner;

    // Set up state variables
    const [assignedUser, setAssignedUser] = useState(null);
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const currentDate = new Date();
    const isDueDateInPast = new Date(due_date).setHours(0,0,0,0) < currentDate.setHours(0,0,0,0);
    const isDueDateToday =
    new Date(due_date).toLocaleDateString() === currentDate.toLocaleDateString();

    const [taskStatus, setTaskStatus] = useState(props.task_status);
    const [showStatusUpdateForm, setShowStatusUpdateForm] = useState(true);
    const [taskCategory, setTaskCategory] = useState([]);

    // Handle task status update
    const handleStatusUpdate = async (newStatus) => {
        setTaskStatus(newStatus);
        setShowStatusUpdateForm(newStatus !== 'COMPLETED');
    };

    // Open modal
    const openModal = () => {
        setShowModal(true);
    };

    // Handle task edit
    const handleEdit = () => {
        history.push(`/tasks/${id}/edit`);
    };

    // Handle task delete
    const handleDelete = async () => {
        try {
        await axiosRes.delete(`/tasks/${id}/`);
        history.goBack();
        } catch (err) {
        // console.log(err);
        }
    };

    // Fetch task categories from the API
    useEffect(() => {
        const fetchTaskCategory = async () => {
            try {
            const response = await axiosReq.get(`/categories/${category}`);
            setTaskCategory(response.data.title);
            } catch (error) {
            console.error('Error fetching category options:', error);
            }
        };
        
        fetchTaskCategory();
        }, [category]);

    // Fetch assigned user
    useEffect(() => {
        if (assigned_to) {
        axios.get(`/profiles/${assigned_to}`).then((response) => {
            setAssignedUser(response.data.owner);
        });
        } else {
        setAssignedUser("No users assigned yet.");
        }
    }, [assigned_to]);

    return (
        <Card className={styles.Task}>
            <Card.Body className={styles.TaskBody}>
                <Media className="align-items-center justify-content-between">
                    {/* Task List Header */}
                    <Link to={`/tasks/${id}`}>
                        <Row className="row-cols-2">
                            <Col>
                                <Card.Title className={`fs-4 text-left ${styles.TaskTitle}`}>{title}</Card.Title>
                            </Col>
                            <Col className="text-end">
                            <Col className="text-end">
                    {isDueDateInPast && task_status !== 'COMPLETED' && showStatusUpdateForm ? (
                        <span className={`px-3 py-2 ${styles.StatusBadge} ${styles.OverDue}`}>
                        Overdue{' '}
                        {new Date(due_date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                        </span>
                    ) : isDueDateToday && task_status !== 'COMPLETED' && showStatusUpdateForm ? (
                        <span className={`px-3 py-2 ${styles.StatusBadge} ${styles.DueToday}`}>
                        Due Today{' '}
                        {new Date(due_date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                        </span>
                    ) : task_status !== 'COMPLETED' ? (
                        <span className={`px-3 py-2 ${styles.StatusBadge} ${styles.DueDate}`}>
                        Due on{' '}
                        {/* {due_date} */}
                        {new Date(due_date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                        </span>
                    ) : task_status === 'COMPLETED' || taskStatus === 'COMPLETED' ? (
                        <span className={`px-3 py-2 ${styles.StatusBadge} ${styles.Completed}`}>
                            Completed on{' '}
                            {new Date(completed_date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            })}
                        </span>

                    ):null}
                </Col>
                            </Col>
                        </Row>
                    </Link>
                </Media>
            </Card.Body>
        </Card>
    );
};

export default DashboardTask;
