import { 

  } from "../actionTypes";

import guitar from '../../config/guitar'

const initialState = {
    tabs: [

    ]
};

const fretboard = (state = initialState, action) => {
  switch (action.type) {
    case FILL_FRETBOARD: {
        return {
            ...state,
            fretboard: action.payload.fretboard
        };
    }
    default: {
      return state;
    }
  }
};

export default fretboard;