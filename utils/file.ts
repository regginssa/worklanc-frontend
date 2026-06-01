export const getFileIcon = (file: File): string => {
  const type = file.type;
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

  if (type.startsWith("image/")) return "mdi:file-image-box";
  if (type.startsWith("video/")) return "mdi:file-video-box";
  if (type.startsWith("audio/")) return "mdi:file-music-box";

  if (type === "application/pdf" || extension === "pdf")
    return "mdi:file-pdf-box";

  if (["doc", "docx"].includes(extension) || type.includes("word"))
    return "mdi:file-word-box";

  if (
    ["xls", "xlsx", "csv"].includes(extension) ||
    type.includes("sheet") ||
    type.includes("excel")
  )
    return "mdi:file-excel-box";

  if (
    ["ppt", "pptx"].includes(extension) ||
    type.includes("presentation") ||
    type.includes("powerpoint")
  )
    return "mdi:file-powerpoint-box";

  if (
    ["zip", "rar", "7z", "tar", "gz"].includes(extension) ||
    type.includes("zip") ||
    type.includes("compressed")
  )
    return "mdi:folder-zip-outline";

  if (type.startsWith("text/") || ["txt", "md"].includes(extension))
    return "mdi:file-document-outline";

  return "mdi:file-outline";
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
};
