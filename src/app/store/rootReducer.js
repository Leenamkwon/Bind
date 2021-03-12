import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../async/asyncReducer';
import { modalReducer } from '../common/modal/modalReducer';
import { themeReducer } from './themeReducer';
import profileReducer from '../../features/profile/profileReducer';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    theme: themeReducer,
    modal: modalReducer,
    auth: authReducer,
    async: asyncReducer,
    profile: profileReducer,
  });

export default rootReducer;
