import { 
    SET_CHORD_PROGRESSION
} from "../actionTypes";

const initialState = {
    chordProgression: []
};

const partitions = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHORD_PROGRESSION: {
        return {
            ...state,
            chordProgression: action.payload.chordProgression
        };
    }
    default: {
      return state;
    }
  }
};

export default partitions;