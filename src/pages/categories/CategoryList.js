// React library & hooks
import React, { useEffect, useState } from "react";

// Context hooks
import { useCurrentUser } from "../../contexts/CurrentUserContext";

// react-router-dom components for page navigation
import { Link } from "react-router-dom";

// React router components
import { useLocation } from "react-router";

// Axios library for HTTP requests
import { axiosReq } from "../../api/axiosDefaults";

// Utils
import { fetchMoreData } from "../../utils/utils";

// React components
import InfiniteScroll from "react-infinite-scroll-component";

// Reusable components
import Asset from "../../components/Asset";
import Category from "../categories/Category";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Styles
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/CategoryList.module.css";

// Assets
import NoResults from "../../assets/no-results.png";


function CategoryList({ message, filter = "" }) {

  // State variables
  const [categories, setCategories] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();
  const [query] = useState('');

  useEffect(() => {

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const { data } = await axiosReq.get(`/categories/?${filter}&search=${query}`);
          setCategories(data);
          setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    // stop results flashing - fetch after 1s delay
    const timer = setTimeout(() => {
      fetchCategories();
    }, 1000);

    // Cleanup Function 
    return () => {
      clearTimeout(timer);
    };

  }, [filter, query, pathname, currentUser]);

  return (
    <Container>
    <Col lg={6} className="mx-auto">
      <Row className="text-center mt-3 g-0 justify-content-between">
        <Col>
          <h1 className={appStyles.Heading}>Categories</h1>
        </Col>
        <Col className="d-flex justify-content-end me-3">
        <Link
          to="/categories/create"
          className={`${styles.AddCategory} ${btnStyles.Button} ${btnStyles.OrangeOutline} d-inline-flex align-items-center mb-3`}
          aria-label="Add category"
          >
            <i aria-hidden="true" className="fas fa-folder-plus"></i>
            <span>Add</span>
          </Link> 
        </Col>
      </Row>
      </Col>
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2 mx-auto" lg={6}>
          
          {hasLoaded ? (
            <>
              {categories.results.length ? (
                <infiniteScroll
                  children={
                    categories.results.map((category) => (
                      <Category key={category.id} {...category} setCategories={setCategories} categories={categories} />
                    ))
                  }
                  dataLength={categories.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!categories.next}
                  next={() => fetchMoreData(categories, setCategories)}
                />
                
              ) : (
                <Container className={appStyles.Content}>
                  <Asset src={NoResults} message={message} />
                </Container>
              )}
            </>
          ) : (
            <Container className={appStyles.Content}>
              <Asset spinner />
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default CategoryList;