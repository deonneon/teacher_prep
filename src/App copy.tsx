import React, { useState } from 'react';
import PdfViewer from './PdfViewer'; // Import your PdfViewer component
import { createPDF, generateProblems } from './pdfGenerator'; // Import your PDF generation functions
import './App.css'

const MainApp = () => {
  const [pdfData, setPdfData] = useState<Blob | null>(null);

  const handleGenerateClick = async () => {
    try {
      const problems = generateProblems(10); // Adjust the number of problems as needed
      const pdfBlob = await createPDF(problems, 'public/background.png'); // Await the promise
      setPdfData(pdfBlob); // Update state with the resolved Blob
    } catch (error) {
      console.error("Error generating PDF: ", error);
      // Handle errors as needed
    }
  };

  return (
    <div className="app-container">
      <div className="button-container">
        <button onClick={handleGenerateClick} className="generate-button">
          Generate
        </button>
      </div>
      <div className="pdf-viewer-container">
        {pdfData && <PdfViewer pdfBlob={pdfData} />}
      </div>
    </div>
  );
};

export default MainApp;
