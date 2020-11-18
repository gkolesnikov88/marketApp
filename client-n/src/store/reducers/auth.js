import * as types from "../actions/actionsType";

const initialState = {
  token: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.auth.AUTH_SUCCESS:
      return {
        ...state, token: action.token
      }
    case types.auth.AUTH_LOGOUT:
      return {
        ...state, token: null
      }
    default:
      return state
  }
}
