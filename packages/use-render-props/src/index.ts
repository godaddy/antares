import { Slot, type SlotContext } from '@bento/slots/context';
import React, { useContext } from 'react';

interface RenderPropData {
  original?: Record<string, undefined | any>;
  props: Record<string, any>;
  slots: Record<string, any>;
  state: Record<string, any>;
}

/**
 * Checks if the given string is an event listener name. An event listener name
 * is defined as a string that starts with "on" followed by an uppercase letter.
 *
 * @param {string} name - The string to check.
 * @returns {boolean} `true` if the string is an event listener name, otherwise `false`.
 * @private
 */
export function isEventListener(name: string): boolean {
  return /^on[A-Z]/.test(name);
}

/**
 * Determines if a given value is a render prop.
 *
 * A render prop is a function that is used to dynamically generate
 * UI elements. This function checks if the provided value is a function
 * and not an event listener.
 *
 * @param {string} name - The name of the prop.
 * @param {any} value - The value of the prop to check.
 * @returns {boolean} - Returns `true` if the value is a render prop, otherwise `false`.
 */
export function isRenderProp(name: string, value: any): boolean {
  return typeof value === 'function' && !isEventListener(name);
}

/**
 * Executes a function or returns a value from the given data object.
 *
 * @param {string} name - The name of the property to execute or retrieve.
 * @param {object} data - The data object containing the property.
 * @param {RenderPropData} args - The arguments to pass if the property is a function.
 * @returns {any} - The result of the function execution or the value of the property.
 * @private
 */
export function execute(name: string, data: object, args: RenderPropData): any {
  const value = data[name];

  if (isRenderProp(name, value)) return value(args);
  return value;
}

/**
 * Retrieves a property value, potentially overridden by a slotted value.
 *
 * @param {string} name - The name of the property to retrieve.
 * @param {Object} options - An object containing the properties, slotted values, and state.
 * @param {Object} options.props - The original properties.
 * @param {Object} options.slots - The slotted values that can override the original properties.
 * @param {Object} options.state - The current state.
 * @param {Object} options.original - The original value of the property.
 * @returns {any} - The original property value or the overridden value if provided.
 */
export function renderProp(name: string, args: RenderPropData): any {
  const { props, slots, original } = args;

  return execute(name, slots, args) || execute(name, props, args) || original;
}

/**
 * Hook that merges props with slotted props and provides a proxy for accessing them.
 *
 * @param {object} props - The initial props to use.
 * @param {object} [state={}] - The state object to use.
 * @returns {[object, function]} A tuple containing the proxy based props object and the apply function.
 * @throws {BentoError} If the hook is used outside of a @bento/slots component.
 *
 * @example
 * const [props, apply] = useRenderProps({ foo: 'bar' });
 * if (props.a) doSomething()
 * return <a {...apply({ className: 'foo' }) }>{ props.children }</a>;
 */
export function useRenderProps(props: object, state: object = {}): object {
  const { namespace, slots } = useContext<SlotContext>(Slot);
  const dot = namespace.join('.');
  const slotted = slots[dot] || {};
  const propsy = { ...props, ...slotted };

  /**
   * Applies the given attributes to an object.
   *
   * @param {object} [attributes] - The attributes to apply. If not provided, defaults to `propsy`.
   * @returns {object} The resulting object with applied attributes.
   * @public
   */
  function apply(attributes?: object): object {
    const data = attributes || propsy;

    return Object.keys(data).reduce(function reduce(memo, key) {
      memo[key] = renderProp(key, {
        original: data[key],
        slots: slotted,
        props: props,
        state
      });

      return memo;
    }, {});
  }

  return [
    new Proxy(propsy, {
      get: function getter(_: object, name: string) {
        return renderProp(name, {
          original: isRenderProp(name, props[name]) ? undefined : props[name],
          slots: slotted,
          props,
          state
        });
      }
    }),
    apply
  ];
}
