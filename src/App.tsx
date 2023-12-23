import React, { useState } from 'react';
import LandingPage from './LandingPage';
import './App.css'
import Modal from './Modal'; // Import the Modal component
import { BlobProvider } from '@react-pdf/renderer';
import MathWorksheetPDF from './MathWorksheetPDF'; // Import the PDF component


type MathProblem = {
  question: string;
  answer: number;
};

const App: React.FC = () => {
  const [mathTopic, setMathTopic] = useState<string>('addition');
  const [rows, setRows] = useState<number>(5);
  const [columns, setColumns] = useState<number>(5);
  const [worksheet, setWorksheet] = useState<MathProblem[][]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMathTopic(event.target.value);
  };

  const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRows(parseInt(event.target.value));
  };

  const handleColumnsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumns(parseInt(event.target.value));
  };

  const generateWorksheet = () => {
    const generatedWorksheet = WorksheetGenerator(mathTopic, rows, columns);
    setWorksheet(generatedWorksheet);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <LandingPage 
        onTopicChange={handleTopicChange}
        onRowsChange={handleRowsChange}
        onColumnsChange={handleColumnsChange}
        onGenerate={generateWorksheet}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
      <BlobProvider document={<MathWorksheetPDF worksheet={worksheet} />}>
          {({ blob, url, loading, error }) => {
            if (loading) {
              return <div>Loading PDF...</div>;
            }
            if (error) {
              return <div>Failed to load PDF</div>;
            }
            return (
              <div>
                {url && (
                  <>
                    <iframe src={url} style={{ width: '100%', height: '500px' }} />
                    <a href={url} download="math-worksheet.pdf">Download PDF</a>
                  </>
                )}
              </div>
            );
          }}
        </BlobProvider>
        <div className="worksheet-display">
          {worksheet.map((row, rowIndex) => (
            <div key={rowIndex} className="worksheet-row">
              {row.map((problem, problemIndex) => (
                <div key={problemIndex} className="worksheet-problem">
                  {problem.question}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default App;

// Worksheet Generator logic
function WorksheetGenerator(
  topic: string, 
  rows: number, 
  columns: number
): MathProblem[][] {
  const worksheet: MathProblem[][] = [];

  for (let i = 0; i < rows; i++) {
    const row: MathProblem[] = [];
    for (let j = 0; j < columns; j++) {
      row.push(generateProblem(topic));
    }
    worksheet.push(row);
  }

  return worksheet;
}

function generateProblem(topic: string): MathProblem {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;

  switch (topic) {
    case 'addition':
      return { question: `${num1} + ${num2}`, answer: num1 + num2 };
    case 'subtraction':
      return { question: `${num1} - ${num2}`, answer: num1 - num2 };
    case 'multiplication':
      return { question: `${num1} * ${num2}`, answer: num1 * num2 };
    case 'division':
      return { question: `${num1 * num2} / ${num1}`, answer: num2 }; // to avoid division by zero
    default:
      return { question: '', answer: 0 };
  }
}