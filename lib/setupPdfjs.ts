let configured = false;

/** Configure pdf.js worker once on the client. */
export async function setupPdfjsWorker() {
  if (configured || typeof window === "undefined") {
    return;
  }

  const { pdfjs } = await import("react-pdf");

  // webpack.mjs sets workerPort via import.meta.url, which breaks in Next.js dev.
  pdfjs.GlobalWorkerOptions.workerPort = null;
  pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

  configured = true;
}
