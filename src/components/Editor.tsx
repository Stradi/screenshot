import { useEditor } from "../context/EditorContext";
import Slider from "./ui/Slider";

export default function Editor() {
  const editor = useEditor();

  return (
    <div className="space-y-4">
      <Slider
        onValueChange={([value]) => {
          editor.setRoundness(value);
        }}
        name="Roundness"
        defaultValue={[editor.roundness]}
        min={0}
        max={24}
      />
      <Slider
        name="Size"
        defaultValue={[editor.size]}
        min={25}
        max={150}
        onValueChange={([value]) => {
          editor.setSize(value);
        }}
      />
    </div>
  );
}
