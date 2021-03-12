import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { verifyAuth } from '../../features/auth/authAction';
import rootReducer from './rootReducer';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export function configureStore() {
  const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)));
  store.dispatch(verifyAuth());
  return store;
}
