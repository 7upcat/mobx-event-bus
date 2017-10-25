# mobx-event-bus

Tiny library allows publish-subscribe-style communication between components without requiring the components to explicitly register with one another.

## Installation 

`npm install mobx-event-bus --save`

## Usage

### Basic

```javascript
import { eventBus, subscribe } from 'mobx-event-bus'

class DemoStore {
  constructor () {
    // Registers subscriber the receive events
    eventBus.register(this)
  }

  // Mark listener1 as a event subscriber handle all 'topic1' events
  @subscribe('topic1')
  lisener1 (event) {
    console.log(`listener1: Hello ${event.payload}`)
  }

  // Mark listener2 as a event subscriber handle 'topic1' events payload match 'Martin'
  @subscribe('topic1', event => event.payload === 'Martin')
  listener2 (event) {
    console.log(`listener2: Hello ${event.payload}`)
  }
}

export const demoStore = new DemoStore()

// post event with topic 'topic1' and payload 'Tommy' 
eventBus.post('topic1', 'Tommy')

// post event with topic 'topic1' and payload 'Martin' 
eventBus.post('topic1', 'Martin')

```

### Integration with react-router

#### `RouterStore.js`

```javascript
import { createBrowserHistory } from 'history'
import { eventBus } from 'mobx-event-bus'

export default class RouterStore {
  constructor () {
    // 监听路由变化触发事件调用 listener
    this.history.listen((location, action) => {
      eventBus.post('router', { ...location})
    })
  }
   
  history = createBrowserHistory()
}
```

#### `DomainStore.js`

```javascript
import { eventBus, subscribe } from 'mobx-event-bus'

export default class DomainStore {
  constructor () {
    eventBus.register(this)
  }
  
  @subscribe('router', {payload}=> payload.pathname === '/')
  setup( event ) {
    // init data
  }
}
```

## API Documents

### eventBus

Usage:
 - register( storeInstance )
 - post( topic, payload )

### subscribe

Usage:
 - @subscribe (topic, selector) classMethod () {}



