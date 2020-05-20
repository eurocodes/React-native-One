import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-community/async-storage'

import {addContact} from './actions'
import reducer from './reducer'


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, reducer)
/*
const thunk = store => next => action => {
    if (typeof action === 'function') {
        action(store.dispatch);
    } else {
        next(action);
    }
}
*/

const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store)

// store.dispatch(addContact({name: 'Ugochukwu E', phone: '1234567890'}))
// store.dispatch(addContact({name: 'Ugochukwu E', phone: '1234567890'}))
// store.dispatch(addContact({name: 'Ifeanyi M', phone: '5050505050'}))

export {store, persistor}