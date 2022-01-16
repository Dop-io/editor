import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';
import renderCanvasGIF from '../utils/mint';

class Mint extends React.Component {
  mint() {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    if (!id) {
      return;
    }
    const type = 'single';
    const {
      frames,
      activeFrame,
      columns,
      rows,
      cellSize,
      duration
    } = this.props;
    renderCanvasGIF({
      type,
      frames,
      activeFrame,
      columns,
      rows,
      cellSize,
      duration
    });
  }

  render() {
    return (
      <button
        type="button"
        className="app__next-button"
        onClick={() => this.mint()}
      >
        Next
      </button>
    );
  }
}

const mapStateToProps = state => {
  const frames = state.present.get('frames');
  const activeFrameIndex = frames.get('activeIndex');
  return {
    frames: frames.get('list'),
    activeFrameIndex,
    activeFrame: frames.getIn(['list', activeFrameIndex]),
    paletteGridData: state.present.getIn(['palette', 'grid']),
    columns: frames.get('columns'),
    rows: frames.get('rows'),
    cellSize: state.present.get('cellSize'),
    duration: state.present.get('duration')
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const MintContainer = connect(mapStateToProps, mapDispatchToProps)(Mint);
export default MintContainer;
