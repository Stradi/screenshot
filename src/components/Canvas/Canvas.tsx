import React, { useEffect } from "react";
import { useEditor } from "../../context/EditorContext";
import { shadowBuilder } from "../../utils/shadow";
import { cn } from "../../utils/tw";
import { Safari } from "./Headers";

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
        "mx-auto h-full min-h-full overflow-hidden p-2 md:max-h-0",
        "flex items-center justify-center"
      )}
    >
      <div
        ref={editor.imageRef as React.RefObject<HTMLDivElement>}
        className={cn(
          "flex max-h-full items-center overflow-hidden",
          "transition-[aspect-ratio] duration-300 ease-in-out",
          aspectRatioToTailwindClass[editor.imageOptions.aspectRatio],
          editor.backgroundOptions.color.endsWith("00") && "bg-transparent ring-1 ring-neutral-300"
        )}
        style={{
          background: editor.backgroundOptions.color,
        }}
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
          <Safari />
          <img ref={imageRef} src={imageURL} alt="Preview" />
        </div>
      </div>
    </div>
  );
}
