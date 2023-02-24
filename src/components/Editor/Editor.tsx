import { useEditor } from "../../context/EditorContext";
import Button from "../ui/Button";
import Popover from "../ui/Popover";
import Slider from "../ui/Slider";
import AspectRatioButton from "./AspectRatioButton";
import AspectRatioSelector from "./AspectRatioSelector";

export default function Editor() {
  const editor = useEditor();

  return (
    <div className="space-y-4">
      <Slider
        name="Roundness"
        min={0}
        max={24}
        defaultValue={[editor.imageOptions.roundness]}
        onValueChange={([value]) => {
          editor.setImageOptions({ ...editor.imageOptions, roundness: value });
        }}
      />
      <Slider
        name="Scale"
        min={25}
        max={150}
        defaultValue={[editor.imageOptions.scale]}
        onValueChange={([value]) => {
          editor.setImageOptions({ ...editor.imageOptions, scale: value });
        }}
      />
      <AspectRatioSelector />
    </div>
  );
}
