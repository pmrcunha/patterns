import React from "react";
import PropTypes from "prop-types";

import "./StyleButton.css";

const StyleButton = ({ active, style, label, onToggle }) => (
  <button
    className={`style-button ${active ? "active" : null}`}
    onMouseDown={e => {
      e.preventDefault();
      onToggle(style);
    }}
  >
    {label}
  </button>
);

StyleButton.propTypes = {
  active: PropTypes.bool.isRequired,
  style: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default StyleButton;
