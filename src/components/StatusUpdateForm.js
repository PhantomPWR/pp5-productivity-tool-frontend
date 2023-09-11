// React library & hooks
import React, {useState, useEffect} from "react";

// Axios library for HTTP requests
import axios from "axios";

// Bootstrap components
import Form from 'react-bootstrap/Form';

// Styles
import styles from "../styles/StatusUpdateForm.module.css";

const status_choices = {
  BACKLOG: "Backlog",
  TODO: "To Do",
  INPROGRESS: "In Progress",
  COMPLETED: "Completed",
};


const StatusUpdateForm = ({ taskId, currentStatus, onUpdateStatus }) => {
  // Set initial state
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  // Handle status change
  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  // Update status
  useEffect(() => {
    let cancelRequest = false;

    // Submit form
    const submitForm = async () => {
      setLoading(true);
      try {
        // Send PATCH request
        await axios.patch(`/tasks/${taskId}/`, { task_status: newStatus });
        if (!cancelRequest) {
          onUpdateStatus(newStatus);
        }
      } catch (err) {
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    // Check if status has changed
    if (newStatus !== currentStatus && newStatus !== "") {
      submitForm();
    }

    return () => {
      // Cancel request
      cancelRequest = true;
    };
  }, [newStatus, currentStatus, onUpdateStatus, taskId]);

  return (
    <Form>
      <div className="form-group">
        <select className={`form-select ${styles.Select}`} value={newStatus} onChange={handleStatusChange}>
          <option value="">Select status</option>
          {Object.keys(status_choices).map((status) => (
            <option key={status} value={status}>
              {status_choices[status]}
            </option>
          ))}
        </select>
      </div>
    </Form>
  );
};

export default StatusUpdateForm;