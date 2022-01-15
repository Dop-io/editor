import { App, Credentials } from 'realm-web';
import * as actionCreators from '../store/actions/actionCreators';
import { initStorage, getDataFromStorage } from './storage';
import { pixelsToDrawing } from './punksApi';

/*
  Initial actions to dispatch:
  1. Hide spinner
  2. Load a project if there is a current one
*/
const initialSetup = (dispatch, storage) => {
  dispatch(actionCreators.hideSpinner());

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');
  if (id) {
    try {
      const app = new App({ id: 'application-0-tonmp' });
      const credentials = Credentials.anonymous();
      app.logIn(credentials).then(() => {
        const mongodb = app.currentUser.mongoClient('mongodb-atlas');
        mongodb
          .db('dopio')
          .collection('assets')
          .find({ id })
          .then(assets => {
            if (assets && assets.length) {
              const { pixels } = assets[0];
              if (pixels && pixels.length) {
                const {
                  frames,
                  paletteGridData,
                  cellSize,
                  columns,
                  rows
                } = pixelsToDrawing(pixels);
                // console.log(rows, columns, frames, paletteGridData);
                dispatch(
                  actionCreators.setDrawing(
                    frames,
                    paletteGridData,
                    cellSize,
                    columns,
                    rows
                  )
                );
              }
            }
          });
      });
    } catch (err) {
      console.error('Failed to log in', err);
    }
    return;
  }

  const dataStored = getDataFromStorage(storage);
  if (dataStored) {
    // Load current project from the storage
    const currentProjectIndex = dataStored.current;
    if (currentProjectIndex >= 0) {
      const {
        frames,
        paletteGridData,
        columns,
        rows,
        cellSize
      } = dataStored.stored[currentProjectIndex];
      // console.log(frames, paletteGridData, columns, rows, cellSize);

      dispatch(
        actionCreators.setDrawing(
          frames,
          paletteGridData,
          cellSize,
          columns,
          rows
        )
      );
    }
  } else {
    // If no data initialize storage
    initStorage(storage);
  }
};

export default initialSetup;
