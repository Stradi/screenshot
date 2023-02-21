import { useEditor } from "../context/EditorContext";
import { cn } from "../utils/tw";

export default function Canvas() {
  const editor = useEditor();

  const aspectRatioToTailwindClass = {
    "1:1": "aspect-square",
    "4:3": "aspect-[4/3]",
    "16:9": "aspect-[16/9]",
    "21:9": "aspect-[21/9]",
  };

  return (
    <div
      className={cn(
        "h-[calc(100vh-4rem)] w-full overflow-hidden p-2",
        "flex items-center justify-center"
      )}
    >
      <div
        className={cn(
          "flex items-center overflow-hidden",
          "bg-gradient-to-tr from-red-500 to-blue-700",
          "max-h-full transition-[aspect-ratio] duration-300 ease-in-out",
          aspectRatioToTailwindClass[editor.aspectRatio]
        )}
      >
        <div
          className={cn("max-h-full shadow-2xl shadow-black/75", "overflow-hidden")}
          style={{
            borderRadius: `${editor.roundness}px`,
            scale: `${editor.size / 100}`,
          }}
        >
          <div className={cn("h-8 w-full", "bg-black text-center text-white")}>Header</div>
          <img src="https://placekitten.com/1024/767" alt="Kitten" />
        </div>
      </div>
    </div>
  );
}
