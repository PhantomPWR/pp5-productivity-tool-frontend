import React, {useState, useEffect} from "react";
import styles from "../../styles/Task.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import axios from "axios";
import { axiosRes } from "../../api/axiosDefaults";


const status_choices = {
      BACKLOG: 'Backlog',
      TODO: 'To Do',
      INPROGRESS: 'In Progress',
      COMPLETED: 'Completed'
    }

const priority_choices = {
      PRIORITY1: '1',
      PRIORITY2: '2',
      PRIORITY3: '3',
    }

const Task = (props) => {
  const {
    id,
    owner,
    assigned_to,
    profile_id,
    profile_image,
    task_status,
    priority,
    category,
    title,
    description,
    image,
    // created_date,
    due_date,
    updated_date,
    // completed_date,
    comment_count,
    taskPage,
  } = props;


  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [assignedUser, setAssignedUser] = useState(null);
  const history = useHistory();


  const handleEdit = () => {
    history.push(`/tasks/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };


  const currentDate = new Date();
  console.log(currentDate);
  const dueDate = due_date;
  console.log(dueDate);
  const differenceMs = Math.abs(dueDate - currentDate);
  console.log(differenceMs);

  useEffect(() => {
    if (assigned_to) {
      axios.get(`/profiles/${assigned_to}/`).then((response) => {
        setAssignedUser(response.data.owner);
      });
    } else {
      setAssignedUser("No users assigned yet.");
    }
  }, [assigned_to]);

  return (
    <Card className={styles.Task}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex row-cols-3 align-items-center">
            <span className="col">Updated {updated_date}</span>
            <span className="col">Due on {due_date}</span>
            <span className="col d-flex justify-content-end">
              {is_owner && taskPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </span>
          </div>
        </Media>
      </Card.Body>

      <Card.Body  className={styles.TaskBody}>
        
        <Link to={`/tasks/${id}`}>
            {title && <Card.Title className="fs-2 text-center">{title}</Card.Title>}
        </Link>
        <div className={styles.TaskBar}>
          
          {/* Owner */}
          <i className="fas fa-crown"></i>
          <span>Task Owner: </span>
          {owner}
          
          {/* Assigned Users */}
          <i className="fas fa-user-check" />
          <span>Assigned to: </span>
          {assignedUser}

          {/* Category */}
          <Link to={`/categories/${id}`}>
            <i className="far fa-folder" />
            {category}
          </Link>

          {/* Task Status */}
          <Link to={`/tasks/?task_status=${task_status}`}>
            <i className="fas fa-list-check"></i>
            {status_choices[task_status]}
          </Link>

          {/* Priority */}
          <Link to={`/`}>
            <i className="fas fa-triangle-exclamation"></i>
            {priority_choices[priority]}
          </Link>

          {/* Comment Count */}
          <Link to={`/tasks/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comment_count}
        </div>
      </Card.Body>
      <Card.Body>
        <div className="row row-cols-1 row-cols-lg-2">
          <div className="col">
            {description && <Card.Text align={'left'}>{description}</Card.Text>}
          </div>
          <div className="col">
            {taskPage && (
              <Card.Img src={image} alt={title} className="w-50" />
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Task;