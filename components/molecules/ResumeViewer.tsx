import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export type ResumeViewerProps = {
  file: File;
};

type FileKind = "pdf" | "txt" | "docx" | "doc" | "unknown";

const PREVIEW_CLASS =
  "h-full w-full max-w-full min-w-0 overflow-y-auto rounded-lg border border-slate-200 bg-white";

const DOCX_PREVIEW_CLASS = `${PREVIEW_CLASS} overflow-x-auto`;
const DOCX_MOUNT_CLASS = "resume-docx-preview w-full max-w-full min-w-0";

function getFileKind(file: File): FileKind {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const mime = file.type;

  if (mime === "application/pdf" || ext === "pdf") return "pdf";
  if (mime === "text/plain" || ext === "txt") return "txt";
  if (
    ext === "docx" ||
    mime ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "docx";
  }
  if (ext === "doc" || mime === "application/msword") return "doc";
  return "unknown";
}

function clearContainer(container: HTMLElement) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function ResumeViewerImpl({ file }: ResumeViewerProps) {
  const [docxMount, setDocxMount] = useState<HTMLDivElement | null>(null);
  const kind = getFileKind(file);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (kind === "docx") return;

    let cancelled = false;
    let objectUrl: string | null = null;

    const load = async () => {
      setLoading(true);
      setError(null);
      setPreviewUrl(null);
      setTextContent(null);
      setHtmlContent(null);

      try {
        switch (kind) {
          case "pdf": {
            objectUrl = URL.createObjectURL(file);
            if (!cancelled) setPreviewUrl(objectUrl);
            break;
          }
          case "txt": {
            const text = await file.text();
            if (!cancelled) setTextContent(text);
            break;
          }
          case "doc": {
            try {
              const mammoth = (await import("mammoth")).default;
              const buffer = await file.arrayBuffer();
              const result = await mammoth.convertToHtml({
                arrayBuffer: buffer,
              });
              if (!cancelled) setHtmlContent(result.value);
            } catch {
              objectUrl = URL.createObjectURL(file);
              if (!cancelled) setPreviewUrl(objectUrl);
            }
            break;
          }
          default:
            if (!cancelled) setError("Unsupported file type for preview.");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Could not load preview."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file, kind]);

  useEffect(() => {
    if (kind !== "docx" || !docxMount) return;

    let cancelled = false;

    const renderDocx = async () => {
      setLoading(true);
      setError(null);

      try {
        const container = docxMount;
        if (cancelled) return;

        clearContainer(container);

        const { renderAsync } = await import("docx-preview");
        const buffer = await file.arrayBuffer();
        if (cancelled) return;

        await renderAsync(buffer, container, container, {
          className: "docx",
          inWrapper: true,
          ignoreWidth: true,
        });
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Could not load DOCX preview."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    renderDocx();

    return () => {
      cancelled = true;
      clearContainer(docxMount);
    };
  }, [file, kind, docxMount]);

  if (kind === "docx") {
    return (
      <div className={`${DOCX_PREVIEW_CLASS} relative`}>
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
            <p className="text-sm text-slate-500">Loading preview…</p>
          </div>
        )}
        {error && !loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white px-4 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        <div ref={setDocxMount} className={DOCX_MOUNT_CLASS} />
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`${PREVIEW_CLASS} flex items-center justify-center bg-slate-50`}
      >
        <p className="text-sm text-slate-500">Loading preview…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`${PREVIEW_CLASS} flex items-center justify-center bg-slate-50 px-4 text-center`}
      >
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (kind === "pdf" && previewUrl) {
    return (
      <div className={`${PREVIEW_CLASS} overflow-x-hidden bg-white p-0`}>
        <iframe
          src={previewUrl}
          title={`Preview of ${file.name}`}
          className="block h-full min-h-[min(480px,60vh)] w-full max-w-full border-0"
        />
      </div>
    );
  }

  if (kind === "txt" && textContent !== null) {
    return (
      <pre
        className={`${PREVIEW_CLASS} whitespace-pre-wrap p-4 font-sans text-sm leading-relaxed text-slate-800`}
      >
        {textContent || "(empty file)"}
      </pre>
    );
  }

  if (kind === "doc" && htmlContent) {
    return (
      <div
        className={`${PREVIEW_CLASS} p-4 text-sm leading-relaxed text-slate-800`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    );
  }

  if (kind === "doc" && previewUrl) {
    return (
      <div className={PREVIEW_CLASS}>
        <object
          data={previewUrl}
          type="application/msword"
          className="h-full min-h-[min(480px,60vh)] w-full"
        >
          <div className="flex h-full min-h-[min(480px,60vh)] flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-sm text-slate-600">
              Your browser cannot preview .doc files inline.
            </p>
            <a
              href={previewUrl}
              download={file.name}
              className="text-sm font-medium text-blue-600 underline"
            >
              Download {file.name}
            </a>
          </div>
        </object>
      </div>
    );
  }

  return (
    <div
      className={`${PREVIEW_CLASS} flex items-center justify-center bg-slate-50 px-4 text-center`}
    >
      <p className="text-sm text-slate-500">Nothing to preview.</p>
    </div>
  );
}

export const ResumeViewer = dynamic(
  () => Promise.resolve({ default: ResumeViewerImpl }),
  {
    ssr: false,
    loading: () => (
      <div
        className={`${PREVIEW_CLASS} flex items-center justify-center bg-slate-50`}
      >
        <p className="text-sm text-slate-500">Loading preview…</p>
      </div>
    ),
  }
);
