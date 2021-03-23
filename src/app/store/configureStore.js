import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import { verifyAuth } from '../../features/auth/authAction';
import rootReducer from './rootReducer';

export const history = createBrowserHistory();

export function configureStore() {
  const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)));
  store.dispatch(verifyAuth());
  return store;
}
