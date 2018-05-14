/* Type definitions for mobx-event-bus */
/* Version 0.1.0 */
/* Definitions by: Igor Savin https://github.com/kibertoad */

declare interface EventBus {

    /**
     *
     *  @function
     */
    metadata(): object

    /**
     * Registers subscriber to receive events
     * @function
     * @param {object} subscriber
     */
    register(subscriber: object): void;

    /**
     * Post event with given topic and payload
     * @function
     * @param {string} topic
     * @param {Object} payload
     */
    post(topic: string, payload: object): void;

}

export const eventBus : EventBus;

interface Selector<Event> {
    (event: Event): boolean;
}

export function subscribe<Event>(topic: string, selector?: Selector<Event>)
