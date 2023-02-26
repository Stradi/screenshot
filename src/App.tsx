import { Canvas, Dropzone } from "./components/Canvas";
import Container from "./components/Container";
import { Editor } from "./components/Editor";
import { cn } from "./utils/tw";
import { useEditor } from "./context/EditorContext";
import NavigationBar from "./components/ui/NavigationBar";
import config from "./config";
import Footer from "./components/ui/Footer";

export default function App() {
  const editor = useEditor();

  return (
    <main className="flex h-screen flex-col gap-4">
      <NavigationBar items={config.navigation} />
      <Container
        className={cn(
          "grid grow grid-cols-1 gap-4 md:grid-cols-3",
          "[&>*]:w-full [&>*]:rounded-lg [&>*]:p-4",
          "[&>*]:border [&>*]:border-neutral-200 [&>*]:bg-neutral-50"
        )}
      >
        <div className="md:col-span-2 md:h-auto">
          {editor.imageFile ? <Canvas /> : <Dropzone />}
        </div>
        <div
          className={cn(
            "col-span-1",
            !editor.imageFile && "pointer-events-none cursor-not-allowed opacity-50"
          )}
        >
          <Editor />
        </div>
      </Container>
      <Footer />
    </main>
  );
}
