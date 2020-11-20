import {combineReducers} from 'redux';
import goodReducer from './good';
import categoriesReducer from "./categories";
import authReducer from "./auth";

export default combineReducers({
  good: goodReducer,
  categories: categoriesReducer,
  auth: authReducer,
})
