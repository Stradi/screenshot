import { useDropzone } from "react-dropzone";
import { useEditor } from "../context/EditorContext";
import { cn } from "../utils/tw";

export default function Dropzone() {
  const editor = useEditor();

  function onDrop(acceptedFiles: File[]) {
    editor.setImageFile(acceptedFiles[0]);
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    onDrop,
    multiple: false,
  });

  return (
    <section className="flex h-full w-full items-center justify-center">
      <div
        className={cn(
          "aspect-video w-5/6 rounded-lg",
          "border-2 border-dashed border-neutral-300 bg-neutral-200",
          "transition-all duration-100 hover:border-neutral-400 hover:bg-neutral-300"
        )}
      >
        <div
          {...getRootProps({
            className: "w-full h-full",
          })}
        >
          <input {...getInputProps()} />
          <div className="flex h-full w-full select-none flex-col items-center justify-center gap-4 p-4 text-center hover:cursor-pointer">
            <h2 className="text-3xl font-bold">Drag Your Image</h2>
            <p className="text-lg">Alternatively, you can click here and select</p>
          </div>
        </div>
      </div>
    </section>
  );
}
