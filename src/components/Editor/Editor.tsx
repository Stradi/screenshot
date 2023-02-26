import { useEditor } from "../../context/EditorContext";
import Slider from "../ui/Slider";
import AspectRatioSelector from "./AspectRatioSelector";
import ShadowOptions from "./ShadowOptions";

export default function Editor() {
  const editor = useEditor();
  return (
    <div className="space-y-4">
      <Slider
        name="Roundness"
        min={0}
        max={24}
        value={[editor.imageOptions.roundness]}
        onValueChange={([value]) => {
          editor.setImageOptions({ ...editor.imageOptions, roundness: value });
        }}
      />
      <Slider
        name="Scale"
        min={25}
        max={150}
        value={[editor.imageOptions.scale]}
        onValueChange={([value]) => {
          editor.setImageOptions({ ...editor.imageOptions, scale: value });
        }}
      />
      <AspectRatioSelector />
      <ShadowOptions />
    </div>
  );
}
