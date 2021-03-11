import { combineReducers } from 'redux';
import { modalReducer } from '../common/modal/modalReducer';
import { themeReducer } from './themeReducer';

const rootReducer = combineReducers({
  theme: themeReducer,
  modal: modalReducer,
});

export default rootReducer;
