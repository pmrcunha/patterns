import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Editor, EditorState } from "draft-js";

const editorStyles = {
  width: "75%",
  margin: "40px auto",
  padding: "20px",
  border: "solid 1px gray",
  "min-height": "600px"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => this.setState({ editorState });
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
        <div style={editorStyles}>
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
