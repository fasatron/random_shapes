import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import shapesReducer from './shapes';

export default combineReducers({
  router: routerReducer,
  shapes: shapesReducer
});
