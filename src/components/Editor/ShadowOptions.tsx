import Button from "../ui/Button";
import CoordinateInput from "../ui/CoordinateInput";
import Popover from "../ui/Popover";
import Slider from "../ui/Slider";
import { HslColorPicker } from "react-colorful";
import Switch from "../ui/Switch";
import { useEditor } from "../../context/EditorContext";

export default function ShadowOptions() {
  const editor = useEditor();

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button fullWidth>Shadow Settings</Button>
      </Popover.Trigger>
      <Popover.Content onOpenAutoFocus={(e) => e.preventDefault()} className="min-w-[384px]">
        <div className="flex flex-col gap-4">
          <p className="border-b-2 border-b-neutral-200 text-sm text-neutral-500">
            Modify shadow settings
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex flex-col gap-2">
              <Slider
                name="Strength"
                min={0}
                max={10}
                defaultValue={[editor.imageOptions.shadow.strength]}
                onValueChange={(values) => {
                  editor.setImageOptions({
                    ...editor.imageOptions,
                    shadow: {
                      ...editor.imageOptions.shadow,
                      strength: values[0],
                    },
                  });
                }}
              />
            </div>
            <div className="aspect-square space-y-2">
              <p>Light Direction</p>
              <CoordinateInput
                min={-1}
                max={1}
                onValueChange={(values) => {
                  editor.setImageOptions({
                    ...editor.imageOptions,
                    shadow: {
                      ...editor.imageOptions.shadow,
                      direction: values,
                    },
                  });
                }}
              />
            </div>
            <div className="h-full space-y-2">
              <p>Color</p>
              <div className="flex h-full flex-col gap-2">
                <Popover>
                  <Popover.Trigger asChild>
                    <Button disabled={editor.imageOptions.shadow.adaptiveColor}>
                      Select Color
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content onOpenAutoFocus={(e) => e.preventDefault()}>
                    <HslColorPicker
                      color={editor.imageOptions.shadow.color}
                      onChange={(value) => {
                        editor.setImageOptions({
                          ...editor.imageOptions,
                          shadow: {
                            ...editor.imageOptions.shadow,
                            color: value,
                          },
                        });
                      }}
                    />
                  </Popover.Content>
                </Popover>
                <Switch
                  name="adaptive"
                  label="Adaptive"
                  checked={editor.imageOptions.shadow.adaptiveColor}
                  onCheckedChange={(checked) => {
                    editor.setImageOptions({
                      ...editor.imageOptions,
                      shadow: {
                        ...editor.imageOptions.shadow,
                        adaptiveColor: checked,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );
}
