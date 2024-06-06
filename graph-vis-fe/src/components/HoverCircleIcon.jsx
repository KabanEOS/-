import React from "react";
import PropTypes from "prop-types";
import { RiArrowRightWideFill, RiHomeFill } from "react-icons/ri";
import "./../styles/navButton.styles.scss";

const HoverCircleIcon = ({
  icon: Icon,
  icon2: Icon2,
  hoverText,
  onClick,
  showSecondCircle,
  isOpen,
  isHomePage,
  isHovering,
  handleMouseEnter,
  handleMouseLeave,
  toggleDrawer,
}) => {
  return (
    <div className="arrow-always-visible-right-container">
      <div
        className={`toggle-arrow ${isOpen ? "open" : "closed"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      />
      <>
        {showSecondCircle && (
          <>
            <div
              onClick={onClick}
              className={`background-circle 
              ${isOpen ? "open" : "closed"}`}
            >
              {/* <Icon2 /> */}
            </div>
            <RiHomeFill className="second-icon" />
          </>
        )}
        <div
          className={`second-background-circle ${isOpen ? "open" : "closed"}`}
        ></div>
        <RiArrowRightWideFill className="first-icon" />
      </>
    </div>
  );
};

HoverCircleIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
  icon2: PropTypes.elementType,
  hoverText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  showSecondCircle: PropTypes.bool,
  isOpen: PropTypes.bool,
  isHomePage: PropTypes.bool,
  isHovering: PropTypes.bool,
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func,
  toggleDrawer: PropTypes.func,
};

HoverCircleIcon.defaultProps = {
  onClick: () => {},
  showSecondCircle: false,
  isOpen: false,
  isHomePage: false,
  isHovering: false,
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
  toggleDrawer: () => {},
};

export default HoverCircleIcon;
