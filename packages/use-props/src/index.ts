import { Box, type BoxContext } from '@bento/box';
import { AnyObject } from '@bento/types';
import { useContext } from 'react';

export interface RenderPropData {
  /**
   * If the component is assigning a default value to the given prop,
   * the original value be a reference to the previous assigned value.
   * @default The original assigned value
   */
  original?: unknown;

  /** All the props that were passed to the component. @default {} */
  props: AnyObject;

  /** If slots are used to modify the component, this will contain a reference to the original slots object. @default {} */
  slots: AnyObject;

  /** The exposed state of the component. @default {} */
  state: AnyObject;
}

/**
 * Checks if the given string is an event listener name. An event listener name
 * is defined as a string that starts with "on" followed by an uppercase letter.
 *
 * @param name - The string to check.
 * @returns `true` if the string is an event listener name, otherwise `false`.
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
 * @param name - The name of the prop.
 * @param value - The value of the prop to check.
 * @returns `true` if the value is a render prop, otherwise `false`.
 */
export function isRenderProp(name: string, value: any): boolean {
  return typeof value === 'function' && !isEventListener(name);
}

/**
 * Executes a function or returns a value from the given data object.
 *
 * @param name - The name of the property to execute or retrieve.
 * @param data - The data object containing the property.
 * @param args - The arguments to pass if the property is a function.
 * @returns The result of the function execution or the value of the property.
 * @private
 */
export function execute(name: string, data: AnyObject, args: RenderPropData): any {
  const value = data[name];

  if (isRenderProp(name, value)) return value(args);
  return value;
}

/**
 * Retrieves a property value, potentially overridden by a slotted value.
 *
 * @param name - The name of the property to retrieve.
 * @param options.props - The original properties.
 * @param options.slots - The slotted values that can override the original properties.
 * @param options.state - The current state.
 * @param options.original - The original value of the property.
 * @returns The original property value or the overridden value if provided.
 */
export function renderProp(name: string, args: RenderPropData): any {
  const { props, slots, original } = args;

  return execute(name, slots, args) || execute(name, props, args) || original;
}

export interface Returns {
  /**
   * Proxy object that have access to the original props, slotted values, and internal props. When
   * accessing a property, it will first check the slotted values, then the original props, and finally
   * the internal props. If the property is a render prop, it will execute the function with the provided
   * arguments.
   *
   * @default { ...props, ...slots }
   */
  props: AnyObject;
  /**
   * Applies the given attributes as default values to the props. If no attributes are provided, it will
   * use the props as default values. The resulting object will contain all the properties of the props,
   * except for the ones specified in the `except` array. The values of the properties will be the result
   * of executing the render prop function with the provided arguments.
   *
   * @default function(attr)
   */
  apply: (attributes?: object, except?: string[]) => object;
}

/**
 * Hook that merges props with slotted props and provides a proxy for accessing them.
 *
 * @param args - The initial props to use.
 * @param state - The state object to use.
 * @returns An object containing the proxy based props object and the apply function.
 * @throws {BentoError} If the hook is used outside of a @bento/slots component.
 *
 * @example
 * const { props, apply } = useProps({ foo: 'bar' });
 * if (props.a) doSomething()
 * return <a {...apply({ className: 'foo' }) }>{ props.children }</a>;
 */
export function useProps(args: AnyObject, state: object = {}): Returns {
  const { slots } = useContext<BoxContext<AnyObject>>(Box);
  const props = args;
  const { namespace, assigned } = slots;
  const dot = namespace.join('.');
  const slotted = assigned[dot] || {};
  const propsy = { ...props, ...slotted };

  /**
   * Applies the given attributes to an object.
   *
   * @param attributes - The attributes to apply. If not provided, defaults to `propsy`.
   * @param except - An array of keys to exclude from the resulting object.
   * @returns The resulting object with applied attributes.
   * @public
   */
  function apply(attributes?: object, except?: string[]): object {
    const data = attributes || propsy;
    const returned = {};

    function reduce(memo: AnyObject, key: string) {
      if (except && except.includes(key)) return memo;

      memo[key] = renderProp(key, {
        original: data[key],
        slots: slotted,
        props,
        state
      });

      return memo;
    }

    if (!attributes) return Object.keys(propsy).reduce(reduce, returned);
    return Object.keys(propsy).reduce(reduce, Object.keys(attributes).reduce(reduce, returned));
  }

  return {
    props: new Proxy(propsy, {
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
  };
}
