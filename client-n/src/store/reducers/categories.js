import * as types from '../actions/actionsType';

const initialState = {
  newId: 4,
  categoriesList: [
  //   {
  //   id: 1,
  //   name: 'Monitors'
  // },{
  //   id: 2,
  //   name: 'Mouse'
  // }
  ],
  categoriesLoading: false
}

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case types.categories.FETCH_CATEGORIES_START:
      return {
        ...state, categoriesLoading: true
      }
    case types.categories.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state, categoriesLoading: false, categoriesList: action.newCategories
      }
    default:
      return state
  }
}

