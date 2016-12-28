import React from 'react';
import Gun from 'gun/gun';

const gun = Gun();

const stores = {};

const callbacks = {};

/**
 * Dispatch an action. All actions dispatched, will get a unique ID.
 *
 * @param {object} action
 *   Must have "type" key.
 */
export const dispatch = (action) => {
  action._uuid = btoa(`${action.name}${new Date().getTime()}`);

  Object.keys(stores).forEach(key => {
    if (typeof stores[key].willReceiveAction === 'function') {
      stores[key].willReceiveAction(action);
    }
  });
};

/**
 * Connect a component to the stores.
 *
 * @param {object} Component
 * @param {function|null} mapStoresToProps
 *   Either a function to call to get the properties for the connected component,
 *   or null to not connect to any store.
 *
 * @return {object}
 *   A React component.
 */
export const connect = (Component, mapStoresToProps = null) => {
  if (mapStoresToProps === null) {
    return Component;
  }

  // Return a new component, which wraps the connected component, and handles all store communication.
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.mapStoresToProps = mapStoresToProps;
      this.buildProps = this.buildProps.bind(this);
    }

    /**
     * When the component mount, add the forceUpdate callback to the connected components.
     */
    componentDidMount() {
      callbacks[this.constructor.name] = () => this.forceUpdate();
    }

    /**
     * Remove the callback from the connected components.
     */
    componentWillUnmount() {
      Object.keys(callbacks).forEach((key, index) => {
        if (key === this.constructor.name) {
        callbacks.splice(index, 1);
      }
    });
    }

    /**
     * Build the props to pass to the component, from the current state of all stores.
     *
     * @return {object}
     */
    buildProps() {
      let states = {};
      // Build the state tree to pass into the mapStoresToProps function.
      Object.keys(stores).forEach(key=> {
        states[stores[key].constructor.name] = stores[key].getState();
    });
      return this.mapStoresToProps(states);
    }

    render() {
      return React.createElement(
        Component,
        { ...this.buildProps(), ...this.props }
      );
    }
  }
};

export class Store {
  constructor() {
    this.gun = gun;
  }

  setState(nextState) {
    this.state = {
      ...nextState,
  };

    // Trigger an updated of all connected components.
    Object.keys(callbacks).forEach(key => {
      callbacks[key]();
  });
  }

  getState() {
    return this.state;
  }

  static register(store) {
    stores[store.constructor.name] = store;
  }
}

alert("HELLO");
export default gun;