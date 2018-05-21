import {eventBus,subscribe} from '../lib'

export default class TestStore {

  payload = undefined

  constructor () {
    eventBus.register(this)
  }

  @subscribe('topic1')
  lisener1 (event) {
    this.payload = event.payload
  }
}