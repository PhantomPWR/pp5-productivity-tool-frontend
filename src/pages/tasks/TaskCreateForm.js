import React, { useRef, useState, useEffect } from "react";
import Upload from "../../assets/upload.png";
import { Container, Row, Col, Form, Button, Image, Alert } from "react-bootstrap"
import styles from "../../styles/TaskCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import axios from "axios";
import { useRedirect } from '../../hooks/useRedirect';

function TaskCreateForm() {
  useRedirect('loggedOut');

  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

  // Fetch profiles from the API
  useEffect(() => {
    axios
      .get("/profile-list/")
      .then((response) => setUsers(response.data))
      .catch(
        (error) => {/*console.log(error)*/});
  }, []);


  const [taskData, setTaskData] = useState({
    title: '',
    category: '',
    notes: '',
    image: '',
    task_status: '',
    priority: '',
    owner: '',
    watched_id: '',
    watcher_count: '',
    // created_date: '',
    // due_date: '',
    updated_date: '',
    // completed_date: '',
    owner_comments: '',
  });
    const {
    title,
    notes,
    image,
    category,
    task_status,
    owner,
    priority,
    // watched_id,
    // watcher_count,
    // created_date,
    // due_date,
    updated_date,
    // completed_date,
    owner_comments, 
    is_owner
  } = taskData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setTaskData({
        ...taskData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title)
    formData.append('category', taskData.category)
    formData.append('notes', notes)
    // formData.append('image', imageInput.current.files[0])
    if (imageInput?.current?.files.length > 0) { // Check if an image file is selected
      formData.append('image', imageInput.current.files[0]);
    }
    formData.append('task_status', taskData.task_status)
    formData.append('owner', owner)
  

    try {
        const {data} = await axiosReq.post('/tasks/', formData);
        history.push(`/tasks/${data.id}`)
    } catch(err){
        // console.log(err);
        if (err.response?.status !== 401){
            setErrors(err.response?.data)
        }
    }

  }


  const textFields = (
    <div className="text-center">
      {/* Title */}
      <Form.Group>
        <Form.Label>Task Title</Form.Label>
        <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
    />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      
      {/* Category */}
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
            as="input"
            name="category"
            value={category}
            onChange={handleChange}
        /> 
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      
      {/* Notes */}
      <Form.Group>
        <Form.Label>Task Notes</Form.Label>
        <Form.Control
            as="textarea"
            rows={6}
            name="notes"
            value={notes}
            onChange={handleChange}
        /> 
      </Form.Group>
      {errors?.notes?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Status */}
      <Form.Group>
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="task_status"
          value={task_status}
          onChange={handleChange}
          aria-label="task status"
        >
          <option value="">Select status</option>
          <option value="BACKLOG">Backlog</option>
          <option value="TODO">To Do</option>
          <option value="INPROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>

        </Form.Control>
      </Form.Group>
      {errors?.task_status?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Owner */}
      <Form.Group>
        <Form.Label>Assigned to</Form.Label>

        <Form.Control
          as="select"
          name="owner"
          className={appStyles.Input}
          value={owner}
          onChange={handleChange}
          aria-label="owner"
        >
          <option>Select a user</option>
          {users.map((user) => (
            
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
          ;
        </Form.Control>
      </Form.Group>

      {errors?.owner?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  

  return (

    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={7} lg={7} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
        <Col className="py-2 p-0 p-md-2" md={5} lg={5}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Update image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default TaskCreateForm;