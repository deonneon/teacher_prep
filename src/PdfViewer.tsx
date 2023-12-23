import React from 'react';

type PdfViewerProps = {
  pdfBlob: Blob;
};

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfBlob }) => {
  const pdfUrl = URL.createObjectURL(pdfBlob);

  return (
    <iframe src={pdfUrl} width="100%" height="500px" />
  );
};

export default PdfViewer;