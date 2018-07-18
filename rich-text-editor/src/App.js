// @flow
import * as React from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import "draft-js/dist/Draft.css";
import logo from "./logo.svg";
import "./App.css";

import BlockStyleControls from "./components/BlockStyleControls";
import InlineStyleControls from "./components/InlineStyleControls";

type Props = {};
type State = {
  editorState: EditorState
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }

  onChange: (editorState: EditorState) => void;

  onChange = (editorState: EditorState): void => {
    this.setState({ editorState });
  };

  focus: () => void;

  focus = () => this.editorComponentRef.editor.focus();

  mapKeyToEditorCommand = e => {
    const isTabKey = e.keyCode === 9;
    const maxDepth = 4;
    console.log(isTabKey);

    if (isTabKey) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        maxDepth
      );
      console.log(newEditorState !== this.state.editorState);

      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return undefined;
    } else {
      return getDefaultKeyBinding(e);
    }
  };

  toggleBlockType: (blockType: string) => void;

  toggleBlockType = (blockType: string) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle: (inlineStyle: string) => void;

  toggleInlineStyle = (inlineStyle: string) => {
    // const currentStyle = this.state.editorState.getCurrentInlineStyle();
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  handleKeyCommand: (command: string, editorState: EditorState) => string;

  handleKeyCommand(command: string, editorState: EditorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BlockStyleControls
          onToggle={this.toggleBlockType}
          editorState={editorState}
        />
        <InlineStyleControls
          onToggle={this.toggleInlineStyle}
          editorState={editorState}
        />
        <div
          className="App-editor"
          onClick={this.focus}
          onKeyDown={e => {
            if (e.keyCode === 9) {
              e.preventDefault();
            }
          }}
          role="textbox"
          aria-multiline
        >
          <Editor
            editorState={editorState}
            placeholder="Tell a story..."
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            spellCheck
            ref={c => {
              this.editorComponentRef = c;
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
