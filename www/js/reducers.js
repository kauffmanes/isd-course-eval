import { UPDATE_CURRENT_COURSE } from './actions';

// default state
const DEFAULT_STATE = {
  course: {}
};

// This controls creating the new state objects
const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_COURSE:
      return { ...state, course: action.course };
    default:
      return state;
  }
};

export default rootReducer;
