// React library & hooks
import React from "react";

// react-router-dom components for page navigation
import { useHistory } from "react-router-dom";

// Axios library for HTTP requests
import { axiosRes } from "../../api/axiosDefaults";

// Reusable components
import { MoreDropdown } from "../../components/MoreDropdown";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

// Styles
import appStyles from "../../App.module.css";
import styles from "../../styles/Category.module.css";


const Category = (props) => {

  // State variables
  const history = useHistory();

  // Destructure categoryData
  const {
    id,
    title,
    description
  } = props;

  // Handle edit
  const handleEdit = () => {
    history.push(`/categories/${id}/edit`);
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/categories/${id}/`);

      // Get the updated categories list by filtering out the deleted category
      const updatedCategories = {
        ...props.categories,
        results: props.categories.results.filter((category) => category.id !== id),
      };

      // Update the categories list in the CategoryList component
      props.setCategories(updatedCategories);

      history.push(`/categories/`);
    } catch (err) {}
  };


  return (
    <Card className={styles.Category}>
      <Card.Body className={styles.CategoryBody}>
        <Row>
          {/* Category Title */}
            <Card.Title
              className={`fs-4 ${styles.CategoryTitle} ${appStyles.UnderlineOrange}`}
            >
              {title}
              {/* MoreDropdown */}
              <div className={styles.MoreDropdown}>
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </div>
            </Card.Title>
        </Row>
        {/* Category Description */}
        <div className={`mt-3 ${styles.CategoryBody}`}>
          <p>{description}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Category;