import Dropzone from "./components/Dropzone";
import Canvas from "./components/Canvas";
import Container from "./components/Container";
import Editor from "./components/Editor/Editor";
import { cn } from "./utils/tw";
import { useEditor } from "./context/EditorContext";

export default function App() {
  const editor = useEditor();

  return (
    <main className="flex h-screen flex-col">
      <nav>Navigation Bar</nav>
      <Container
        className={cn(
          "grid grow grid-cols-3 gap-4",
          "[&>*]:w-full [&>*]:rounded-lg [&>*]:p-4",
          "[&>*]:border [&>*]:border-neutral-200 [&>*]:bg-neutral-50"
        )}
      >
        <div className="col-span-2">{editor.imageFile ? <Canvas /> : <Dropzone />}</div>
        <div
          className={cn(
            "col-span-1",
            !editor.imageFile && "pointer-events-none cursor-not-allowed opacity-50"
          )}
        >
          <Editor />
        </div>
      </Container>
      <footer>Footer</footer>
    </main>
  );
}
