// React library & hooks
import React, {useState, useEffect} from "react";

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

// Styles
import appStyles from "../../App.module.css";
import styles from "../../styles/Task.module.css";
import { Button } from "react-bootstrap";


// Define priority choices
const priority_choices = {
      PRIORITY1: "High",
      PRIORITY2: "Medium",
      PRIORITY3: "Low",
    };

const Task = (props) => {
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

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
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
        if (category) {
          const response = await axiosReq.get(`/categories/${category}`);
          setTaskCategory(response.data.title);
        }
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
          {!taskPage ? (
            /* Task List Header */
            <Link
              to={`/tasks/${id}`}
              className={styles.TaskLink}
              aria-label="Task"
            >
              <Row className="row-cols-2 py-2 d-flex justify-content-between align-items-center">
                <Col className="text-start mb-0">
                  {title && (
                    <Card.Title className={`fs-4 mb-0 ${styles.TaskTitle}`}>{title}</Card.Title>
                  )}
                </Col>
                <Col className="text-end">
                    {isDueDateInPast && task_status !== 'COMPLETED' && showStatusUpdateForm ? (
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
                    ) : isDueDateToday && task_status !== 'COMPLETED' && showStatusUpdateForm ? (
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
          ):null}
          {/* Task Detail Header */}
          <div className="row text-center">
              {taskPage && title && (
                    <Card.Title
                    className={`fs-4 mb-3 ${styles.TaskTitle} ${appStyles.UnderlineOrange}`}
                    >
                      {title}
                      <span className={styles.MoreDropdown}>
                        {is_owner && taskPage && (
                          <MoreDropdown
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                          />
                        )}
                      </span>
                    </Card.Title>
                  )}
          </div>
          <div className="d-flex row-cols-2 row-cols-md-3 justify-content-between align-items-center flex-wrap g-3">
            {taskPage && (
              <div className={`col col-md-3 flex-column`}>
                <p className={`${appStyles.TextBold} mb-0 fs-6`}>
                  Created<br />
                </p>
                <p className={`${appStyles.TextWhite} ${appStyles.WeightNormal} mb-0`}>
                  {new Date(created_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </p>
              </div>
            )}
            {taskPage && isDueDateInPast && task_status !== 'COMPLETED' && showStatusUpdateForm ? (
              <div className={`col col-md-3 ms-auto flex-column ${styles.StatusBadge} ${styles.OverDue}`}>
                <p className={`${appStyles.TextBold} ${appStyles.TextWhite} mb-0 fs-6`}>
                  Overdue<br />
                </p>
                <p className={`${appStyles.TextWhite} ${appStyles.WeightNormal} mb-0`}>
                  {new Date(due_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            ) : taskPage && isDueDateToday && task_status !== 'COMPLETED' && showStatusUpdateForm ? (
              <div className={`col col-md-3 ms-auto flex-column ${styles.StatusBadge} ${styles.DueToday}`}>
                <p className={`${appStyles.TextBold} ${appStyles.TextWhite} mb-0 fs-6`}>
                  Due Today<br />
                </p>
                <p className={`${appStyles.TextWhite} ${appStyles.WeightNormal} mb-0`}>
                  {new Date(due_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            ) : taskPage && task_status !== 'COMPLETED' ? (
              <div className={`col col-md-3 ms-auto flex-column ${styles.StatusBadge} ${styles.DueDate}`}>
              <p className={`${appStyles.TextBold} ${appStyles.TextWhite} mb-0 fs-6`}>
                Due on<br />
              </p>
                {/* {due_date} */}
                <p className={`${appStyles.TextWhite} ${appStyles.WeightNormal} mb-0`}>
                  {new Date(due_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            ):null}
            {task_status !== 'COMPLETED' && taskPage && showStatusUpdateForm ? (
              <div className={`col col-md-3 ms-auto flex-column ${styles.StatusUpdateForm}`}>
              <p className={`${appStyles.TextBold} ${appStyles.TextWhite} mb-0 fs-6`}>
                Update Task Status
              </p>
                <StatusUpdateForm
                  taskId={id}
                  onUpdateStatus={handleStatusUpdate}
                />
              </div>
            ) : (
              <>
              {taskPage && (task_status === 'COMPLETED' || taskStatus === 'COMPLETED') ? (
                <div className={`col col-md-3 ms-auto flex-column ${styles.StatusBadge} ${styles.Completed}`}>
                  <p className={`${appStyles.TextBold} ${appStyles.TextWhite} mb-0 fs-6`}>
                    Completed on<br/>
                  </p>
                  <p className={`${appStyles.TextWhite} ${appStyles.WeightNormal} mb-0`}>
                    {new Date(completed_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  </p>
                </div>
              ) : null}
              </>
            )}
          </div>
        </Media>
      </Card.Body>

      <Card.Body className={styles.TaskBody}>
        {/* Task List Body */}
        {!taskPage ? (
          <Row className="row-cols-2 g-0">
            <Col className={`d-flex flex-column justify-content-center align-items-start ${styles.Meta}`}>
              <div className={styles.MetaDetail}>
                {/* Owner */}
                <span className="me-1">
                  <i aria-hidden="true" className="fas fa-crown"/>
                  {owner}
                </span>
              </div>
              <div className={styles.MetaDetail}>
                {/* Assigned User */}
                <span className="me-1">
                  <i aria-hidden="true" className="fas fa-user-check"/>
                  {assignedUser}
                </span>
              </div>
              <div className={styles.MetaDetail}>
                {/* Comment Count */}
                <span className="me-1">
                  <i aria-hidden="true" className="far fa-comments" />
                  {comment_count}
                </span>
              </div>
            </Col>
            <Col className={`d-flex flex-column justify-content-center align-items-end ${styles.Meta}`}>
              <div className="d-flex flex-column align-items-start">
                <div className={styles.MetaDetail}>
                  <span className="me-1">
                    <i aria-hidden="true" className="fas fa-triangle-exclamation"></i>
                    {priority_choices[priority]}
                  </span>
                </div>
                <div className={styles.MetaDetail}>
                  {/* Task Status */}
                  <span className="me-1">
                    <i aria-hidden="true" className="fas fa-list-check"></i>
                    { !taskStatus ? (
                      <TaskStatus taskStatus={task_status} />
                    ) : (
                      <TaskStatus taskStatus={taskStatus} />
                    ) }
                  </span>
                </div>
                <div className={styles.MetaDetail}>
                  {/* Category */}
                  <span className="me-1">
                    <i aria-hidden="true" className="far fa-folder" />
                    {taskCategory}
                  </span>
              </div>
              </div>
            </Col>
          </Row>
        ) : (
          // Task Detail Body
          <>
          <Card.Body className={!taskPage ? "py-0" : ""}>

        <div className={`${styles.TaskDetailDescription} row row-cols-1 row-cols-lg-4 justify-content-between p-3`}>
          <div className="col col-lg-8">
            {taskPage && description && (
              <Card.Text align={"left"}>{description}</Card.Text>
            )}
          </div>
          {taskPage && (
            <div className="col col-lg-2 text-center">
              <Card.Text className="d-flex align-items-center justify-content-center mt-5 mt-md-0 card-text">
                <i aria-hidden="true" className="fas fa-paperclip"></i> 
                <span className={appStyles.TextBold}>Attachment</span>
              </Card.Text>
              <Card.Img
                src={image}
                alt={title}
                onClick={openModal}
                className="w-50 mx-auto"
              />
              <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                size="lg"
                closeVariant="black"
                className={appStyles.Modal}
              >
                <Modal.Header
                  style={{
                  backgroundColor: '#32383C',
                  borderBottom: '2px solid #ff7614',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
                >
                  <Button className={appStyles.CloseModal} onClick={handleCloseModal} type="button">
                    <i aria-hidden="true" className="fas fa-times"></i>
                  </Button>
                </Modal.Header>
                <Modal.Body
                  style={{
                  backgroundColor: '#32383C',
                  padding: '1em',
                }}
                >
                  <Card.Img src={image} alt={title} />
                </Modal.Body>
              </Modal>
            </div>
          )}
        </div>
      </Card.Body>
          <div className={styles.TaskBar}>
            {/* Assigned User */}
            <div align="center">
              <div className="row row-cols-md-3 d-flex g-0">
                <strong className={`fw-bold fs-6 col ${styles.AssignLabel}`}>Assigned to: </strong>
                <p className={`col ${styles.Assigned}`}>
                  <i aria-hidden="true" className="fas fa-crown"></i>
                  {owner}
                </p>
                <p className={`col ${styles.Assigned}`}>
                  <i aria-hidden="true" className="fas fa-user-check" />
                  {assignedUser}
                </p>
              </div>
            </div>
            <hr className={`${appStyles.Divider} mt-0`}/>
            <div className={`row row-cols-3 justify-content-between ${styles.Meta}`}>
              {/* Category */}
              <span className={`col ${styles.MetaItem}`}>
                <i aria-hidden="true" className="far fa-folder" />
                {taskCategory}
              </span>

              {/* Task Status */}
              <span className={`col ${styles.MetaItem}`}>
                <span><i aria-hidden="true" className="fas fa-list-check"></i></span>
                { !taskStatus ? (
                  <TaskStatus taskStatus={task_status} />
                ) : (
                  <TaskStatus taskStatus={taskStatus} />
                ) }
              </span>

              {/* Priority */}
              <span className={`col ${styles.MetaItem}`}>
                <i aria-hidden="true" className="fas fa-triangle-exclamation"></i>
                {priority_choices[priority]}
              </span>
            </div>
          </div>
          </>
        )}
        
      </Card.Body>
    </Card>
  );
};

export default Task;
