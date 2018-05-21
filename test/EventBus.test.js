import {eventBus,subscribe} from '../lib'
import TestStore from './TestStore'

test('test post message to subscriber.', () => {
  const testStore = new TestStore()
  eventBus.post('topic1', 'payload1')
  expect(testStore.payload).toEqual('payload1')
  eventBus.post('topic2', 'payload2')
  expect(testStore.payload).toEqual('payload1')
})