"use client";

import dynamic from "next/dynamic";

const PortfolioPdfPreview = dynamic(() => import("./PortfolioPdfPreview"), {
  ssr: false,
  loading: () => null,
});

type PortfolioPdfPreviewGateProps = {
  file: File;
  previewUrl: string;
};

export default function PortfolioPdfPreviewGate(
  props: PortfolioPdfPreviewGateProps
) {
  return <PortfolioPdfPreview {...props} />;
}
