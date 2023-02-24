import Button from "../ui/Button";
import Popover from "../ui/Popover";
import AspectRatioButton from "./AspectRatioButton";

export default function AspectRatioSelector() {
  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button fullWidth>Aspect Ratio</Button>
      </Popover.Trigger>
      <Popover.Content onOpenAutoFocus={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-4">
          <p className="border-b-2 border-b-neutral-200 text-sm text-neutral-400">
            Select aspect ratio
          </p>
          <div className="grid grid-cols-4 gap-2">
            <AspectRatioButton aspectRatio="1:1" />
            <AspectRatioButton aspectRatio="4:3" />
            <AspectRatioButton aspectRatio="16:9" />
            <AspectRatioButton aspectRatio="21:9" />
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );
}
