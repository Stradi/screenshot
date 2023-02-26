import { FastAverageColor } from "fast-average-color";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { toPng, toJpeg } from "html-to-image";
import { rgbToHsl } from "../utils/math";

export type TAspectRatio = "1:1" | "4:3" | "16:9" | "21:9";
export type TExportOptions = {
  width: number;
  height: number;
  quality: number;
  scale: number;
  format: "png" | "jpeg";

  status: "exporting" | "idle";
};
export type TShadowOptions = {
  strength: number;
  direction: [number, number];
  adaptiveColor: boolean;
  color: {
    h: number;
    s: number;
    l: number;
  };
};

export type TImageOptions = {
  scale: number;
  roundness: number;
  aspectRatio: TAspectRatio;
  adaptive: boolean;
  shadow: TShadowOptions;
};

export interface EditorContextProps {
  imageRef: React.RefObject<HTMLElement>;

  imageOptions: TImageOptions;
  exportOptions: TExportOptions;
  imageFile: File | null;

  setImageOptions: (value: TImageOptions) => void;
  setExportOptions: (value: TExportOptions) => void;
  setImageFile: (value: File | null) => void;

  exportImage: () => void;
}

export const EditorContext = createContext<EditorContextProps>({} as EditorContextProps);

// Don't include the "set" prefix in the default values
export type EditorProviderProps = React.PropsWithChildren<{
  defaultValues?: Partial<
    Pick<EditorContextProps, OmitStartsWith<keyof EditorContextProps, "set">>
  >;
}>;

export function EditorProvider({ children, defaultValues }: EditorProviderProps) {
  const [imageOptions, setImageOptions] = useState(
    defaultValues?.imageOptions ??
      ({
        scale: 75,
        roundness: 16,
        aspectRatio: "4:3",
        adaptive: true,
        shadow: {
          strength: 4,
          direction: [0, -1],
          adaptiveColor: true,
          color: {
            h: 0,
            s: 0,
            l: 0,
          },
        },
      } as TImageOptions)
  );

  const [exportOptions, setExportOptions] = useState(
    defaultValues?.exportOptions ??
      ({
        format: "jpeg",
        quality: 0.95,
        scale: 1,
        width: 1000,
        height: 1000,
        status: "idle",
      } as TExportOptions)
  );

  const imageRef = useRef<HTMLElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    const parsedAspectRatio = imageOptions.aspectRatio.split(":");
    const aspectWidth = Number.parseInt(parsedAspectRatio[0]);
    const aspectHeight = Number.parseInt(parsedAspectRatio[1]);

    setExportOptions((prev) => ({
      ...prev,
      height: Math.round(prev.width * (aspectHeight / aspectWidth)),
    }));
  }, [exportOptions.width, imageOptions.aspectRatio]);

  function exportImage() {
    if (!imageRef.current) return Promise.reject("No image to export");
    setExportOptions((prev) => ({ ...prev, status: "exporting" }));

    const exportFunction = exportOptions.format === "jpeg" ? toJpeg : toPng;

    return exportFunction(imageRef.current, {
      quality: exportOptions.quality,
      pixelRatio: exportOptions.scale,
      canvasWidth: exportOptions.width,
      canvasHeight: exportOptions.height,
    }).then((dataUrl: string) => {
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = `export.${exportOptions.format}`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      setExportOptions((prev) => ({ ...prev, status: "idle" }));
    });
  }

  const values = {
    imageRef,

    imageOptions,
    exportOptions,
    imageFile,

    setImageOptions,
    setExportOptions,
    setImageFile,

    exportImage,
  };

  useEffect(() => {
    const fac = new FastAverageColor();
    const imgElement = imageRef.current?.querySelector("img");
    if (!imgElement) return;

    const color = fac.getColor(imgElement, {
      algorithm: "dominant",
    }).value;
    const hsl = rgbToHsl(color[0], color[1], color[2]);

    setImageOptions((prev) => ({
      ...prev,
      shadow: {
        ...prev.shadow,
        color: {
          h: hsl[0],
          s: hsl[1],
          l: hsl[2],
        },
      },
    }));
  }, [imageOptions.shadow.adaptiveColor, imageRef.current]);

  return <EditorContext.Provider value={values}>{children}</EditorContext.Provider>;
}

export function useEditor() {
  return useContext(EditorContext);
}
