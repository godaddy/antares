import { Box, type BoxContext } from '@bento/box';
import { useInternalProps } from '@bento/internal-props';
import { AnyObject } from '@bento/types';
import { mergeRefs } from '@react-aria/utils';
import { useContext } from 'react';
import type { ForwardedRef, Ref } from 'react';

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

  // If slot explicitly has this property, use its value (even if null/undefined/falsy)
  if (name in slots) {
    return execute(name, slots, args);
  }

  // If props explicitly has this property, use its value (even if null/undefined/falsy)
  if (name in props) {
    return execute(name, props, args);
  }

  return original;
}

/**
 * Merges multiple refs into a single ref callback.
 *
 * @param refs - Array of refs to merge (can include undefined/null).
 * @returns A single merged ref, undefined if no refs provided.
 * @private
 */
function mergeRefList(refs: Array<ForwardedRef<any> | Ref<any> | undefined>): Ref<any> | undefined {
  const filtered = refs.filter((ref): ref is ForwardedRef<any> | Ref<any> => ref != null);

  if (!filtered.length) return undefined;
  if (filtered.length === 1) return filtered[0] as Ref<any>;

  return mergeRefs(...(filtered as Array<Ref<any>>)) as Ref<any>;
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
  /**
   * The merged ref combining forwarded refs with any ref supplied via slots.
   */
  ref?: Ref<any>;
}

/**
 * Hook that merges props with slotted props and provides a proxy for accessing them.
 *
 * @param args - The initial props to use, or array when using rest parameters.
 * @param state - The state object to use.
 * @param forwardedRef - The ref forwarded to the component.
 * @returns An object containing the proxy based props object and the apply function.
 * @throws {BentoError} If the hook is used outside of a @bento/slots component.
 *
 * @example
 * const { props, apply, ref } = useProps({ foo: 'bar' }, {}, forwardedRef);
 * if (props.a) doSomething()
 * return <a {...apply({ className: 'foo' }, ['ref']) } ref={ref}>{ props.children }</a>;
 *
 * @example
 * // With rest parameters
 * function Component(...rest) {
 *   const { props, apply, ref } = useProps(rest);
 *   return <div {...apply()} />;
 * }
 */
export function useProps<T extends AnyObject, S extends object = object>(args: T, state?: S): Returns;
export function useProps<T extends AnyObject, S extends object = object>(
  args: T,
  state: S,
  forwardedRef: ForwardedRef<any>
): Returns;
// Supports ...rest pattern: function Component(...rest) { useProps(rest) }
export function useProps<T extends AnyObject, S extends object = object>(
  argsWithRef: [T, ForwardedRef<any>?],
  state?: S
): Returns;
export function useProps(...rest: unknown[]): Returns {
  let forwardedRef: ForwardedRef<any> | undefined;
  let args: AnyObject;
  let state: object = {};

  if (Array.isArray(rest[0])) {
    const tuple = rest[0] as [AnyObject, ForwardedRef<any>?];
    args = tuple[0];
    forwardedRef = tuple[1];
    state = (rest[1] as object) ?? {};
  } else {
    args = rest[0] as AnyObject;
    state = (rest[1] as object) ?? {};
    forwardedRef = rest[2] as ForwardedRef<any> | undefined;
  }

  const { slots } = useContext<BoxContext<AnyObject>>(Box);
  const [props, internal] = useInternalProps(args);
  const { namespace, assigned } = slots;
  const dot = namespace.join('.');
  const slotted = assigned[dot] || {};

  const ref = mergeRefList([
    (props as AnyObject)?.ref as ForwardedRef<any> | Ref<any> | undefined,
    (slotted as AnyObject)?.ref as ForwardedRef<any> | Ref<any> | undefined,
    forwardedRef
  ]);

  const slotNoRef = { ...slotted } as AnyObject;
  const propsNoRef = { ...props } as AnyObject;

  delete slotNoRef.ref;
  delete propsNoRef.ref;

  const propsy: AnyObject = { ...internal, ...propsNoRef, ...slotNoRef };

  /**
   * Applies the given attributes to an object.
   *
   * @param attributes - The attributes to apply. If not provided, defaults to `propsy`.
   * @param except - An array of keys to exclude from the resulting object.
   * @returns The resulting object with applied attributes.
   * @public
   */
  function apply(attributes?: object, except?: string[]): object {
    const data = (attributes || propsy) as AnyObject;
    const returned: AnyObject = {};

    function reduce(memo: AnyObject, key: string) {
      if (except && except.includes(key)) return memo;

      memo[key] = renderProp(key, {
        props: { ...props, ...internal },
        original: data[key],
        slots: slotted,
        state
      });

      return memo;
    }

    let result: AnyObject;

    if (!attributes) result = Object.keys(propsy).reduce(reduce, returned);
    else result = Object.keys(propsy).reduce(reduce, Object.keys(attributes).reduce(reduce, returned));

    // Always include the merged ref unless specifically excluded
    if (except && except.includes('ref')) return result;
    if (ref) result.ref = ref;

    return result;
  }

  return {
    props: new Proxy(propsy, {
      get: function getter(_: object, name: string) {
        if (name === 'ref') return ref;

        return renderProp(name, {
          original: isRenderProp(name, props[name]) ? undefined : props[name],
          props: { ...props, ...internal },
          slots: slotted,
          state
        });
      }
    }),
    apply,
    ref
  };
}
