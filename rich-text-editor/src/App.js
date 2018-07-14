import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Editor, EditorState } from 'draft-js';

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
        <Editor
          editorState={this.state.editorState}
          placeholder="Tell a story..."
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default App;
