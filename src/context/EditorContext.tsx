import { createContext, useContext, useRef, useState } from "react";
import { toPng, toJpeg } from "html-to-image";

export interface EditorContextProps {
  imageRef: React.RefObject<HTMLElement>;

  size: number;
  roundness: number;
  aspectRatio: TAspectRatio;
  adapt: boolean;
  setSize: (value: number) => void;
  setRoundness: (value: number) => void;
  setAspectRatio: (value: TAspectRatio) => void;
  setAdapt: (value: boolean) => void;

  exportOptions: TExportOptions;
  setExportOptions: (value: TExportOptions) => void;
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
  const [size, setSize] = useState(defaultValues?.size ?? 0);
  const [roundness, setRoundness] = useState(defaultValues?.roundness ?? 0);
  const [aspectRatio, setAspectRatio] = useState(defaultValues?.aspectRatio ?? "1:1");
  const [adapt, setAdapt] = useState(defaultValues?.adapt ?? false);
  const [exportOptions, setExportOptions] = useState(
    defaultValues?.exportOptions ??
      ({
        format: "jpeg",
        quality: 0.95,
        scale: 1,
        width: 1000,
      } as TExportOptions)
  );

  const imageRef = useRef<HTMLElement>(null);

  function exportImage() {
    if (!imageRef.current) return Promise.reject("No image to export");

    const parsedAspectRatio = aspectRatio.split(":");
    const aspectWidth = Number.parseInt(parsedAspectRatio[0]);
    const aspectHeight = Number.parseInt(parsedAspectRatio[1]);

    const exportFunction = exportOptions.format === "jpeg" ? toJpeg : toPng;

    return exportFunction(imageRef.current, {
      quality: exportOptions.quality,
      pixelRatio: exportOptions.scale,
      canvasWidth: exportOptions.width,
      canvasHeight: exportOptions.width * (aspectHeight / aspectWidth),
    }).then((dataUrl: string) => {
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = `export.${exportOptions.format}`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    });
  }

  const values = {
    imageRef,

    size,
    roundness,
    aspectRatio,
    adapt,
    setSize,
    setRoundness,
    setAspectRatio,
    setAdapt,

    exportOptions,
    setExportOptions,
    exportImage,
  };

  return <EditorContext.Provider value={values}>{children}</EditorContext.Provider>;
}

export function useEditor() {
  return useContext(EditorContext);
}
