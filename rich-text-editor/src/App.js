// @flow
import * as React from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  AtomicBlockUtils
} from "draft-js";
import "draft-js/dist/Draft.css";
import logo from "./logo.svg";
import "./App.css";

import BlockStyleControls from "./components/BlockStyleControls";
import InlineStyleControls from "./components/InlineStyleControls";
import MediaControls from "./components/MediaControls";
import MediaComponent from "./components/MediaComponent";

function mediaBlockRenderer(contentBlock) {
  const type = contentBlock.getType();
  if (type === "atomic") {
    return {
      component: MediaComponent,
      editable: false
    };
  }
  return undefined;
}

type Props = {};
type State = {
  editorState: EditorState,
  showURLInput: boolean,
  url: string,
  urlType: string
};

class App extends React.Component<Props, State> {
  state = {
    editorState: EditorState.createEmpty(),
    showURLInput: false,
    urlValue: "",
    altValue: "",
    urlType: ""
  };

  onChange: (editorState: EditorState) => void;

  onChange = (editorState: EditorState): void => {
    this.setState({ editorState });
  };

  onTab: (e: SyntheticKeyboardEvent<*>) => void;

  onTab = (e: SyntheticKeyboardEvent<*>) => {
    const maxDepth = 4;
    const newEditorState = RichUtils.onTab(e, this.state.editorState, maxDepth);

    if (newEditorState !== this.state.editorState) {
      this.onChange(newEditorState);
    }
  };

  onURLChange = e => this.setState({ urlValue: e.target.value });

  onAltChange = e => this.setState({ altValue: e.target.value });

  onURLInputKeyDown = e => {
    if (e.which === 13) {
      this.confirmMedia(e);
    }
  };

  onAltInputKeyDown = e => {
    if (e.which === 13) {
      this.altInputComponentRef.focus();
    }
  };

  addImage = () => {
    this.promptForMedia("image");
  };

  addAudio = () => {
    this.promptForMedia("audio");
  };

  addVideo = () => {
    this.promptForMedia("video");
  };

  editorComponentRef: React$ElementRef<Editor>;

  focus: () => void;

  focus = () => this.editorComponentRef.editor.focus();

  mapKeyToEditorCommand = (e: SyntheticKeyboardEvent<*>) => {
    // TODO This function never runs for the tab key
    const isTabKey = e.keyCode === 9;
    const maxDepth = 4;

    if (isTabKey) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        maxDepth
      );

      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return undefined;
    } else {
      return getDefaultKeyBinding(e);
    }
  };

  confirmMedia = e => {
    e.preventDefault();
    const { editorState, urlValue, urlType, altValue } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      urlType,
      "IMMUTABLE",
      { src: urlValue, alt: altValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          " "
        ),
        showURLInput: false,
        urlValue: "",
        altValue: ""
      },
      () => {
        setTimeout(() => this.focus(), 0);
      }
    );
  };

  promptForMedia = type => {
    this.setState(
      {
        showURLInput: true,
        urlValue: "",
        altValue: "",
        urlType: type
      },
      () => {
        setTimeout(() => this.urlInputComponentRef.focus(), 0);
      }
    );
  };

  toggleBlockType: (blockType: string) => void;

  toggleBlockType = (blockType: string) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  };

  toggleInlineStyle: (inlineStyle: string) => void;

  toggleInlineStyle = (inlineStyle: string) => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  handleKeyCommand: (command: string, editorState: EditorState) => string;

  handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  render() {
    const { editorState } = this.state;

    let urlInput;
    if (this.state.showURLInput) {
      urlInput = (
        <div className="App-urlInputContainer">
          <label htmlFor="url-input">URL</label>
          <input
            id="url-input"
            className="App-urlInput"
            onChange={this.onURLChange}
            ref={c => {
              this.urlInputComponentRef = c;
            }}
            type="text"
            value={this.state.urlValue}
            onKeyDown={e => {
              this.onAltInputKeyDown(e);
            }}
          />
          <label htmlFor="alt-input">Alt</label>
          <input
            id="alt-input"
            className="App-urlInput"
            onChange={this.onAltChange}
            type="text"
            ref={c => {
              this.altInputComponentRef = c;
            }}
            value={this.state.altValue}
            onKeyDown={e => this.onURLInputKeyDown(e)}
          />
          <button onMouseDown={this.confirmMedia}>Confirm</button>
        </div>
      );
    }

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
        <MediaControls
          addImage={this.addImage}
          addAudio={this.addAudio}
          addVideo={this.addVideo}
        />
        {urlInput}
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
          tabIndex={0}
        >
          <Editor
            editorState={editorState}
            placeholder="Tell a story..."
            onChange={this.onChange}
            onTab={this.onTab}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            blockRendererFn={mediaBlockRenderer}
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
