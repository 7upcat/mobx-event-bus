/* Type definitions for mobx-event-bus */
/* Version 0.1.1 */
/* Definitions by: Igor Savin https://github.com/kibertoad */

declare interface EventBus {
    /**
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
    post(topic: string, payload: any): void;
}

export const eventBus: EventBus;

declare interface Event<Payload> {
    topic: string,
    payload?: Payload;
}

interface Selector<Payload> {
    (event: Event<Payload>): boolean;
}

export function subscribe<Payload>(topic: string, selector?: Selector<Payload>);
