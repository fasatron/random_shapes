import { ADD_SHAPE, REMOVE_SHAPE } from '../constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SHAPE:
      return [...state, action.shape];

    case REMOVE_SHAPE:
      return state.filter(shape => shape !== action.shape);

    default:
      return state;
  }
};
