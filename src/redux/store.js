import rootReducer from "./reducers/index";
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware()
  ));