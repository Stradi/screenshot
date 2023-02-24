import React from "react";
import * as _Switch from "@radix-ui/react-switch";
import { cn } from "../../utils/tw";

const Switch = React.forwardRef<
  React.ElementRef<typeof _Switch.Root>,
  React.ComponentPropsWithoutRef<typeof _Switch.Root> & {
    name?: string;
    label?: string;
  }
>((props, ref) => {
  return (
    <div className={cn("flex items-center gap-4")}>
      <_Switch.Root
        ref={ref}
        id={props.name}
        className={cn(
          "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center",
          "rounded-full border-2 border-transparent transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=unchecked]:bg-neutral-200 data-[state=checked]:bg-neutral-900"
        )}
        {...props}
      >
        <_Switch.Thumb
          className={cn(
            "pointer-events-none block h-5 w-5",
            "rounded-full bg-white shadow-lg ring-0 transition-transform",
            "data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-5"
          )}
        />
      </_Switch.Root>
      <label
        htmlFor={props.name}
        className={cn(
          "select-none font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        )}
      >
        {props.label}
      </label>
    </div>
  );
});

Switch.displayName = "Switch";

export default Switch;
