// React library
import React from "react";

// React-router-dom components for page navigation
import { Link } from "react-router-dom";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Image from "react-bootstrap/Image";

// Styles
import appStyles from "../App.module.css";
import btnStyles from "../styles/Button.module.css";

// Assets
import PageNotFoundImg from "../assets/404.webp";

const PageNotFound = () => {
    return (
        <Container fluid className={appStyles.main}>
        <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6} className="text-center">
            <Image fluid src={PageNotFoundImg} />
            <h1 className="mt-5 mb-3">Lost, are we?</h1>
            <p className="mb-5">
                Let's get you back home.
            </p>
            <Link to="/">
                <Button className={btnStyles.Orange}>
                This way <i className="fas fa-arrow-right ml-2" />
                </Button>
            </Link>
            </Col>
        </Row>
        </Container>
    );
};

export default PageNotFound;