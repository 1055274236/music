import { Listener } from './type'

class BaseOperation {
  volume = 1

  // constructor() {}

  listenerRun(listenerArr: Listener[]): void {
    listenerArr.forEach((item) => {
      item.fun()
    })
  }

  listenerDelete(listenerArr: Listener[], index: string | (() => unknown)): Listener[] {
    listenerArr = listenerArr.filter((item) => {
      if (typeof index === 'string') {
        return item.id !== index
      } else {
        return item.fun !== index
      }
    })
    return listenerArr
  }
}

export default BaseOperation
