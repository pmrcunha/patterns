import React from "react";
import PropTypes from "prop-types";

const MediaControls = ({ addImage }) => (
  <div>
    <button onMouseDown={addImage}>Insert image</button>
  </div>
);

MediaControls.propTypes = {
  addImage: PropTypes.func.isRequired
};

export default MediaControls;
