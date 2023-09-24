// React library & hooks
import React, { useState, useEffect, useRef } from "react";

// react-router-dom components for page navigation
import { useHistory, useParams } from "react-router-dom";

// Context hooks
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

// Axios library for HTTP requests
import { axiosReq } from "../../api/axiosDefaults";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";

// Styles
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ProfileEditForm.module.css";

const ProfileEditForm = () => {
  // Set up state variables
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();
  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
  });
  const { name, content, image } = profileData;
  const [errors, setErrors] = useState({});

  // Check if profile matches current user
  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, image } = data;
          setProfileData({ name, content, image });
        } catch (err) {
          // console.log(err);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [currentUser, history, id]);

  // Handle profile data changes
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      history.goBack();
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  // Form fields
  const textFields = (
    <>
      <h3 className={`${appStyles.TextBold} ${appStyles.UnderlineOrange} mb-3`}>Update profile</h3>
      <Form.Group className="text-start">
        <Form.Label className="fs-5">
          Biography
        </Form.Label>
        <Form.Control
          className={appStyles.UserAgentOverride}
          as="textarea"
          value={content}
          onChange={handleChange}
          name="content"
          rows={7}
        />
      </Form.Group>

      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        className={`${btnStyles.Button} ${btnStyles.OrangeOutline} mt-3 me-5`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Orange} mt-3`} type="submit">
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
            <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
        <Col className="py-2 p-0 p-md-2 text-center" md={6} lg={6}>
          <Container className={appStyles.Content}>
            <h3 className={`${appStyles.TextBold} ${appStyles.UnderlineOrange} mb-3`}>Profile image</h3>
            <Form.Group>
              {image && (
                <figure>
                  <Image
                    className={styles.ProfileImage}
                    src={image}
                    fluid
                  />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} ${btnStyles.Orange} btn my-auto`}
                  htmlFor="image-upload"
                >
                  Update image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none mt-5">{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;