import { UPDATE_CURRENT_COURSE } from './actions';

export function updateCurrentCourse(course) {
  return { type: UPDATE_CURRENT_COURSE, course };
}
