import { combineReducers } from 'redux';
import CommentReducer from './comments';


const rootReducer = combineReducers({
  comments: CommentReducer
});

export default rootReducer;
