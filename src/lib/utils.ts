import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  let words = name.split(" ");

  let initials = "";

  words.forEach(function (word) {
    initials += word.charAt(0);
  });

  return initials.toUpperCase();
}
