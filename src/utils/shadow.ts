import { TShadowOptions } from "../context/EditorContext";

export function shadowBuilder(options: TShadowOptions) {
  const { strength, direction, color } = options;
  const [x, y] = direction;

  const resolution = 4;
  const finalShadow = [];

  for (let i = 1; i < resolution + 1; i++) {
    const shadow = `
      ${i * -x * strength}px
      ${i * -y * strength}px
      ${i * strength * 3}px
      ${i * strength * 0.75}px
      hsla(${color.h}, ${color.s}%, ${color.l}%, ${strength / 25})`;
    finalShadow.push(shadow);
  }

  return finalShadow.join(", ");
}
