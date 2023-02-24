import { useEffect, useRef, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { clamp, mapRange } from "../../utils/math";

interface Props {
  min?: number;
  max?: number;
  precision?: number;

  onValueChange?: (value: [number, number]) => void;
}

export default function CoordinateInput({ min = 0, max = 1, precision = 2, onValueChange }: Props) {
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
  const normalizedX = Number.parseFloat(
    mapRange(x, 0, availableWidth, min, max).toFixed(precision)
  );

  const normalizedY = Number.parseFloat(
    mapRange(y, 0, availableHeight, min, max).toFixed(precision)
  );

  useEffect(() => {
    if (!parentRect || !draggableRect) return;
    onValueChange?.([normalizedX, normalizedY]);
  }, [x, y]);

  useEffect(() => {
    setParentRect(parentRef.current?.getBoundingClientRect() ?? null);
    setDraggableRect(draggableRef.current?.getBoundingClientRect() ?? null);
  }, [parentRef.current, draggableRef.current, windowDimensions.width, windowDimensions.height]);

  function onMouseMove(e: MouseEvent) {
    e.preventDefault();
    if (!parentRect || !draggableRect) return;

    const offsetX = draggableWidth / 2;
    const offsetY = draggableHeight / 2;

    const x = e.clientX - parentRect.left - offsetX;
    const y = e.clientY - parentRect.top - offsetY;

    setX(clamp(x, 0, availableWidth));
    setY(clamp(y, 0, availableHeight));
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
      className="relative h-full w-full cursor-pointer bg-neutral-700"
      role="button"
      tabIndex={-1}
      onMouseDown={(e) => {
        e.preventDefault();
        if (!parentRect || !draggableRect) return;

        draggableRef.current?.focus();

        const offsetX = draggableWidth / 2;
        const offsetY = draggableHeight / 2;
        const newX = e.clientX - parentRect.left - offsetX;
        const newY = e.clientY - parentRect.top - offsetY;

        setX(clamp(newX, 0, availableWidth));
        setY(clamp(newY, 0, availableHeight));

        setEventListeners();
      }}
    >
      <div
        ref={draggableRef}
        role="button"
        tabIndex={0}
        className="absolute h-4 w-4 cursor-grab rounded-full border border-black bg-white active:cursor-grabbing"
        onMouseDown={(e) => {
          e.preventDefault();
          if (!parentRect || !draggableRect) return;

          draggableRef.current?.focus();

          setEventListeners();
        }}
        onKeyDown={(e) => {
          if (!parentRect || !draggableRect) return;

          const axis = e.key === "ArrowUp" || e.key === "ArrowDown" ? "y" : "x";
          const stepCount = e.shiftKey ? 5 : 10;
          const increment = axis === "x" ? availableWidth / stepCount : availableHeight / stepCount;

          if (e.key === "ArrowUp") {
            setY(clamp(y - increment, 0, availableHeight));
          }

          if (e.key === "ArrowDown") {
            setY(clamp(y + increment, 0, availableHeight));
          }

          if (e.key === "ArrowLeft") {
            setX(clamp(x - increment, 0, availableWidth));
          }

          if (e.key === "ArrowRight") {
            setX(clamp(x + increment, 0, availableWidth));
          }
        }}
        style={{ transform: `translate(${x}px, ${y}px)` }}
      ></div>
    </div>
  );
}
