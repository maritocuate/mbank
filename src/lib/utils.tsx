import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Concatenates multiple class names and returns the merged result.
 *
 * @param {...ClassValue[]} inputs - An array of class values to be merged.
 * @return {string} The merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
