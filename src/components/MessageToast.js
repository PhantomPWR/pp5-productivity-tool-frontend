// React library & hooks
import React, { useEffect, useRef } from "react";

// Bootstrap components
import Toast from "react-bootstrap/Toast";

// Styles
import styles from "../styles/MessageToast.module.css";

function MessageToast({ message, type, setSuccessMessage }) {
    const toastTimeout = useRef(null);

    useEffect(() => {
        // Clear the timeout when the component unmounts
        return () => {
            clearTimeout(toastTimeout.current);
        };
    }, []);

  // Handle the toast close event and remove the toast message
    const handleToastClose = () => {
        setSuccessMessage("");
    };

  // Set the delay and autohide for the toast
    const toastDelay = 2000;
    const autohide = true;

  // Update the toast message when the message prop changes
    useEffect(() => {
        clearTimeout(toastTimeout.current);
        toastTimeout.current = setTimeout(() => {
            setSuccessMessage("");
        }, toastDelay);
    }, [message, setSuccessMessage]);

    return (
        <Toast
        className={`${styles.Toast} ${styles[type]}`}
        show={Boolean(message)}
        onClose={handleToastClose}
        delay={toastDelay}
        autohide={autohide}
        >
            <Toast.Header className={styles.ToastHeader}>{type}</Toast.Header>
            <Toast.Body className={styles.ToastBody}>{message}</Toast.Body>
        </Toast>
    );
}

export default MessageToast;
