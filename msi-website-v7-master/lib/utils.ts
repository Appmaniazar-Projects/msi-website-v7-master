import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSearchParam<T extends readonly string[]>(
  param: string | undefined,
  validParams: T,
  fallback: T[number]
): T[number] {
  if (param && validParams.includes(param as T[number])) {
    return param as T[number];
  }
  return fallback;
}

