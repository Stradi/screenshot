import { useEditor } from "../context/EditorContext";
import Slider from "./ui/Slider";

export default function Editor() {
  const editor = useEditor();

  return (
    <div>
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
    </div>
  );
}
