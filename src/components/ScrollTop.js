// React
import React, { useState, useEffect } from "react";

// Styles
import styles from "../styles/ScrollTop.module.css";

// Scroll to top button
const ScrollTop = () => {
    const [showButton, setShowButton] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 400) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            {showButton && (
                <button
                    className={`btn btn-outline-secondary ${styles.ScrollTop}`}
                    onClick={scrollToTop}
                >
                    <i aria-hidden="true" className="fas fa-arrow-up" />
                    <span className="sr-only">Scroll to top</span>
                </button>
            )}
        </>
    );
};

export default ScrollTop;
