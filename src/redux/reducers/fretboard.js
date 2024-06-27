import {
  ADD_FRETBOARD,
  UPDATE_FRETBOARD_PROPERTY
} from "../actionTypes";
import { newFretboard } from '../actions';

const updateNestedObject = (object, path, value) => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const nestedObject = keys.reduce((obj, key) => {
    if (!obj[key]) {
      obj[key] = {};
    }
    return obj[key];
  }, object);
  nestedObject[lastKey] = value;
  return { ...object };
};

const initialState = {
  components: [
    newFretboard(6, 22, [4, 7, 2, 9, 11, 4], [4, 3, 3, 3, 2, 2], "/", 'scale'),
    newFretboard(6, 22, [4, 7, 2, 9, 11, 4], [4, 3, 3, 3, 2, 2], "/compose", 'chord'),
    newFretboard(6, 22, [4, 7, 2, 9, 11, 4], [4, 3, 3, 3, 2, 2], "/learn", 'chord'),
    newFretboard(6, 22, [4, 7, 2, 9, 11, 4], [4, 3, 3, 3, 2, 2], "/circle"),
  ]
};

const fretboard = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FRETBOARD_PROPERTY: {
      const { fretboardId, propertyPath, value } = action.payload;

      const keys = propertyPath.split('.');

      if (keys.length === 1) {
        return {
          ...state,
          components: state.components.map((fretboard) =>
            fretboard.id === fretboardId
              ? { ...fretboard, [propertyPath]: value }
              : fretboard
          ),
        };
      } else {
        return {
          ...state,
          components: state.components.map((fretboard) =>
            fretboard.id === fretboardId
              ? updateNestedObject(fretboard, propertyPath, value)
              : fretboard
          ),
        };
      }
    }
    default: {
      return state;
    }
  }
};

export default fretboard;