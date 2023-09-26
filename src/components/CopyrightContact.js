// React library
import React from "react";

// react-router-dom components for page navigation
import { Link } from "react-router-dom";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Styles
import styles from "../styles/CopyrightContact.module.css";

const CopyRightContact = () => {

    // Get current year
    const currentYear = new Date().getFullYear();

    return (
        <Container>
            <Row className="mt-2 align-items-center">
                <Col>
                    <p className={styles.Copyright}>
                        <span>
                            &copy; {currentYear} | Jean de Villiers
                        </span>
                    </p>
                </Col>
                <Col>
                    <p className={styles.Contact}>
                        <Link to={{ pathname: "https://github.com/PhantomPWR"}} target="_blank">
                            <i className="fa fa-github"></i>
                        </Link>
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default CopyRightContact;