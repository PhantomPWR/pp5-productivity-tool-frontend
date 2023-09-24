// React library & hooks
import React, { useEffect, useRef, useState } from "react";

// Axios library for HTTP requests
import { axiosReq } from "../api/axiosDefaults";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Styles
import appStyles from "../App.module.css";
import styles from '../styles/SearchBar.module.css';


function SearchBar({ query, setQuery, taskCount }) {

    // Set up task category choices state variable & setter
    const [
      taskCategoryChoices,
      setTaskCategoryChoices
    ] = useState([{'value': '', 'label': ''}]);

    // Fetch task category choices from the API
    useEffect(() => {
      const fetchTaskCategoryChoices = async () => {
        try {
          const response = await axiosReq.get('/category-choices/');
          const categoryChoices = response.data.map(category => ({
            key: category.id,
            value: category.value,
            label: category.label
          }));
          setTaskCategoryChoices(categoryChoices);
        } catch (error) {
          console.error('Error fetching category options:', error);
        }
      };
      
      fetchTaskCategoryChoices();
    }, []);

    // Set up form ref
    const formRef = useRef(null);
    const clearForm = () => {
        formRef.current.reset();
        setQuery('');
    };

  return (
    <Form
      ref={formRef}
      className={styles.SearchBar}
      onSubmit={(event) => event.preventDefault()}
    >
      {/* Search bar & result count */}
      <Container className={`mb-3 ${styles.SearchWrap}`}>
        <Row className="row row-cols-2 d-flex justify-content-between align-items-center mb-2">
          <Col className="col-8 col-lg-10">
            <i className={`fas fa-search ${styles.SearchIcon}`} />
            <Form.Control
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              className='me-sm-2'
              placeholder="Search tasks..."
              aria-label="Search Bar"
            />
          </Col> {/* /col */}
          <div className={`col-4 col-lg-2 fs-5 ps-0 ${styles.Results}`}>
            <p className="m-0 text-center d-flex align-items-center justify-content-center">
              <span className={`fs-6 ${styles.ResultCount}`}><i className="fa-solid fa-hashtag"></i></span>
              <span className={`${appStyles.TextBold} ${appStyles.TextOrange}`}>{taskCount}</span>
            </p>
          </div> {/* /col */}
        </Row> {/* /row */}
      </Container>

      {/* Filter buttons */}
      <div className={`row row-cols-2 row-cols-lg-4 mb-3 pb-3 justify-content-even g-3 ${appStyles.UnderlineOrange}`}>
        {/* Task Category */}
        <Col>
          <Form.Control
            className={`form-select ${styles.Select}`}
            as="select"
            name="task_category"
            onChange={(event) => setQuery(event.target.value)}
            aria-label="task category"
          >
            <option value="">Select category</option>
            {taskCategoryChoices.map((categoryChoice) => (
              <option 
                key={categoryChoice.value} 
                value={categoryChoice.label}>
                  {categoryChoice.label}
              </option>
            ))}
          </Form.Control>
        </Col> {/* /col */}
        {/* Task Status */}
        <Col>
          <Form.Control
            className={`form-select ${styles.Select}`}
            as="select"
            name="task_status"
            onChange={(event) => setQuery(event.target.value)}
            aria-label="task status"
          >
            <option value="">Select status</option>
            <option key="BACKLOG" value="BACKLOG">Backlog</option>
            <option key="TODO" value="TODO">To Do</option>
            <option key="INPROGRESS" value="INPROGRESS">In Progress</option>
            <option key="COMPLETED" value="COMPLETED">Completed</option>
          </Form.Control>
        </Col> {/* /col */}

        {/* Task Priority */}
        <Col>
          <Form.Control
            className={`form-select ${styles.Select}`}
            as="select"
            name="priority"
            onChange={(event) => setQuery(event.target.value)}
            aria-label="task priority"
          >
            <option value="">Select priority</option>
            <option key="PRIORITY1" value="PRIORITY1">High</option>
            <option key="PRIORITY2" value="PRIORITY2">Medium</option>
            <option key="PRIORITY3" value="PRIORITY3">Low</option>
          </Form.Control>
        </Col> {/* /col */}
        {/* Clear filters */}
        <Col className="text-end">
          <Button className={`${styles.OrangeOutline} btn-sm`} type="button" onClick={clearForm}>
            Clear filters
          </Button>
        </Col> {/* /col */}
      </div> {/* /row */}
    </Form>
  );
}

export default SearchBar;
