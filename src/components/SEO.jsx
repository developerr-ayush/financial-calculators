import { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

const SEO = ({ title, description, keywords }) => {
  const location = useLocation();

  useEffect(() => {
    // Update meta tags
    document.title = `${title} | Financial Calculators`;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords;

    // Track pageview with enhanced parameters
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_title: title,
        page_location: window.location.href,
        page_path: location.pathname,
      });
    }
  }, [title, description, keywords, location]);

  return null;
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
};

export default SEO;
