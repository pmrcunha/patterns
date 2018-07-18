import React from "react";
import PropTypes from "prop-types";

import StyleButton from "../StyleButton";

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

const InlineStyleControls = ({ onToggle, editorState }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div>
      {INLINE_STYLES.map(({ label, style }) => (
        <StyleButton
          key={label}
          label={label}
          style={style}
          onToggle={onToggle}
          active={currentStyle.has(style)}
        />
      ))}
    </div>
  );
};

InlineStyleControls.propTypes = {
  onToggle: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  editorState: PropTypes.object.isRequired
};

export default InlineStyleControls;
