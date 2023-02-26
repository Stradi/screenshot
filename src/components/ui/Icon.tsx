import { cn } from "../../utils/tw";

interface BaseIconProps extends React.ComponentPropsWithoutRef<"i"> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  stroke?: "thinner" | "thin" | "medium" | "thick" | "thicker";
  fillColor?: string;
  svgClassName?: string;
}

function BaseIcon({
  size = "md",
  stroke = "medium",
  fillColor,
  svgClassName,
  children,
  className,
  ...props
}: BaseIconProps) {
  return (
    <i {...props} className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor || "none"}
        viewBox="0 0 24 24"
        strokeWidth={cn(
          stroke == "thinner" && 0.5,
          stroke == "thin" && 1,
          stroke == "medium" && 1.5,
          stroke == "thick" && 2,
          stroke == "thicker" && 3
        )}
        stroke="currentColor"
        className={cn(
          size == "xs" && "h-3 w-3",
          size == "sm" && "h-4 w-4",
          size == "md" && "h-6 w-6",
          size == "lg" && "h-8 w-8",
          size == "xl" && "h-16 w-16",
          svgClassName
        )}
      >
        {children}
      </svg>
    </i>
  );
}

export function MacOSHeaderSidebarIcon({ ...props }: BaseIconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="9" y1="3" x2="9" y2="21"></line>
    </BaseIcon>
  );
}

export function ChevronLeftIcon({ ...props }: BaseIconProps) {
  return (
    <BaseIcon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </BaseIcon>
  );
}

export function ShieldIcon({ ...props }: BaseIconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </BaseIcon>
  );
}

export function UploadIcon({ ...props }: BaseIconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
      />
    </BaseIcon>
  );
}

export function PlusIcon({ ...props }: BaseIconProps) {
  return (
    <BaseIcon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </BaseIcon>
  );
}

export function CopyIcon({ ...props }: BaseIconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </BaseIcon>
  );
}
