import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import combinedReducers from "../reducers";
import rootSaga from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const middleware = [
    thunk,
    sagaMiddleware
  ];

  const enhancers = [
    applyMiddleware(...middleware)
  ];

  const store = createStore(combinedReducers, compose(...enhancers));
  sagaMiddleware.run(rootSaga, store.dispatch);

  return store;
}
