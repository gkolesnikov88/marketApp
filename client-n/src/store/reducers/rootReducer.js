import {combineReducers} from 'redux';
import goodReducer from './good';
import categoriesReducer from "./categories";

export default combineReducers({
  good: goodReducer,
  categories: categoriesReducer,
})
