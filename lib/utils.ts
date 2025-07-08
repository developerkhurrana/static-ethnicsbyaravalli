import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Size badge generation utility
export const generateSizeBadges = (sizes: string[]) => {
  const sizeMap: { [key: string]: string } = {
    'XS': '34"',
    'S': '36"',
    'M': '38"',
    'L': '40"',
    'XL': '42"',
    'XXL': '44"',
    '3XL': '46"'
  };

  return sizes.map(size => ({
    size,
    measurement: sizeMap[size] || size
  }));
};
