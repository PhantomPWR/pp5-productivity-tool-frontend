import React, { useRef, useState } from "react";
import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap"
import Upload from "../../assets/upload.png";
import styles from "../../styles/TaskCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

function TaskEditForm() {

  const [errors, setErrors] = useState({});

  const [taskData, setTaskData] = useState({
    title: "",
    category: "",
    notes: "",
    image: "",
    status: "",
    priority: "",
    owner: "",
    watched_id: "",
    watcher_count: "",
    attachments: "",
    created_date: "",
    due_date: "",
    updated_date: "",
    completed_date: "",
    owner_comments: "",
  });
  const { title, notes, image } = taskData;

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
    formData.append('image', imageInput.current.files[0])

    try {
        const {data} = await axiosReq.post('/tasks/', formData);
        history.push(`/tasks/${data.id}`)
    } catch(err){
        console.log(err);
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
            value={taskData.category}
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

    
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
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
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
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
                      Change the image
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
                // accept="image/*"
                accept="
                .jpg, .jpeg, .png, .gif, .svg,
                .pdf, .doc, .docx,
                .ppt, .pptx,
                .xls, .xlsx,
                .txt
                "
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default TaskEditForm;