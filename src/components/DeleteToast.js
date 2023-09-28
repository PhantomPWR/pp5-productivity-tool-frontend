// React library & hooks
import React from "react";

// Bootstrap components
import Toast from "react-bootstrap/Toast";

// Styles
import styles from "../styles/MessageToast.module.css";

function MessageToast({ message, type, setSuccessMessage }) {
    return (
        <Toast className={`${styles.Toast} ${styles[type]}`} show={true} onClose={() => setSuccessMessage('')} delay={3000} autohide>
            <Toast.Header className={styles.ToastHeader}>
                {type}
            </Toast.Header>
            <Toast.Body className={styles.ToastBody}>{message}</Toast.Body>
        </Toast>
    );
}

export default MessageToast;
