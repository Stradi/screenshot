import * as _Slider from "@radix-ui/react-slider";
import { cn } from "../../utils/tw";

type Props = _Slider.SliderProps;

export default function Slider({ defaultValue, name, onValueChange, value, ...props }: Props) {
  function _onValueChange(newValue: number[]) {
    onValueChange?.(newValue);
  }

  return (
    <div className={cn("grid grid-cols-12 items-center gap-4")}>
      <label className={cn("col-span-4 truncate font-medium")} htmlFor={name}>
        {name}
      </label>

      <_Slider.Root
        className={cn("relative col-span-6 flex w-full items-center", "touch-none select-none")}
        value={value}
        onValueChange={_onValueChange}
        {...props}
      >
        <_Slider.Track className={cn("relative h-2 grow rounded-full bg-neutral-300")}>
          <_Slider.Range className={cn("absolute h-full rounded-full", "bg-neutral-900")} />
        </_Slider.Track>
        <_Slider.Thumb
          className={cn(
            "block h-4 w-4 rounded-full bg-white",
            "border-2 border-neutral-900 transition-all duration-100",
            "hover:cursor-pointer hover:ring-2 hover:ring-neutral-900 hover:ring-offset-2",
            "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
          )}
        />
      </_Slider.Root>
      <span
        className={cn(
          "col-span-2 rounded-lg px-1 py-0.5",
          "border-2 border-neutral-300",
          "select-none text-center text-sm font-medium"
        )}
      >
        {value ?? defaultValue}
      </span>
    </div>
  );
}
