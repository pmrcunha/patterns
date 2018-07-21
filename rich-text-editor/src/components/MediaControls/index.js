import React from "react";
import PropTypes from "prop-types";

const MediaControls = ({ addImage, addAudio, addVideo }) => (
  <div>
    <button onMouseDown={addImage}>Insert image</button>
    <button onMouseDown={addAudio}>Insert audio</button>
    <button onMouseDown={addVideo}>Insert video</button>
  </div>
);

MediaControls.propTypes = {
  addImage: PropTypes.func.isRequired,
  addAudio: PropTypes.func.isRequired,
  addVideo: PropTypes.func.isRequired
};

export default MediaControls;
