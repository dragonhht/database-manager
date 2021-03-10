import State from '@/store/state'
import Action from '@/store/model/Action'

export default (prevState = State, actions: Action) => {
  let newData = prevState
  let { type, payload } = actions
  switch (type) {
    case 'CHANGE_NOW_DB':
      newData.nowUsedConnectId = payload
      break
    case 'CHANGE_NOW_TYPE':
      newData.nowType = payload
      break
  }

  return newData
}
