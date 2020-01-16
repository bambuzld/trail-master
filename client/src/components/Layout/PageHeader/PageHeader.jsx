import React from "react";
import PropTypes from "prop-types";
// import Svg from 'erpcomponents/Svg';
// import Button from 'erpcomponents/Button';
import "./PageHeader.scss";

const PageHeader = ({
  title,
  subtitle,
  children,
  className,
  backButtonLink
}) => {
  return (
    <header className={`page-header ${className || ""}`}>
      {backButtonLink && (
        <div className="page-header__back">
          {/* <Button
                        className="page-header__back-button"
                        label=""
                        iconName="arrowLeft"
                        href={backButtonLink}
                    /> */}
          button back
        </div>
      )}

      {(title || subtitle) && (
        <div className="page-header__content">
          {title && <h1 className="page-header__title">{title}</h1>}
          {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
        </div>
      )}

      {children && (
        <div className="page-header__actions">
          <span className="page-header__actions-dots">
            {/* <Svg icon="action" /> */}Logo
          </span>
          <div className="page-header__actions-items">{children}</div>
        </div>
      )}
    </header>
  );
};

PageHeader.defaultProps = {
  title: null,
  subtitle: null,
  children: null,
  className: "",
  backButtonLink: null
};

PageHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  subtitle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  backButtonLink: PropTypes.string
};

export default PageHeader;
