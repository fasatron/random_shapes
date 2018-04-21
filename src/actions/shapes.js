import { ADD_SHAPE, REMOVE_SHAPE } from '../constants';

export const addShape = shape => ({ type: ADD_SHAPE, shape });
export const removeShape = shape => ({ type: REMOVE_SHAPE, shape });
