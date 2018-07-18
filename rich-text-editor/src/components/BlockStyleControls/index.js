import React from "react";
import PropTypes from "prop-types";

import StyleButton from "../StyleButton";

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
];

const BlockStyleControls = ({ onToggle, editorState }) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div>
      {BLOCK_TYPES.map(({ label, style }) => (
        <StyleButton
          key={label}
          label={label}
          style={style}
          onToggle={onToggle}
          active={style === blockType}
        />
      ))}
    </div>
  );
};

BlockStyleControls.propTypes = {
  onToggle: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  editorState: PropTypes.object.isRequired
};

export default BlockStyleControls;
