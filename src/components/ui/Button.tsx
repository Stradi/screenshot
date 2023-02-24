import React from "react";
import { cn } from "../../utils/tw";

type Props = React.ComponentPropsWithoutRef<"button"> & {
  primary?: boolean;
  outline?: boolean;
  sm?: boolean;
  lg?: boolean;
  fullWidth?: boolean;
};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    {
      primary = true,
      outline = false,
      sm = false,
      lg = false,
      fullWidth = false,
      // eslint-disable-next-line react/prop-types
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md",
          "text-sm font-medium",
          "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "transition duration-100",

          primary &&
            "bg-neutral-900 text-white hover:bg-neutral-700 data-[state='open']:bg-neutral-700",
          outline &&
            "border border-neutral-300 bg-transparent text-black hover:bg-neutral-200 data-[state='open']:bg-neutral-200",

          !sm && !lg && "h-10 px-4 py-2",
          sm && "h-9 rounded-md px-2",
          lg && "h-11 rounded-md px-8",
          fullWidth && "w-full",
          className
        )}
        {...props}
      ></button>
    );
  }
);

Button.displayName = "Button";
export default Button;
