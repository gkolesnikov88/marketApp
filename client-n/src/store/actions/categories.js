import * as types from "./actionsType";
import {fetchGoods} from "./good";

export function fetchCategories() {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());

    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      const categories = data.map((item, index) => {
        return {...item, id: index + 1}
      })
      dispatch(fetchCategoriesSuccess(categories));
    } catch (e) {

    }
  }
}
export function fetchCategoriesStart() {
  return {
    type: types.categories.FETCH_CATEGORIES_START
  }
}
export function fetchCategoriesSuccess(categories) {
  return {
    type: types.categories.FETCH_CATEGORIES_SUCCESS,
    newCategories: categories
  }
}

export function deleteCategoryById(categoryId) {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
      });
      // const data = await response.json();

      dispatch(fetchCategories());

    } catch (e) {

    }
  }
}

export function createCategory(newCategory) {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify(newCategory),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json();

      dispatch(fetchCategories());

    } catch (e) {

    }
  }
}
