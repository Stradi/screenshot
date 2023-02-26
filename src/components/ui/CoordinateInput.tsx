import { useCallback, useEffect, useRef, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { clamp, mapRange } from "../../utils/math";
import { cn } from "../../utils/tw";

interface Props {
  min?: number;
  max?: number;
  rows?: number;
  columns?: number;
  defaultValues?: [number, number];

  onValueChange?: (value: [number, number]) => void;
}

// TODO: I should probably refactor this.
export default function CoordinateInput({
  min = 0,
  max = 1,
  rows = 5,
  columns = 5,
  defaultValues = [0, 0],
  onValueChange,
}: Props) {
  const windowDimensions = useWindowSize();

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [parentRect, setParentRect] = useState<DOMRect | null>(null);
  const [draggableRect, setDraggableRect] = useState<DOMRect | null>(null);

  const parentRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);

  const parentWidth = parentRect?.width ?? 0;
  const parentHeight = parentRect?.height ?? 0;

  const draggableWidth = draggableRect?.width ?? 0;
  const draggableHeight = draggableRect?.height ?? 0;

  const availableWidth = parentWidth - draggableWidth;
  const availableHeight = parentHeight - draggableHeight;

  // We could use useMemo here but it's probably not worth it.
  const normalizedX = Number.parseFloat(mapRange(x, 0, availableWidth, min, max).toFixed(2));
  const normalizedY = Number.parseFloat(mapRange(y, 0, availableHeight, min, max).toFixed(2));

  const stepSizeX = availableWidth / (columns - 1);
  const stepSizeY = availableHeight / (rows - 1);

  useEffect(() => {
    const parentW = parentRef.current?.getBoundingClientRect().width ?? 0;
    const parentH = parentRef.current?.getBoundingClientRect().height ?? 0;

    const draggableW = draggableRef.current?.getBoundingClientRect().width ?? 0;
    const draggableH = draggableRef.current?.getBoundingClientRect().height ?? 0;

    const availableW = parentW - draggableW;
    const availableH = parentH - draggableH;

    const [defaultX, defaultY] = defaultValues;
    const pixX = mapRange(defaultX, min, max, 0, availableW);
    const pixY = mapRange(defaultY, min, max, 0, availableH);

    setX(pixX);
    setY(pixY);
  }, []);

  useEffect(() => {
    if (!parentRect || !draggableRect) return;
    onValueChange?.([normalizedX, normalizedY]);
  }, [x, y]);

  useEffect(() => {
    setParentRect(parentRef.current?.getBoundingClientRect() ?? null);
    setDraggableRect(draggableRef.current?.getBoundingClientRect() ?? null);
  }, [parentRef.current, draggableRef.current, windowDimensions.width, windowDimensions.height]);

  function xyToGrid(x: number, y: number) {
    if (!parentRect || !draggableRect) return [0, 0];

    const offsetX = draggableWidth / 2;
    const offsetY = draggableHeight / 2;

    const newX = x - parentRect.left - offsetX;
    const newY = y - parentRect.top - offsetY;

    const clampedX = clamp(newX, 0, availableWidth);
    const clampedY = clamp(newY, 0, availableHeight);

    const snappedX = Math.round(clampedX / stepSizeX) * stepSizeX;
    const snappedY = Math.round(clampedY / stepSizeY) * stepSizeY;

    return [snappedX, snappedY];
  }

  function onMouseMove(e: MouseEvent) {
    e.preventDefault();

    const [snappedX, snappedY] = xyToGrid(e.clientX, e.clientY);
    setX(snappedX);
    setY(snappedY);
  }

  function setEventListeners() {
    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  return (
    <div
      ref={parentRef}
      className={cn(
        "relative h-full w-full bg-neutral-100",
        "cursor-pointer rounded-md border border-neutral-300",
        "text-neutral-300 focus-within:ring-2 focus-within:ring-neutral-900 focus-within:ring-offset-2"
      )}
      role="button"
      tabIndex={-1}
      onMouseDown={(e) => {
        e.preventDefault();
        if (!parentRect || !draggableRect) return;

        draggableRef.current?.focus();

        const [snappedX, snappedY] = xyToGrid(e.clientX, e.clientY);
        setX(snappedX);
        setY(snappedY);

        setEventListeners();
      }}
      style={{
        backgroundImage: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
        backgroundSize: `${stepSizeX}px ${stepSizeY}px`,
        backgroundPosition: `${draggableWidth / 2}px ${draggableHeight / 2}px`,
      }}
    >
      <div
        ref={draggableRef}
        role="button"
        tabIndex={0}
        className={cn(
          "absolute h-4 w-4 cursor-grab",
          "rounded-full bg-neutral-900 transition-all duration-100",
          "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
        )}
        onMouseDown={(e) => {
          e.preventDefault();
          draggableRef.current?.focus();

          setEventListeners();
        }}
        onKeyDown={(e) => {
          e.preventDefault();

          if (!parentRect || !draggableRect) return;

          const stepSizeX = availableWidth / (columns - 1);
          const stepSizeY = availableHeight / (rows - 1);

          switch (e.key) {
            case "ArrowUp":
              setY((prev) => clamp(prev - stepSizeY, 0, availableHeight));
              break;
            case "ArrowDown":
              setY((prev) => clamp(prev + stepSizeY, 0, availableHeight));
              break;
            case "ArrowLeft":
              setX((prev) => clamp(prev - stepSizeX, 0, availableWidth));
              break;
            case "ArrowRight":
              setX((prev) => clamp(prev + stepSizeX, 0, availableWidth));
              break;
          }
        }}
        style={{
          transform: `translate(${x}px, ${y}px)`,
        }}
      ></div>
    </div>
  );
}
