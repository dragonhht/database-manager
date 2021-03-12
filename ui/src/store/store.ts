import { createStore, compose, applyMiddleware } from 'redux'
import reducer from '@/store/reducer'
import thunk from 'redux-thunk'

let Store = createStore(reducer, compose(applyMiddleware(...[thunk])))
export default Store