import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerMiddleware, push } from 'react-router-redux';
import persistState from 'redux-localstorage';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import allActions from './actions';

export default function configureStore(initialState, routerHistory) {
  const router = routerMiddleware(routerHistory);

  const actionCreators = {
    ...allActions,
    routing: push
  };

  const middlewares = [ thunk, router ];

  const composeEnhancers = (() => {
    const compose_ = window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if(process.env.NODE_ENV === 'development' && compose_) {
      return compose_({ actionCreators });
    }
    return compose;
  })();

  const enhancer = composeEnhancers(applyMiddleware(...middlewares), persistState());

  return createStore(rootReducer, initialState, enhancer);
}
