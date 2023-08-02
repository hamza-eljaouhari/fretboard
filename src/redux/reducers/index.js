import { combineReducers } from "redux";
import fretboard from "./fretboard";
import circleOfFifths from "./circleOfFifths";
import partitions from "./partitions";

export default combineReducers({ fretboard, circleOfFifths, partitions });
