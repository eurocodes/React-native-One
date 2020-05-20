import { login } from '../api';

// action types
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_CONTACT = 'UPDATE_CONTACT'
export const LOGIN_SENT = 'LOGIN_SENT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_REJECTED = 'LOGIN_REJECTED'

// action creators
export const updateUser = update => ({
  type: UPDATE_USER,
  payload: update,
})

export const addContact = newContact => ({
  type: UPDATE_CONTACT,
  payload: newContact,
})

// async action creators
export const loginUser = (username, password) => async dispatch => {
  dispatch({ type: LOGIN_SENT })
  try {
    const token = await login(username, password)
    dispatch({ type: LOGIN_SUCCESS, payload: token })
  } catch (err) {
    dispatch({ type: LOGIN_REJECTED, payload: err.message })
  }
}