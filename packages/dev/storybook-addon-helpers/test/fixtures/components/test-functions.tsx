import React from 'react';

/**
 * Simple utility function for string manipulation
 *
 * @param input - The input string to process
 * @param uppercase - Whether to convert to uppercase
 * @returns The processed string
 */
export function processString(input: string, uppercase?: boolean): string {
  return uppercase ? input.toUpperCase() : input.toLowerCase();
}

/**
 * Function that returns a React element
 *
 * @param title - The title to display
 * @param subtitle - Optional subtitle
 * @returns A React element
 */
export function createTitle(title: string, subtitle?: string): React.ReactElement {
  return (
    <div>
      <h1>{title}</h1>
      {subtitle && <h2>{subtitle}</h2>}
    </div>
  );
}

/**
 * Async function for data fetching
 *
 * @param url - The URL to fetch from
 * @param options - Fetch options
 * @returns Promise with the response data
 */
export async function fetchData(url: string, options?: RequestInit): Promise<any> {
  const response = await fetch(url, options);
  return response.json();
}

/**
 * Higher-order function that returns another function
 *
 * @param multiplier - The multiplier value
 * @returns A function that multiplies by the given value
 */
export function createMultiplier(multiplier: number): (value: number) => number {
  return (value: number) => value * multiplier;
}

/**
 * Generic function with type parameters
 *
 * @param items - Array of items to filter
 * @param predicate - Filter predicate function
 * @returns Filtered array
 */
export function filterItems<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

/**
 * Function with complex parameter types
 *
 * @param config - Configuration object
 * @param callback - Callback function
 * @returns The processed result
 */
export function processConfig(
  config: {
    name: string;
    version: number;
    features: string[];
    metadata?: Record<string, any>;
  },
  callback: (result: string) => void
): void {
  const result = `${config.name} v${config.version}`;
  callback(result);
}

/**
 * Arrow function assigned to const
 *
 * @param x - First number
 * @param y - Second number
 * @returns Sum of the numbers
 */
export const addNumbers = (x: number, y: number): number => {
  return x + y;
};

/**
 * Function with optional and default parameters
 *
 * @param message - The message to format
 * @param prefix - Optional prefix
 * @param suffix - Optional suffix
 * @returns Formatted message
 */
export function formatMessage(message: string, prefix: string = '[INFO]', suffix?: string): string {
  let result = `${prefix} ${message}`;
  if (suffix) {
    result += ` ${suffix}`;
  }
  return result;
}

/**
 * Function with rest parameters
 *
 * @param base - Base value
 * @param values - Additional values to sum
 * @returns Sum of all values
 */
export function sumAll(base: number, ...values: number[]): number {
  return base + values.reduce((sum, val) => sum + val, 0);
}

// Function without JSDoc (should still be parseable)
export function noDocFunction(param: string): boolean {
  return param.length > 0;
}
