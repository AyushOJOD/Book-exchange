import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

/**
 * Combines clsx and twMerge for conditional class merging with Tailwind CSS
 * @param {...any} inputs - Class names to merge
 * @returns {string} - Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}