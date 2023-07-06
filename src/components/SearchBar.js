import React, { useRef, useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { Button, Form } from "react-bootstrap";

import styles from '../styles/SearchBar.module.css';

function SearchBar({ query, setQuery }) {
    
    const [taskCategories, setTaskCategories] = useState([{'id': '', 'title': ''}]);
    // Fetch categories from the API
    // useEffect(() => {
    //     const fetchTaskCategories = async () => {
    //     try {
    //         const response = await axiosReq.get('/categories/');
    //         setTaskCategories(response.data.results);
    //     } catch (error) {
    //         console.error('Error fetching categories:', error);
    //         }
    //     };
    //     fetchTaskCategories();
    // }, []);
    
    // const getCategoryOptions = () => {
    //     return taskCategories.map((category) => ({
    //     key: category.id,
    //     value: category.id,
    //     label: category.title,
    //     }));
    // };

    const formRef = useRef(null);
    const clearForm = () => {
        formRef.current.reset();
        setQuery("");
    };

  return (
    <Form
      ref={formRef}
      className={styles.SearchBar}
      onSubmit={(event) => event.preventDefault()}
    >
        <Form.Control
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="text"
          className="me-sm-2"
          placeholder="Search tasks"
          aria-label="Search Bar"
        />

        {/* Task Status */}
        <Form.Control
            as="select"
            name="task_status"
            onChange={(event) => setQuery(event.target.value)}
            aria-label="task status"
        >
            <option value="">Select task status</option>
            <option key="BACKLOG" value="BACKLOG">Backlog</option>
            <option key="TODO" value="TODO">To Do</option>
            <option key="INPROGRESS" value="INPROGRESS">In Progress</option>
            <option key="COMPLETED" value="COMPLETED">Completed</option>
        </Form.Control>

        {/* Task Priority */}
        <Form.Control
            as="select"
            name="priority"
            onChange={(event) => setQuery(event.target.value)}
            aria-label="task priority"
        >
            <option value="">Select task priority</option>
            <option key="PRIORITY1" value="PRIORITY1">Priority 1</option>
            <option key="PRIORITY2" value="PRIORITY2">Priority 2</option>
            <option key="PRIORITY3" value="PRIORITY3">Priority 3</option>
        </Form.Control>

        {/* Category */}
        {/* <Form.Control
          as="select"
          name="category"
        //   value={category}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="task category"
        >
          <option value="">Select task category</option>
          {getCategoryOptions().map((option) => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </Form.Control> */}

        {/* Clear filters */}
        <Button type="button" onClick={clearForm}>
          Clear filters
        </Button>
    </Form>
  );
}

export default SearchBar;
