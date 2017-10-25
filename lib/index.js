import { observable, extendObservable, runInAction, reaction } from 'mobx'

function EventBus () {
  this.metadata = observable({})
  this.register = function (store) {
    const { __subscriberMetadata } = store
    if (__subscriberMetadata) {
      __subscriberMetadata.forEach((s) => {
        if (!this.metadata[s.topic]) {
          const item = {}
          item[s.topic] = { seq: 0 }
          extendObservable(this.metadata, item)
          this.metadata[s.topic].event = {}
        }
        if (this.metadata[s.topic].seq > 0) {
          const { cb, selector } = s
          if (!selector || selector(this.metadata[s.topic])) {
            runInAction(() => cb.apply(store, [this.metadata[s.topic]]))
          }
        }
        reaction(() => (this.metadata[s.topic].seq),
          (seq) => {
            if (seq > 0) {
              const { cb, selector } = s
              if (!selector || selector(this.metadata[s.topic])) {
                runInAction(() => cb.apply(store, [this.metadata[s.topic]]))
              }
            }
          })
      })
    }
  }

  this.post = function (topic, payload) {
    if (topic) {
      if (!this.metadata[topic]) {
        const item = {}
        item[topic] = { seq: 0 }
        extendObservable(this.metadata, item)
      }
      runInAction(() => {
        this.metadata[topic].payload = payload
        this.metadata[topic].seq = this.metadata[topic].seq + 1
      })
    }
  }
}

export const eventBus = new EventBus()

export function subscribe (topic, selector) {
  return function (target, name, descriptor) {
    const cb = descriptor.value
    const sub = { topic, selector, cb }
    if (!target.__subscribers) { target.__subscribers = [] }
    target.__subscribers.push(sub)
    Object.defineProperty(target, '__subscriberMetadata', { value: target.__subscribers })
    return descriptor
  }
}

