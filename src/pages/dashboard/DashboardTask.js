// React library & hooks
import React, { useState } from "react";

// react-router-dom components for page navigation
import { Link } from "react-router-dom";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";

// Styles
import styles from "../../styles/DashboardTask.module.css";


const DashboardTask = (props) => {
    // Destructure task props
    const {
    id,
    task_status,
    title,
    due_date,
    completed_date,
    } = props;

    const currentDate = new Date();
    const isDueDateInPast = new Date(due_date).setHours(0,0,0,0) < currentDate.setHours(0,0,0,0);
    const isDueDateToday =
    new Date(due_date).toLocaleDateString() === currentDate.toLocaleDateString();
    const [taskStatus] = useState(props.task_status);


    return (
        <Card className={styles.Task}>
            <Card.Body className={styles.TaskBody}>
                <Media className="align-items-center justify-content-between">
                    {/* Task List Header */}
                    <Link
                        to={`/tasks/${id}`}
                        aria-label="Task Link"
                    >
                        <Row className="row-cols-2 align-items-center">
                            <Col>
                                <Card.Title className={`fs-6 text-left mb-0 ${styles.TaskTitle}`}>{title}</Card.Title>
                            </Col>
                            <Col className="text-end">
                                {isDueDateInPast && task_status !== 'COMPLETED' ? (
                                    <div className={`${styles.StatusBadge} ${styles.OverDue}`}>
                                        <label className={styles.BadgeLabel}>Overdue</label>
                                        <span className={styles.BadgeDate}>
                                            {new Date(due_date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                ) : isDueDateToday && task_status !== 'COMPLETED' ? (
                                    <div className={`${styles.StatusBadge} ${styles.DueToday}`}>
                                        <label className={styles.BadgeLabel}>Due Today</label>
                                        <span className={styles.BadgeDate}>
                                            {new Date(due_date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                ) : task_status !== 'COMPLETED' ? (
                                    <div className={`${styles.StatusBadge} ${styles.DueDate}`}>
                                        <label className={styles.BadgeLabel}>Due on</label>
                                        <span className={styles.BadgeDate}>
                                            {new Date(due_date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                ) : task_status === 'COMPLETED' || taskStatus === 'COMPLETED' ? (
                                    <div className={`${styles.StatusBadge} ${styles.Completed}`}>
                                        <label className={styles.BadgeLabel}>Completed</label>
                                        <span className={styles.BadgeDate}>
                                            {new Date(completed_date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>

                                ):null}
                            </Col>
                        </Row>
                    </Link>
                </Media>
            </Card.Body>
        </Card>
    );
};

export default DashboardTask;
