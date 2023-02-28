import React from "react";
import * as _Tabs from "@radix-ui/react-tabs";
import { cn } from "../../utils/tw";

const Tabs = _Tabs.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof _Tabs.List>,
  React.ComponentPropsWithoutRef<typeof _Tabs.List>
>(({ className, ...props }, ref) => {
  return (
    <_Tabs.List
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-xl border border-neutral-200 bg-neutral-100 p-1",
        className
      )}
      {...props}
    />
  );
});

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof _Tabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof _Tabs.Trigger>
>(({ className, ...props }, ref) => {
  return (
    <_Tabs.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center transition-all duration-100",
        "min-w-[100px] rounded-lg px-4 py-2",
        "text-sm font-medium text-neutral-700",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state='active']:bg-white data-[state='active']:text-neutral-900 data-[state='active']:shadow-sm",
        "data-[state='active']:border data-[state='active']:border-neutral-200",
        "data-[state='inactive']:hover:border data-[state='inactive']:hover:border-neutral-200",
        className
      )}
      {...props}
    />
  );
});

const TabsContent = React.forwardRef<
  React.ElementRef<typeof _Tabs.Content>,
  React.ComponentPropsWithoutRef<typeof _Tabs.Content>
>(({ className, ...props }, ref) => {
  return (
    <_Tabs.Content
      ref={ref}
      className={cn("mt-2 rounded-md border border-slate-200 p-4", className)}
      {...props}
    />
  );
});

TabsList.displayName = "TabsList";
TabsTrigger.displayName = "TabsTrigger";
TabsContent.displayName = "TabsContent";

export default Object.assign(Tabs, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
