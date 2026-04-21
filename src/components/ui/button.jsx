import React from "react";

/* simple class join helper */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* button variants (replaces cva) */
const buttonVariants = {
  base:
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",

  variant: {
    default: "bg-indigo-600 text-white hover:bg-indigo-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-100",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    ghost: "hover:bg-gray-100",
    link: "text-indigo-600 underline-offset-4 hover:underline",
  },

  size: {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  },
};

export function Button({
  className = "",
  variant = "default",
  size = "default",
  asChild = false, // kept for compatibility (ignored)
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        buttonVariants.base,
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
