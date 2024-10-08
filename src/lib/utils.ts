import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomPicture() {
  return `/images/example-${Math.ceil(Math.random() * 15)}.svg`
}