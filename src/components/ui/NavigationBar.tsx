import { INavigationItem } from "../../config";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { cn } from "../../utils/tw";

interface NavigationBarProps {
  items: INavigationItem[];
}

export default function NavigationBar({ items }: NavigationBarProps) {
  return (
    <NavigationMenu.Root
      className={cn(
        "relative flex justify-center p-2",
        "border-b border-b-neutral-200 bg-neutral-50"
      )}
    >
      <NavigationMenu.List className="flex items-center gap-2">
        {items.map((item, idx) => (
          <NavigationMenu.Item key={idx} className={cn("text-sm font-medium text-neutral-500")}>
            <NavigationMenu.Link
              className={cn(
                "inline-block select-none",
                "rounded-lg px-4 py-1",
                "hover:bg-neutral-200 hover:text-neutral-600",
                "transition-colors duration-100"
              )}
              href={item.href}
            >
              {item.label}
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
