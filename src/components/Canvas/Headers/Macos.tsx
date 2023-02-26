import React from "react";
import { findByType } from "../../../utils/react";
import { cn } from "../../../utils/tw";
import {
  ChevronLeftIcon,
  CopyIcon,
  MacOSHeaderSidebarIcon,
  PlusIcon,
  ShieldIcon,
  UploadIcon,
} from "../../ui/Icon";

type LeftSideProps = React.ComponentPropsWithoutRef<"div">;
type MiddleSideProps = React.ComponentPropsWithoutRef<"div">;
type RightSideProps = React.ComponentPropsWithoutRef<"div">;
type SearchBarProps = React.ComponentPropsWithoutRef<"div">;

function LeftSide({ children, ...props }: LeftSideProps) {
  return (
    <div className="justify-start" {...props}>
      <div className="flex gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      {children}
    </div>
  );
}

function MiddleSide({ children, ...props }: MiddleSideProps) {
  return (
    <div className="w-full grow justify-center" {...props}>
      {children}
    </div>
  );
}

function RightSide({ children, ...props }: RightSideProps) {
  return (
    <div className="justify-end" {...props}>
      {children}
    </div>
  );
}

function SearchBar({ ...props }: SearchBarProps) {
  return (
    <div
      {...props}
      className="flex h-6 w-max min-w-[196px] items-center justify-center rounded-md bg-neutral-300 px-4 text-center text-xs font-medium text-neutral-500"
    >
      <p contentEditable>Type your URL or Website name</p>
    </div>
  );
}

const Macos = React.forwardRef<React.ElementRef<"div">, React.ComponentPropsWithoutRef<"div">>(
  ({ children }, ref) => {
    function renderLeftSide() {
      const leftSide = findByType(children, LeftSide);
      if (!leftSide) return null;

      return leftSide;
    }

    function renderMiddleSide() {
      const middleSide = findByType(children, MiddleSide);
      if (!middleSide) return null;

      return middleSide;
    }

    function renderRightSide() {
      const rightSide = findByType(children, RightSide);
      if (!rightSide) return null;

      return rightSide;
    }

    return (
      <div ref={ref} className={cn("h-12 w-full", "border-b border-b-neutral-300 bg-white/90")}>
        <div
          className={cn(
            "flex h-full w-full items-center justify-between gap-8 px-4",
            "[&>*]:flex [&>*]:w-full [&>*]:max-w-full [&>*]:items-center [&>*]:gap-4"
          )}
        >
          {renderLeftSide()}
          {renderMiddleSide()}
          {renderRightSide()}
        </div>
      </div>
    );
  }
);

Macos.displayName = "Macos";

export default Object.assign(Macos, {
  LeftSide,
  MiddleSide,
  RightSide,
  SearchBar,
  SidebarIcon: () => (
    <MacOSHeaderSidebarIcon size="sm" stroke="thick" className="text-neutral-400" />
  ),
  ChevronLeftIcon: () => <ChevronLeftIcon size="sm" stroke="thick" className="text-neutral-400" />,
  ChevronRightIcon: () => (
    <ChevronLeftIcon size="sm" stroke="thick" className="rotate-180 text-neutral-400" />
  ),
  ShieldIcon: () => <ShieldIcon size="sm" stroke="thick" className="text-neutral-400" />,
  UploadIcon: () => <UploadIcon size="sm" stroke="thick" className="text-neutral-400" />,
  PlusIcon: () => <PlusIcon size="sm" stroke="thick" className="text-neutral-400" />,
  CopyIcon: () => <CopyIcon size="sm" stroke="thick" className="text-neutral-400" />,
});
