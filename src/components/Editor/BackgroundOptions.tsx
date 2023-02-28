import { HslaStringColorPicker } from "react-colorful";
import { useEditor } from "../../context/EditorContext";
import Button from "../ui/Button";
import { PaletteIcon } from "../ui/Icon";
import Popover from "../ui/Popover";
import Tabs from "../ui/Tabs";
import ColorGrid from "./ColorGrid";

export default function BackgroundOptions() {
  const editor = useEditor();

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button fullWidth>Background Settings</Button>
      </Popover.Trigger>
      <Popover.Content onOpenAutoFocus={(e) => e.preventDefault()} className="min-w-[384px]">
        <Tabs defaultValue="gradient">
          <Tabs.List>
            <Tabs.Trigger value="gradient">Gradient</Tabs.Trigger>
            <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="gradient">TODO</Tabs.Content>
          <Tabs.Content value="solid">
            <div className="flex flex-col gap-2">
              <ColorGrid
                columns={9}
                colors={[
                  "#00000000",
                  "#ffffffff",
                  "#000000ff",
                  "#ff0000ff",
                  "#00ff00ff",
                  "#0000ffff",
                  "#ffff00ff",
                  "#ff00ffff",
                  "#00ffffff",
                ]}
                onColorSelect={(color) =>
                  editor.setBackgroundOptions({ ...editor.backgroundOptions, color })
                }
                selectedColor={editor.backgroundOptions.color}
              />
              <Popover>
                <Popover.Trigger asChild>
                  <Button outline>
                    <PaletteIcon size="sm" />
                    &nbsp;&nbsp;
                    <span>Custom Color</span>
                  </Button>
                </Popover.Trigger>
                <Popover.Content onOpenAutoFocus={(e) => e.preventDefault()}>
                  <HslaStringColorPicker
                    onChange={(color) =>
                      editor.setBackgroundOptions({
                        ...editor.backgroundOptions,
                        color,
                      })
                    }
                    color={editor.backgroundOptions.color}
                  />
                </Popover.Content>
              </Popover>
            </div>
          </Tabs.Content>
        </Tabs>
      </Popover.Content>
    </Popover>
  );
}
