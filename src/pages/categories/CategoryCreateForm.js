// React library & hooks
import React, { useState } from "react";

// react-router-dom components for page navigation
import { useHistory } from "react-router-dom";

// Axios library for HTTP requests
import { axiosReq } from "../../api/axiosDefaults";

// Reusable components
import MessageToast from "../../components/MessageToast";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Styles
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";


function CategoryCreateForm() {

  // State variables
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();


  // Destructure categoryData
  const [categoryData, setCategoryData] = useState({
    title: '',
    description: '',
  });

  const {
    title,
    description,
  } = categoryData;

  // Handle form input
  const handleChange = (event) => {
    setCategoryData({
      ...categoryData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
  
    try {
      await axiosReq.post('/categories/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setSuccessMessage('Category successfully created');
      setTimeout(() => {
        history.push(`/categories`);
      }, 3000);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };
  

  // Form fields
  const textFields = (
    <div className="text-center">
    <h3 className={`${appStyles.UnderlineOrange} ${appStyles.TextBold}`}>Create category</h3>
      
      {/* Title */}
      <Form.Group className="text-start">
        <Form.Label>Title</Form.Label>
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
      
      {/* Description */}
      <Form.Group className="text-start">
        <Form.Label>Description</Form.Label>
        <Form.Control
            type="text"
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
    
      <Button
        className={`${btnStyles.Button} ${btnStyles.OrangeOutline} mt-3`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Orange} mt-3 ms-5`} type="submit">
        create
      </Button>
    </div>
  );

  

  return (

    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6} lg={6} className="d-none d-md-block p-0 p-md-2 mx-auto">
          <Container className={appStyles.Content}>{textFields}</Container>
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

export default CategoryCreateForm;