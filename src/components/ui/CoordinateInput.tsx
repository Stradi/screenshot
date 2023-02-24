import { useEffect, useRef, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import { mapRange } from "../../utils/math";

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

  // We could use useMemo here but it's probably not worth it.
  const normalizedX = Number.parseFloat(
    mapRange(x, 0, parentWidth - draggableWidth, min, max).toFixed(precision)
  );

  const normalizedY = Number.parseFloat(
    mapRange(y, 0, parentHeight - draggableHeight, min, max).toFixed(precision)
  );

  useEffect(() => {
    if (!parentRect || !draggableRect) return;
    onValueChange?.([normalizedX, normalizedY]);
  }, [x, y]);

  useEffect(() => {
    setParentRect(parentRef.current?.getBoundingClientRect() ?? null);
    setDraggableRect(draggableRef.current?.getBoundingClientRect() ?? null);
  }, [parentRef.current, draggableRef.current]);

  useEffect(() => {
    setParentRect(parentRef.current?.getBoundingClientRect() ?? null);
    setDraggableRect(draggableRef.current?.getBoundingClientRect() ?? null);
  }, [windowDimensions.width, windowDimensions.height]);

  function onMouseMove(e: MouseEvent) {
    e.preventDefault();
    if (!parentRect || !draggableRect) return;

    const offsetX = draggableWidth / 2;
    const offsetY = draggableHeight / 2;

    const x = e.clientX - parentRect.left - offsetX;
    const y = e.clientY - parentRect.top - offsetY;

    if (x < 0 || x > parentWidth - draggableWidth) {
      setX(x < 0 ? 0 : parentWidth - draggableWidth);
    } else {
      setX(x);
    }

    if (y < 0 || y > parentHeight - draggableHeight) {
      setY(y < 0 ? 0 : parentHeight - draggableHeight);
    } else {
      setY(y);
    }
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
      className="relative h-32 w-32 cursor-pointer bg-neutral-700"
      role="button"
      tabIndex={-1}
      onMouseDown={(e) => {
        e.preventDefault();
        if (!parentRect || !draggableRect) return;

        const offsetX = draggableWidth / 2;
        const offsetY = draggableHeight / 2;
        const newX = e.clientX - parentRect.left - offsetX;
        const newY = e.clientY - parentRect.top - offsetY;

        if (newX < 0 || newX > parentWidth - draggableWidth) {
          setX(newX < 0 ? 0 : parentWidth - draggableWidth);
        } else {
          setX(newX);
        }

        if (newY < 0 || newY > parentHeight - draggableHeight) {
          setY(newY < 0 ? 0 : parentHeight - draggableHeight);
        } else {
          setY(newY);
        }

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

          setEventListeners();
        }}
        style={{ transform: `translate(${x}px, ${y}px)` }}
      ></div>
    </div>
  );
}
