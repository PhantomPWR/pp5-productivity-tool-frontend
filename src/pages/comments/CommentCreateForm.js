// React library & hooks
import React, { useState } from "react";

// react-router-dom components for page navigation
import { Link } from "react-router-dom";

// Axios library for HTTP requests
import { axiosRes } from "../../api/axiosDefaults";

// Reusable components
import Avatar from "../../components/Avatar";
import MessageToast from "../../components/MessageToast";

// Bootstrap components
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

// Styles
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/CommentCreateEditForm.module.css";


function CommentCreateForm(props) {

  // State variables
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState('');

  // Destructure props
  const { task, setTask, setComments, profileImage, profile_id } = props;

  // Handle change in comment content
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        task,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setTask((prevTask) => ({
        results: [
          {
            ...prevTask.results[0],
            comment_count: prevTask.results[0].comment_count + 1,
          },
        ],
      }));
      setContent("");
      setSuccessMessage("Comment posted");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link
            to={`/profiles/${profile_id}`}
            aria-label="Profile Link"
          >
            <Avatar src={profileImage} />
          </Link>
          <Form.Label htmlFor="content" className="sr-only">Create comment</Form.Label>
          <Form.Control
            className={styles.Form}
            placeholder="Add your comment here..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <Button
        className={`${btnStyles.Button} d-block ms-auto mt-3`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </Button>
      {successMessage && (
        <MessageToast
          message={successMessage}
          type="success"
          setSuccessMessage={setSuccessMessage}
        />
      )}
    </Form>
  );
}

export default CommentCreateForm;