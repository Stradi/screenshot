import { createContext, useContext, useState } from "react";

export interface EditorContextProps {
  size: number;
  roundness: number;
  aspectRatio: TAspectRatio;
  adapt: boolean;
  setSize: (value: number) => void;
  setRoundness: (value: number) => void;
  setAspectRatio: (value: TAspectRatio) => void;
  setAdapt: (value: boolean) => void;
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

  const values = {
    size,
    roundness,
    aspectRatio,
    adapt,
    setSize,
    setRoundness,
    setAspectRatio,
    setAdapt,
  };

  return <EditorContext.Provider value={values}>{children}</EditorContext.Provider>;
}

export function useEditor() {
  return useContext(EditorContext);
}
