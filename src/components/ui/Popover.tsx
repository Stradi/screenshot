import * as _Popover from "@radix-ui/react-popover";
import React from "react";
import { cn } from "../../utils/tw";

const Popover = _Popover.Root;

const PopoverTrigger = _Popover.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof _Popover.Content>,
  React.ComponentPropsWithoutRef<typeof _Popover.Content>
  // eslint-disable-next-line react/prop-types
>(({ className, ...props }, ref) => {
  return (
    <_Popover.Portal>
      <_Popover.Content
        ref={ref}
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={cn(
          "mt-1 rounded-lg p-4",
          "border border-neutral-200 bg-white shadow-lg",
          "focus:outline-none",
          "data-[state='open']:data-[side='top']:animate-fade-in-down",
          "data-[state='open']:data-[side='bottom']:animate-fade-in-up",
          className
        )}
        {...props}
      />
    </_Popover.Portal>
  );
});

PopoverContent.displayName = "PopoverContent";

export default Object.assign(Popover, {
  Trigger: PopoverTrigger,
  Content: PopoverContent,
});
