import * as types from './actionsType';

export function adminAuth(email, password) {
  return async (dispatch) => {
    try {
      const response = await fetch('/api/auth/adminLogin', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json();

      if (data.message) {
        dispatch(authError(data.message));
        return;
      }

      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('expirationDate', expirationDate.toString());

      dispatch(adminAuthSuccess(data.token));
      dispatch(autoLogout(data.expiresIn));
    } catch (e) {

    }
  }
}
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: types.auth.AUTH_LOGOUT,
  }
}
export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000)
  }
}
export function adminAuthSuccess(token) {
  return {
    type: types.auth.AUTH_SUCCESS,
    token,
  }
}
export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(adminAuthSuccess(token));
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  }
}
export function authError(message) {
  return {
    type: types.auth.AUTH_ERROR,
    message: message
  }
}
