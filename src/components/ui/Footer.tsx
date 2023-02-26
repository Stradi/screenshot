export default function Footer() {
  return (
    <footer className="space-y-1 border-t border-t-neutral-300 bg-neutral-100 py-2 text-center text-xs font-medium">
      <p>
        Built with ❤️ and ☕ by{" "}
        <a href="https://www.batin.sh" target="_blank" rel="noreferrer" className="underline">
          Batın
        </a>
      </p>
      <p>Copyright&copy; {new Date().getFullYear()}</p>
    </footer>
  );
}
