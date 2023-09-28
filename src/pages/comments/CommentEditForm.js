// React library & hooks
import React, { useState } from "react";

// Axios library for HTTP requests
import { axiosRes } from "../../api/axiosDefaults";

// Reusable components
import MessageToast from "../../components/MessageToast";

// Bootstrap components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Styles
// import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/CommentCreateEditForm.module.css";


function CommentEditForm(props) {

  // Destructure props
  const { id, content, setShowEditForm, setComments } = props;

  // State variables
  const [formContent, setFormContent] = useState(content);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle change in comment content
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  // Handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setSuccessMessage('Comment updated');
      setTimeout(() => {
        setShowEditForm(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pe-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={`${styles.ButtonCancel}`}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <Button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </Button>
        {successMessage && (
          <MessageToast
            message={successMessage}
            type="success"
            setSuccessMessage={setSuccessMessage}
          />
        )}
      </div>
    </Form>
  );
}

export default CommentEditForm;