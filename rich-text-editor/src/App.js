// @flow
import * as React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Editor, EditorState, RichUtils } from "draft-js";

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

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

type Props = {};
type State = {
  editorState: EditorState
};

class App extends React.Component<Props, State> {
  toggleBlockType: (blockType: string) => void;
  // handleKeyCommand: (command: string, editorState: EditorState) => string;
  toggleInlineStyle: (inlineStyle: string) => void;
  onChange: (editorState: EditorState) => void;
  focus: () => void;

  constructor(props: Props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.focus = () => this.refs.editor.focus();

    // this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState: EditorState): void {
    console.log(this.state.editorState);
    this.setState({ editorState });
  }

  toggleBlockType(blockType: string) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  toggleInlineStyle(inlineStyle: string) {
    const currentStyle = this.state.editorState.getCurrentInlineStyle();
    console.log(currentStyle);
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  // handleKeyCommand(command: string, editorState: EditorState) {
  //   const newState = RichUtils.handleKeyCommand(editorState, command);
  //   if (newState) {
  //     this.onChange(newState);
  //     return "handled";
  //   }
  //   return "not-handled";
  // }

  render() {
    const { editorState } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button
          onMouseDown={e => {
            e.preventDefault();
            this.toggleBlockType("header-one");
          }}
        >
          Title
        </button>
        <button
          onMouseDown={e => {
            e.preventDefault();
            this.toggleBlockType("header-three");
          }}
        >
          Header
        </button>
        <button
          onMouseDown={e => {
            e.preventDefault();
            this.toggleInlineStyle("BOLD");
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={e => {
            e.preventDefault();
            this.toggleInlineStyle("ITALIC");
          }}
        >
          Italic
        </button>
        <button
          onMouseDown={e => {
            e.preventDefault();
            this.toggleInlineStyle("UNDERLINE");
          }}
        >
          Underline
        </button>
        <div className="App-editor" onClick={this.focus}>
          <Editor
            editorState={editorState}
            placeholder="Tell a story..."
            onChange={this.onChange}
            spellCheck={true}
            ref={"editor"}
          />
        </div>
      </div>
    );
  }
}

export default App;
