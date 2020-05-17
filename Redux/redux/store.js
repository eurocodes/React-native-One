import {createStore} from 'redux'

import {addContact} from './actions'
import reducer from './reducer'

const store = createStore(reducer)

/*
store.dispatch(updateUser({foo: 'foo'}))
store.dispatch(updateUser({bar: 'bar'}))
store.dispatch(updateUser({foo: 'baz'}))
*/

store.dispatch(addContact({name: 'Ugochukwu E', phone: '1234567890'}))
store.dispatch(addContact({name: 'Ugochukwu E', phone: '1234567890'}))
store.dispatch(addContact({name: 'Ifeanyi M', phone: '5050505050'}))

console.log(store.getState())

export default store
