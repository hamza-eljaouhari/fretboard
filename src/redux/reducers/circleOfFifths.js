import { TOGGLE_NOTE, SET_FILTER } from "../actionTypes";

const initialState = {
};

const circleOfFifths = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
};

export default circleOfFifths;