import { 
    SET_PROGRESSION,
    SET_PROGRESSION_KEY
} from "../actionTypes";

const initialState = {
    progression: [],
    key: ''
};

const partitions = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROGRESSION: {
        return {
            ...state,
            progression: action.payload.progression
        };
    }
    case SET_PROGRESSION_KEY: {
      return {
          ...state,
          key: action.payload.key
      };
  }
    default: {
      return state;
    }
  }
};

export default partitions;