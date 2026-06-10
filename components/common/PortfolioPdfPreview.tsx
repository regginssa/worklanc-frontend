"use client";

import { useEffect, useState } from "react";
import { Button, IconButton } from "../atoms";
import { setupPdfjsWorker } from "@/lib/setupPdfjs";
import PortfolioPdfLoading, {
  PortfolioPdfProgress,
} from "./PortfolioPdfLoading";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

type PortfolioPdfPreviewProps = {
  file: File;
  previewUrl: string;
};

export default function PortfolioPdfPreview({
  file,
  previewUrl,
}: PortfolioPdfPreviewProps) {
  const [PdfModule, setPdfModule] = useState<{
    Document: typeof import("react-pdf").Document;
    Page: typeof import("react-pdf").Page;
  } | null>(null);
  const [initError, setInitError] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(12);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setupPdfjsWorker()
      .then(() => import("react-pdf"))
      .then((mod) => {
        if (!cancelled) {
          setPdfModule({ Document: mod.Document, Page: mod.Page });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setInitError(
            err instanceof Error ? err.message : "Failed to load PDF viewer"
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (initError) {
    return (
      <p className="text-sm text-red-600">
        Could not initialize PDF viewer: {initError}
      </p>
    );
  }

  if (!PdfModule) {
    return <PortfolioPdfLoading fileName={file.name} />;
  }

  const { Document, Page } = PdfModule;

  return (
    <div className="flex items-start gap-4">
      <div className="relative h-[266px] w-[200px] overflow-hidden rounded-lg border border-slate-300">
        {isLoading && !loadError && (
          <div className="absolute inset-0 z-10 flex flex-col justify-center gap-3 bg-white p-4">
            <PortfolioPdfProgress
              fileName={file.name}
              progress={loadProgress}
            />
          </div>
        )}

        <Document
          file={file}
          onLoadProgress={({ loaded, total }) => {
            if (total > 0) {
              setLoadProgress(Math.min(95, Math.round((loaded / total) * 100)));
            }
          }}
          onLoadSuccess={({ numPages: total }) => {
            setNumPages(total);
            setLoadProgress(100);
            setIsLoading(false);
            setLoadError(null);
          }}
          onLoadError={(err) => {
            setIsLoading(false);
            setLoadError(err?.message ?? "Could not load PDF");
          }}
          loading={null}
          error={
            <div className="flex h-full items-center justify-center p-4 text-center text-xs text-red-500">
              {loadError ?? "Could not load PDF"}
            </div>
          }
        >
          <Page pageNumber={1} width={200} renderTextLayer={false} />
        </Document>

        {!isLoading && !loadError && (
          <IconButton
            variant="outline"
            icon="mdi:eye-outline"
            className="absolute bg-white! left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            onClick={() =>
              window.open(previewUrl, "_blank", "noopener,noreferrer")
            }
          />
        )}
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-light">{file.name}</h4>
        <p className="text-sm text-slate-600">
          {loadError
            ? loadError
            : isLoading
            ? "Loading pages…"
            : `${numPages} page${numPages === 1 ? "" : "s"} uploaded`}
        </p>
        <Button
          type="outline"
          isSubmit={false}
          label="View"
          size="medium"
          icon="mdi:external-link"
          classname="py-2! px-4! rounded-full! text-sm! font-medium!"
          disabled={isLoading}
          onClick={() =>
            window.open(previewUrl, "_blank", "noopener,noreferrer")
          }
        />
      </div>
    </div>
  );
}
