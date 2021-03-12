import state from '@/store/state'
import { State } from '@/store/state'
import Action from '@/store/model/Action'

export default (prevState = state, actions: Action): State => {
  let { type, payload } = actions
  let data: State = {}
  switch (type) {
    case 'CHANGE_NOW_DB':
      prevState.nowUsedConnectId = payload
      Object.assign(data, prevState)
      return data
    case 'CHANGE_NOW_TYPE':
      prevState.nowType = payload
      Object.assign(data, prevState)
      return data
  }
  let da: State = {}
  return da
}
