import { combineReducers } from 'redux'

import { UPDATE_USER, UPDATE_CONTACT, LOGIN_SENT, LOGIN_SUCCESS, LOGIN_REJECTED } from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const contactReducer = (state = [], action) => {
  if (action.type === UPDATE_CONTACT) return [...state, action.payload]
  return state
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return merge(state, action.payload)
    case UPDATE_CONTACT:
      return merge(state, { prevContact: action.payload })
    case LOGIN_SUCCESS:
      return merge(state, { token: action.payload })
    case LOGIN_REJECTED:
      return merge(state, { loginErr: action.payload })
    default:
      return state
  }
}

const reducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
})

export default reducer
