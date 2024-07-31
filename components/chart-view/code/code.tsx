import CopyToClipboard from "../CopyToClipboard";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import typescript from "highlight.js/lib/languages/typescript";

hljs.registerLanguage("typescript", typescript);

type Props = {
  code: string | null;
  filename?: string;
  language?: string;
};
export default function Code({
  code,
  filename,
  language = "typescript",
}: Props) {

  if (!code) return null;

  const highlightedCode = hljs.highlight(code, {
    language,

  }).value;

  return (
    <div className="overflow-hidden rounded-lg">
      <div className="flex items-center justify-between bg-gradient-to-r from-neutral-900 to-neutral-800 py-2 pl-2 pr-4 text-sm">
        <span className="-mb-[calc(0.5rem+2px)] rounded-t-lg border-2 border-white/5 border-b-neutral-700 bg-neutral-800 px-4 py-2 ">
          {filename}
        </span>
        <CopyToClipboard code={code} />
      </div>
      {
        <div
        className="border-white/5 border-b-neutral-700 bg-neutral-800 p-2 h-[calc(100vh-16rem)] overflow-auto whitespace-pre text-sm"
          dangerouslySetInnerHTML={{
            __html: highlightedCode,
          }}
        />
      }
    </div>
  );
}
