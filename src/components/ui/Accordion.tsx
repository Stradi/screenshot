import * as _Accordion from "@radix-ui/react-accordion";
import React from "react";

const Accordion = _Accordion.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof _Accordion.Item>,
  React.ComponentPropsWithoutRef<typeof _Accordion.Item>
>((props, ref) => {
  return <_Accordion.Item ref={ref} className="" {...props} />;
});

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof _Accordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof _Accordion.Trigger>
>(({ children, ...props }, ref) => {
  return (
    <_Accordion.Header>
      <_Accordion.Trigger ref={ref} className="" {...props}>
        {children}
      </_Accordion.Trigger>
    </_Accordion.Header>
  );
});

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof _Accordion.Content>,
  React.ComponentPropsWithoutRef<typeof _Accordion.Content>
>(({ children, ...props }, ref) => {
  return (
    <_Accordion.Content ref={ref} className="" {...props}>
      <div>{children}</div>
    </_Accordion.Content>
  );
});

AccordionItem.displayName = "AccordionItem";
AccordionTrigger.displayName = "AccordionTrigger";
AccordionContent.displayName = "AccordionContent";

export default Object.assign(Accordion, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
