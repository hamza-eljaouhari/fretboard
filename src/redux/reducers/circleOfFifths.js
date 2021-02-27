import { TOGGLE_NOTE, SET_FILTER } from "../actionTypes";

import { 
  SET_CIRCLE_OF_FIFTHS_ROTATION,
  SET_DASHED_CIRCLE_ROTATION
} from "../actionTypes";


const initialState = {
  circleOfFifthsRotation: 226,
  dashedCircleRotation: 14
};

const circleOfFifths = (state = initialState, action) => {
  switch (action.type) {
    case SET_CIRCLE_OF_FIFTHS_ROTATION: {
      return action.payload.circleOfFifthsRotation;
    }
    case SET_DASHED_CIRCLE_ROTATION: {
      return action.payload.dashedCircleRotation;
    }
    default: {
      return state;
    }
  }
};

export default circleOfFifths;