import React from "react";
import PropTypes from "prop-types";

import "./MediaComponent.css";

const MediaComponent = ({ block, contentState }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, alt } = entity.getData();
  const type = entity.getType();
  switch (type) {
    case "image":
      return <img src={src} alt={alt} className="MediaComponent-media" />;
    case "audio":
      return (
        <audio controls className="MediaComponent-media">
          <source src={src} type="audio/mp3" />
          <track kind="captions" />
        </audio>
      );
    case "video":
      return (
        <video controls className="MediaComponent-media">
          <source src={src} type="video/mp4" />
          <track kind="captions" />
        </video>
      );
    default:
      return undefined;
  }
};

/* eslint-disable react/forbid-prop-types */
MediaComponent.propTypes = {
  block: PropTypes.object.isRequired,
  contentState: PropTypes.object.isRequired
};

export default MediaComponent;
