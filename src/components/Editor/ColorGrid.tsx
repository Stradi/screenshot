import React from "react";
import { cn } from "../../utils/tw";

interface Props {
  columns?: number;
  colors: string[];
  selectedColor?: string;
  onColorSelect?: (color: string) => void;
}

export default function ColorGrid({ columns = 4, colors, selectedColor, onColorSelect }: Props) {
  const [selected, setSelected] = React.useState<string | null>(selectedColor ?? null);

  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${Math.min(columns, colors.length)}, 1fr)`,
      }}
    >
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => {
            setSelected(color);
            onColorSelect?.(color);
          }}
          className={cn(
            "relative h-8 w-full rounded-full",
            "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 focus:ring-offset-neutral-100",
            "transition duration-100",
            selected == color && "ring-2 ring-neutral-900",
            color === "#ffffffff" && "border border-gray-200",
            color.endsWith("00") && "border border-gray-200" // Transparent
          )}
          style={{
            background: color.endsWith("00")
              ? "linear-gradient(45deg, #cccccc 25%, transparent 25%), linear-gradient(-45deg, #cccccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cccccc 75%), linear-gradient(-45deg, transparent 75%, #cccccc 75%)"
              : color,
            backgroundSize: "15px 15px",
          }}
        />
      ))}
    </div>
  );
}
