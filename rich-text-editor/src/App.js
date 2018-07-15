// @flow
import * as React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Editor, EditorState } from "draft-js";

type Props = {};
type State = {
  editorState: EditorState
};
class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }

  onChange(editorState: EditorState): void {
    this.setState({ editorState });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="App-editor">
          <Editor
            editorState={this.state.editorState}
            placeholder="Tell a story..."
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
