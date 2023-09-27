// React library
import React from "react";

// React-router-dom components for page navigation
import { useHistory } from "react-router";

// Bootstrap components
import Dropdown from "react-bootstrap/Dropdown";

// Styles
import styles from "../styles/MoreDropdown.module.css";


// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i aria-hidden="true"
    className="fas fa-ellipsis-v"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

// Dropdown menu
export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown
      drop="left"
    >
      <Dropdown.Toggle as={ThreeDots} />

      <Dropdown.Menu
        className={`text-center ${styles.DropdownMenu}`}
        popperConfig={{ strategy: "fixed" }}
      >
        <Dropdown.Item
          className={`${styles.DropdownItem} ${styles.Inline}`}
          onClick={handleEdit}
          aria-label="edit"
        >
          <i aria-hidden="true" className="fas fa-edit" />
        </Dropdown.Item>
        <Dropdown.Item
          className={`${styles.DropdownItem} ${styles.Inline} ${styles.Delete}`}
          onClick={handleDelete}
          aria-label="delete"
        >
          <i aria-hidden="true" className="fas fa-trash-alt" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// Profile edit dropdown menu
export const ProfileEditDropdown = ({ id }) => {
  const history = useHistory();
  return (
    <Dropdown
      className={`ms-auto px-3 ${styles.Absolute}`}
      drop="left"
    >
      <Dropdown.Toggle as={ThreeDots} />
      <Dropdown.Menu
        className={styles.DropdownMenu}
      >
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i aria-hidden="true" className="fas fa-edit" />
          edit profile
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i aria-hidden="true" className="far fa-id-card" />
          update username
        </Dropdown.Item>
        <Dropdown.Item
          className={styles.DropdownItem}
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i aria-hidden="true" className="fas fa-key" />
          reset password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};