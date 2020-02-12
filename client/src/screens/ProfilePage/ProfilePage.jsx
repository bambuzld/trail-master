import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import { Editor, EditorModes } from 'react-map-gl-draw';

const MODES = [
  { id: EditorModes.EDITING, text: 'Select and Edit Feature' },
  { id: EditorModes.DRAW_POINT, text: 'Draw Point' },
  { id: EditorModes.DRAW_PATH, text: 'Draw Polyline' },
  { id: EditorModes.DRAW_POLYGON, text: 'Draw Polygon' },
  { id: EditorModes.DRAW_RECTANGLE, text: 'Draw Rectangle' }
];

const DEFAULT_VIEWPORT = {
  width: 800,
  height: 600,
  longitude: -122.45,
  latitude: 37.78,
  zoom: 14
};

export default class App extends Component {
  state = {
    // map
    viewport: DEFAULT_VIEWPORT,
    // editor
    selectedMode: EditorModes.READ_ONLY
  };

  _switchMode = evt => {
    const selectedMode = evt.target.id;
    this.setState({
      selectedMode:
        selectedMode === this.state.selectedMode ? null : selectedMode
    });
  };

  _renderToolbar = () => {
    return (
      <div
        style={{ position: 'absolute', top: 0, right: 0, maxWidth: '320px' }}
      >
        <select onChange={this._switchMode}>
          <option value="">--Please choose a mode--</option>
          {MODES.map(mode => (
            <option value={mode.id}>{mode.text}</option>
          ))}
        </select>
      </div>
    );
  };

  render() {
    const { viewport, selectedMode } = this.state;
    return (
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        {...viewport}
        width="100%"
        height="100%"
        mapStyle={'mapbox://styles/mapbox/light-v9'}
        onViewportChange={() => this.setState({ viewport })}
      >
        <Editor clickRadius={12} mode={selectedMode} />
        {this._renderToolbar()}
      </ReactMapGL>
    );
  }
}
