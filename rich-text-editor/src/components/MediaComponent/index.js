import React from "react";
import PropTypes from "prop-types";

const MediaComponent = ({ block, contentState }) => {
  const data = contentState.getEntity(block.getEntityAt(0)).getData();
  return <img src={data.src} alt={data.alt} />;
};

/* eslint-disable react/forbid-prop-types */
MediaComponent.propTypes = {
  block: PropTypes.object.isRequired,
  contentState: PropTypes.object.isRequired
};

export default MediaComponent;
