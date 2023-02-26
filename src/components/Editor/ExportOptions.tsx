import { useEditor } from "../../context/EditorContext";
import { cn } from "../../utils/tw";
import Button from "../ui/Button";
import Popover from "../ui/Popover";
import Slider from "../ui/Slider";

export default function ExportOptions() {
  const editor = useEditor();

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button fullWidth>Export</Button>
      </Popover.Trigger>
      <Popover.Content onOpenAutoFocus={(e) => e.preventDefault()} className="w-96">
        <div className="relative flex flex-col gap-4">
          <p className="border-b-2 border-b-neutral-200 text-sm font-medium text-neutral-500">
            Select export options
          </p>
          <div className="space-y-4">
            <div>
              <Slider
                name="Width"
                min={0}
                max={4096}
                step={256}
                value={[editor.exportOptions.width]}
                onValueChange={([value]) => {
                  editor.setExportOptions({ ...editor.exportOptions, width: value });
                }}
              />
              <div className="grid grid-cols-12 gap-4">
                <p className="col-span-10 font-medium">Height</p>
                <span
                  className={cn(
                    "col-span-2 rounded-lg px-1 py-0.5",
                    "border-2 border-neutral-300",
                    "select-none text-center text-sm font-medium"
                  )}
                >
                  {editor.exportOptions.height}
                </span>
              </div>
            </div>
            <Slider
              name="Pixel Ratio"
              min={1}
              max={4}
              value={[editor.exportOptions.scale]}
              onValueChange={([value]) => {
                editor.setExportOptions({ ...editor.exportOptions, scale: value });
              }}
            />
            <Button
              fullWidth
              onClick={() => {
                editor.exportImage();
              }}
            >
              Export Now
            </Button>
          </div>
        </div>
        {editor.exportOptions.status === "exporting" && (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center rounded-lg bg-black/90">
            <p className="font-medium text-white">Exporting image...</p>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
