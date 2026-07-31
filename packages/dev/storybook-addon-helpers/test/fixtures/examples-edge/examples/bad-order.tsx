function localHelper() {
  return null;
}

/**
 * A non-numeric @order is ignored.
 * @order not-a-number
 */
export function BadOrderExample() {
  return localHelper();
}
