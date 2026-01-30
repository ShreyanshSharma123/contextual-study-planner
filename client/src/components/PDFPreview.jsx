import { Document, Page } from "react-pdf";
import { useState } from "react";

export default function PDFPreview({ file }) {
  const [pages, setPages] = useState(null);

  if (!file) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm text-gray-400">
        PDF preview will appear here
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm overflow-auto h-125">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setPages(numPages)}
      >
        {Array.from(new Array(pages), (_, i) => (
          <Page key={i} pageNumber={i + 1} width={400} />
        ))}
      </Document>
    </div>
  );
}
