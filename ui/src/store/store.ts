import { createStore } from 'redux'
import reducer from '@/store/reducer'

let Store = createStore(reducer)
export default Store