import { 
    SET_PROGRESSION
} from "../actionTypes";

const initialState = {
    chordProgression: []
};

const partitions = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROGRESSION: {
        return {
            ...state,
            progression: action.payload.progression
        };
    }
    default: {
      return state;
    }
  }
};

export default partitions;