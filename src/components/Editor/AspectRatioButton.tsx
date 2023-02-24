import { TAspectRatio, useEditor } from "../../context/EditorContext";
import Button, { ButtonProps } from "../ui/Button";

type Props = ButtonProps & {
  aspectRatio: TAspectRatio;
};

export default function AspectRatioButton({ aspectRatio, ...props }: Props) {
  const editor = useEditor();

  return (
    <Button
      outline
      active={editor.imageOptions.aspectRatio === aspectRatio}
      onClick={() => editor.setImageOptions({ ...editor.imageOptions, aspectRatio })}
      {...props}
    >
      {aspectRatio}
    </Button>
  );
}
