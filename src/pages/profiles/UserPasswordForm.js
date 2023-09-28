// React library & hooks
import React, { useEffect, useState } from "react";

// react-router-dom components for page navigation
import { useHistory, useParams } from "react-router-dom";

// Context hooks
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// Axios library for HTTP requests
import { axiosRes } from "../../api/axiosDefaults";

// Reusable components
import MessageToast from "../../components/MessageToast";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Styles
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";


const UserPasswordForm = () => {

  // Set up state variables
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  // Check if profile matches current user
  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      history.push("/");
    }
  }, [currentUser, history, id]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      setSuccessMessage('Password successfully updated');
      setTimeout(() => {
        history.goBack();
      }, 3000);
    } catch (err) {
      // console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={6}>
        <Container className={appStyles.Content}>
        <h3 className={`${appStyles.UnderlineOrange} ${appStyles.TextBold}`}>Update password</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="text-start">
              <Form.Label>New password</Form.Label>
              <Form.Control
                className={appStyles.UserAgentOverride}
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group className="text-start">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                className={appStyles.UserAgentOverride}
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} ${btnStyles.OrangeOutline} mt-3 me-3`}
              onClick={() => history.goBack()}
            >
              cancel
            </Button>
            <Button
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Orange} mt-3`}
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
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UserPasswordForm;