// React library
import React from "react";

// React-router-dom components for page navigation
import { Link } from "react-router-dom";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';

// Styles
import styles from "../styles/PageNotFound.module.css";


const PageNotFound = () => {
    return (
        <Container fluid className={styles.Main}>
            <div className={`p-5 text-center ${styles.Col}`}>
                <h1 className={`mt-5 mb-3`}>
                    Stuck, are we?
                </h1>
                <h2 className="mb-5">
                    Let's get you back home.
                </h2>
                <Link
                to="/home"
                aria-label='Home'
                >
                    <Button>
                    This way <i aria-hidden="true" className="fas fa-arrow-right ml-2" />
                    </Button>
                </Link>
            </div>
        </Container>
    );
};

export default PageNotFound;