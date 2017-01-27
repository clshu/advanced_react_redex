import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import messageReducer from './message_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  backend: messageReducer
});

export default rootReducer;
