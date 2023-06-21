import React from "react";
import styles from "../../styles/Task.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import { axiosRes } from "../../api/axiosDefaults";

const Task = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    task_status,
    priority,
    category,
    watched_id,
    watcher_count,
    title,
    notes,
    image,
    // created_date,
    due_date,
    updated_date,
    // completed_date,
    owner_comments,
    taskPage,
  } = props;


  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
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
      <Link to={`/tasks/${id}`}>
        <Card.Body  className={styles.TaskBody}>
              {title && <Card.Title className="text-center">{title}</Card.Title>}
              {notes && <Card.Text>{notes}</Card.Text>}

          <div className={styles.TaskBar}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You own this task; hopefully you're watching it</Tooltip>}
              >
                <i className="far fa-eye" />
              </OverlayTrigger>
            ) : watched_id ? (
              <span onClick={() => {}}>
                <i className={`fas fa-eye ${styles.Eye}`} />
              </span>
            ) : currentUser ? (
              <span onClick={() => {}}>
                <i className={`far fa-eye ${styles.EyeOutline}`} />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to watch tasks!</Tooltip>}
              >
                <i className="far fa-eye" />
              </OverlayTrigger>
            )}
            {watcher_count}
            <Link to={`/watchers/${id}`}>
              <i className="far fa-comments" />
            </Link>
            <Link to={`/categories/${id}`}>
              <i className="far fa-folder" />
              {category}
            </Link>
            <Link to={`/`}>
              <i className="fas fa-list-check"></i>
              {task_status}
            </Link>
            <Link to={`/`}>
              <i className="fas fa-triangle-exclamation"></i>
              {priority}
            </Link>
            {owner_comments}
          </div>
        </Card.Body>
      </Link>
      {taskPage && (
        <Card.Img src={image} alt={title} />
      )}
    </Card>
  );
};

export default Task;