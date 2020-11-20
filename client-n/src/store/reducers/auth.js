import * as types from "../actions/actionsType";

const initialState = {
  token: null,
  errorMessage: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.auth.AUTH_SUCCESS:
      return {
        ...state, token: action.token, errorMessage: null
      }
    case types.auth.AUTH_LOGOUT:
      return {
        ...state, token: null
      }
    case types.auth.AUTH_ERROR:
      return {
        ...state, errorMessage: action.message
      }
    default:
      return state
  }
}
