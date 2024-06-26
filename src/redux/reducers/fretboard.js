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
    newFretboard()
  ]
};

const fretboard = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FRETBOARD: {
      return {
        ...state,
        components: [...state.components, action.payload.fretboard]
      };
    }
    case UPDATE_FRETBOARD_PROPERTY:
      const { fretboardIndex, propertyPath, value } = action.payload;

        const keys = propertyPath.split('.');

        if (keys.length === 1) {
          return {
            ...state,
            components: state.components.map((fretboard, index) =>
              index === fretboardIndex
                ? { ...fretboard, [propertyPath]: value }
                : fretboard
            ),
          };
        } else {
          return {
            ...state,
            components: state.components.map((fretboard, index) =>
              index === fretboardIndex
                ? updateNestedObject(fretboard, propertyPath, value)
                : fretboard
            ),
          };
        }
    default: {
      return state;
    }
  }
};

export default fretboard;