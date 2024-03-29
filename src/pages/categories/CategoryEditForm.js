// React library & hooks
import React, { useState, useEffect } from "react";

// react-router-dom components for page navigation
import { useHistory, useParams } from "react-router-dom";

// Axios library for HTTP requests
import { axiosReq } from "../../api/axiosDefaults";

// Reusable components
import MessageToast from "../../components/MessageToast";

// Bootstrap components
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Styles
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";


function CategoryEditForm() {

  // State variables 
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [categoryData, setCategoryData] = useState({
    title: '',
    description: '',
  });

  // Destructure categoryData
  const {
    title,
    description,
  } = categoryData;

  const history = useHistory();
  const {id} = useParams();
  
  useEffect(() => {
    // Fetch category
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/categories/${id}/`);
        const {
          title,
          description,
        } = data;

        // Set category data
        setCategoryData({
          title,
          description,
        });
      } catch (err) {
          console.log(err);
        }
    };
    handleMount();
  }, [id]);

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
        await axiosReq.put(`/categories/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccessMessage('Category successfully updated');
        setTimeout(() => {
          history.push(`/categories`);
        }, 3000);
    } catch(err){
        if (err.response?.status !== 401){
          // console.log(err.response?.data);
          setErrors(err.response?.data);
        }
    }

  }

  // Form fields
  const textFields = (
    <div className="text-center">
    <h3 className={`${appStyles.UnderlineOrange} ${appStyles.TextBold}`}>Edit category</h3>
      
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
        update
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

export default CategoryEditForm;