// React library & hooks
import React, { useRef, useState, useEffect } from "react";

// react-router-dom components for page navigation
import { useHistory, useParams } from "react-router-dom";

// Custom hooks
// import { useRedirect } from '../../hooks/useRedirect';

// Axios library for HTTP requests
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";

// Reusable components
import Asset from "../../components/Asset";
import MessageToast from "../../components/MessageToast";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";

// Styles
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/TaskCreateEditForm.module.css";
import "react-datepicker/dist/react-datepicker.css";

// Assets
import Upload from "../../assets/upload.png";


function TaskEditForm() {

  // Set up state variables
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [taskStatusChoices, setTaskStatusChoices] = useState([{'value': '', 'label': ''}]);
  const [taskPriorityChoices, setTaskPriorityChoices] = useState([{'value': '', 'label': ''}]);
  const [
    taskCategoryChoices,
    setTaskCategoryChoices
  ] = useState([{'value': '', 'label': ''}]);
  const [setTaskCategory] = useState([]);

  // Fetch profiles from the API
  useEffect(() => {
    axios
      .get("/profile-list/")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

    // Fetch task category choices from the API
    useEffect(() => {
      const fetchTaskCategoryChoices = async () => {
        try {
          const response = await axiosReq.get('/category-choices/');
          const categoryChoices = response.data.map(category => ({
            key: category.id,
            value: category.value,
            label: category.label
          }));
          setTaskCategoryChoices(categoryChoices);
        } catch (error) {
          console.error('Error fetching category options:', error);
        }
      };
      
      fetchTaskCategoryChoices();
    }, []);

  // Fetch task status choices from the API
  useEffect(() => {
    const fetchTaskStatusChoices = async () => {
      try {
        const response = await axiosReq.get('/status-choices/');
          setTaskStatusChoices(response.data);
      } catch (error) {
          console.error('Error fetching task_status options:', error);
        }
    };
    fetchTaskStatusChoices();
  }, []);

  // Fetch task priority choices from the API
  useEffect(() => {
    const fetchTaskPriorityChoices = async () => {
      try {
        const response = await axiosReq.get('/priority-choices/');
          setTaskPriorityChoices(response.data);
      } catch (error) {
          console.error('Error fetching priority options:', error);
        }
    };
    fetchTaskPriorityChoices();
  }, []);

  // taskData state variable
  const [taskData, setTaskData] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    task_status: '',
    priority: '',
    owner: '',
    created_date: '',
    due_date: null,
    updated_date: '',
    completed_date: '',
    assigned_to: '',
  });

  // Destructure taskData
  const {
    title,
    description,
    image,
    category,
    task_status,
    owner,
    priority,
    // due_date,
    assigned_to,
  } = taskData;

  const imageInput = useRef(null);
  const history = useHistory();
  const {id} = useParams();

  // Populate due date field with existing due date
  useEffect(() => {
    setSelectedDate(taskData.due_date);
  }, [taskData.due_date]);

  // Fetch task data from the API
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/${id}/`);
        const {
          title,
          category,
          description,
          image,
          task_status,
          priority,
          owner, 
          due_date,
          updated_date,
          owner_comments,
          assigned_to, 
          is_owner
        } = data;

        // Redirect if user is not the owner of the task
        // otherwise populate the form with the task data
        is_owner ? setTaskData({
          title,
          category,
          description,
          image,
          task_status,
          priority,
          owner,
          due_date,
          updated_date,
          owner_comments,
          assigned_to,
        }) : history.push('/');
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

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
  }, [category, setTaskCategory]);

  // Handle form input change
  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle image upload
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setTaskData({
        ...taskData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // Handle date change
  const handleChangeDate = (event) => {
    setSelectedDate(event.target.value);
    setTaskData({
      ...taskData,
      due_date: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('title', title);
    formData.append('category', taskData.category);
    formData.append('description', description);
    formData.append('task_status', taskData.task_status);
    formData.append('priority', taskData.priority);
    formData.append('owner', owner);
    formData.append('due_date', selectedDate);
    formData.append('assigned_to', assigned_to);

    if (imageInput?.current?.files[0]) {
      formData.append('image', imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/tasks/${id}/`, formData);
      setSuccessMessage('Task successfully updated');
      setTimeout(() => {
        history.push(`/tasks`);
      }, 3000);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  // Form fields
  const textFields = (
    <div className="text-center">
      <h3 className={`${appStyles.UnderlineOrange} ${appStyles.TextBold}`}>Edit a task</h3>
      
      {/* Title */}
      <Form.Group className="text-start">
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
      <Form.Group className="text-start">
        <Form.Label>Task Category</Form.Label>
        <Form.Control
          className={`form-select ${appStyles.Select}`}
          as="select"
          name="category"
          value={category}
          onChange={handleChange}
          aria-label="task category"
        >
          <option value="">Select task category</option>
          {taskCategoryChoices.map((categoryChoice) => (
            <option 
            key={categoryChoice.value} 
            value={categoryChoice.value}>
              {categoryChoice.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Due Date */}
      <Form.Group className="text-start">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          id="dueDateInput"
          name="due_date"
          value={selectedDate || ''}
          onChange={handleChangeDate}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      
      {/* Description */}
      <Form.Group className="text-start">
        <Form.Label>Task Description</Form.Label>
        <Form.Control
            as="textarea"
            rows={6}
            name="description"
            value={description}
            onChange={handleChange}
        /> 
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Task Status */}
      <Form.Group className="text-start">
        <Form.Label>Task Status</Form.Label>
        <Form.Control
          className={`form-select ${appStyles.Select}`}
          as="select"
          name="task_status"
          value={task_status}
          onChange={handleChange}
          aria-label="task status"
        >
          <option value="">Select task status</option>
          {taskStatusChoices.map((statusChoice) => (
            <option key={statusChoice.value} value={statusChoice.value}>{statusChoice.label}</option>
          ))}
        </Form.Control>
      </Form.Group>
      {errors?.task_status?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Task Priority */}
      <Form.Group className="text-start">
        <Form.Label>Task Priority</Form.Label>
        <Form.Control
          className={`form-select ${appStyles.Select}`}
          as="select"
          name="priority"
          value={priority || ''}
          onChange={handleChange}
          aria-label="task priority"
        >
          <option value="">Select task priority</option>
          {taskPriorityChoices.map((priorityChoice) => (
            <option key={priorityChoice.value} value={priorityChoice.value}>{priorityChoice.label}</option>
          ))}
        </Form.Control>
      </Form.Group>
      {errors?.priority?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Assigned to */}
      <Form.Group className="text-start">
        <Form.Label>Assigned to</Form.Label>
        <Form.Control
          className={`form-select ${appStyles.Select}`}
          as="select"
          name="assigned_to"
          value={assigned_to}
          onChange={handleChange}
          aria-label="assigned to"
        >
          <option>Select a user</option>
          {users.map((user) => (
            
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {errors?.owner?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    
      <Button
        className={`${btnStyles.Button} ${btnStyles.OrangeOutline} mt-3`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Orange} mt-3 ms-5`} type="submit">
        Update
      </Button>
    </div>
  );

  
  return (

    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6} lg={6} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
        <Col className="py-2 p-0 p-md-2" md={6} lg={6}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <h3 className={`${appStyles.UnderlineOrange} ${appStyles.TextBold} text-center mb-3`}>Attachment</h3>
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Orange} btn`}
                      htmlFor="image-upload"
                    >
                      Replace image
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

export default TaskEditForm;