// React library
import React from "react";

// Bootstrap components
import Spinner from "react-bootstrap/Spinner";

// Styles
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Asset;