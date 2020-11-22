import * as types from "./actionsType";

export function fetchCategories() {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());

    try {
      const response = await fetch('/api/categories');
      const categories = await response.json();
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
      await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
      });

      dispatch(fetchCategories());

    } catch (e) {

    }
  }
}

export function createCategory(newCategory) {
  return async (dispatch) => {
    try {
      await fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify(newCategory),
        headers: {'Content-Type': 'application/json'}
      });

      dispatch(fetchCategories());

    } catch (e) {

    }
  }
}
