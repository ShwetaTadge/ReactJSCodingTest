import {createStore, applyMiddleware } from "redux";
import rootReducer  from "../reducers";
import thunk from 'redux-thunk'
import { logger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';


const middlewares = [thunk, logger ];
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));