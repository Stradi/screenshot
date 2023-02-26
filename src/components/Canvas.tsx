import React, { useEffect } from "react";
import { useEditor } from "../context/EditorContext";
import { shadowBuilder } from "../utils/shadow";
import { cn } from "../utils/tw";

export default function Canvas() {
  const editor = useEditor();

  const [imageURL, setImageURL] = React.useState<string | undefined>(undefined);

  useEffect(() => {
    if (editor.imageFile) {
      setImageURL(URL.createObjectURL(editor.imageFile));
    }
  }, [editor.imageFile]);

  const imageRef = React.useRef<HTMLImageElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);

  const memoizedMaxHeight = React.useMemo(() => {
    if (editor.imageOptions.adaptive) {
      return "100%";
    }
    const imageHeight = imageRef.current?.clientHeight;
    const headerHeight = headerRef.current?.clientHeight;

    if (imageHeight && headerHeight) {
      return `${imageHeight + headerHeight}px`;
    }
  }, [editor.imageOptions.adaptive]);

  const aspectRatioToTailwindClass = {
    "1:1": "aspect-square",
    "4:3": "aspect-[4/3]",
    "16:9": "aspect-[16/9]",
    "21:9": "aspect-[21/9]",
  };

  return (
    <div
      className={cn(
        "mx-auto h-full max-h-0 min-h-full overflow-hidden p-2",
        "flex items-center justify-center"
      )}
    >
      <div
        ref={editor.imageRef as React.RefObject<HTMLDivElement>}
        className={cn(
          "flex max-h-full items-center overflow-hidden",
          "bg-gradient-to-tr from-red-500 to-blue-700",
          "transition-[aspect-ratio] duration-300 ease-in-out",
          aspectRatioToTailwindClass[editor.imageOptions.aspectRatio]
        )}
      >
        <div
          className={cn("overflow-hidden", "transition-[max-height] duration-300 ease-in-out")}
          style={{
            borderRadius: `${editor.imageOptions.roundness}px`,
            scale: `${editor.imageOptions.scale / 100}`,
            maxHeight: memoizedMaxHeight,
            boxShadow: shadowBuilder(editor.imageOptions.shadow),
          }}
        >
          <div ref={headerRef} className={cn("h-8 w-full", "bg-black text-center text-white")}>
            Header
          </div>
          <img ref={imageRef} src={imageURL} alt="Preview" />
        </div>
      </div>
    </div>
  );
}
