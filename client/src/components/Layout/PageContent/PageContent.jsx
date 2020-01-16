import React from "react";
import PropTypes from "prop-types";
import "./PageContent.scss";

const PageContent = ({ children, className }) => {
  return <div className={`page-content ${className || ""}`}>{children}</div>;
};

PageContent.defaultProps = {
  children: null,
  className: ""
};

PageContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string
};

/**
 * Page Content Columns Component
 */
PageContent.Columns = function Columns({ children }) {
  return <div className="page-content__columns">{children}</div>;
};

PageContent.Columns.defaultProps = {
  children: null
};

PageContent.Columns.propTypes = {
  children: PropTypes.node
};

/**
 * Page Content Column Component
 */
PageContent.Column = function Column({ children }) {
  return <div className="page-content__column">{children}</div>;
};

PageContent.Column.defaultProps = {
  children: null
};

PageContent.Column.propTypes = {
  children: PropTypes.node
};

/**
 * Page Content Row Component
 */
PageContent.Row = function Row({ children }) {
  return <div className="page-content__row">{children}</div>;
};

PageContent.Row.defaultProps = {
  children: null
};

PageContent.Row.propTypes = {
  children: PropTypes.node
};

export default PageContent;
