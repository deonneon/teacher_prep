import React, { useState } from 'react';
import LandingPage from './LandingPage';
import './App.css'
import Modal from './Modal'; // Import the Modal component
import { BlobProvider } from '@react-pdf/renderer';
import MathWorksheetPDF from './MathWorksheetPDF'; // Import the PDF component
import { CircleLoader } from 'react-spinners';


type MathProblem = {
  question: string;
  answer: number;
};

type Problem = {
  problem: string;
  answer: string;
};

const App: React.FC = () => {
  const [mathTopic, setMathTopic] = useState<string>('addition');
  const [topic, setTopic] = useState('');
  const [rows, setRows] = useState<number>(5);
  const [columns, setColumns] = useState<number>(5);
  const [worksheet, setWorksheet] = useState<MathProblem[][]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [numberOfProblems, setNumberOfProblems] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);

  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMathTopic(event.target.value);
  };

  const handleTopicChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };

  const handleRowsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRows(parseInt(event.target.value));
  };

  const handleColumnsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumns(parseInt(event.target.value));
  };

  const handleNumsetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfProblems(parseInt(event.target.value, 10));
  };

  const generateWorksheet = () => {
    const generatedWorksheet = WorksheetGenerator(mathTopic, rows, columns);
    setWorksheet(generatedWorksheet);
    generateWorksheet2();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const generateWorksheet2 = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/generate-problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, numberOfProblems })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data || !data.choices || !data.choices[0]) {
        throw new Error('Invalid response format');
      }

      setProblems(JSON.parse(data.choices[0].text).problems);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='app-container'>
      <LandingPage
        onTopicChange={handleTopicChange}
        onTopicChange2={handleTopicChange2}
        onRowsChange={handleRowsChange}
        onColumnsChange={handleColumnsChange}
        onNumsetChange={handleNumsetChange}
        onGenerate={generateWorksheet}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <BlobProvider document={<MathWorksheetPDF worksheet={worksheet} />}>
          {({ blob, url, loading, error }) => {
            if (loading) {
              return (
                <div className="spinner-container">
                  <CircleLoader /* Additional props like size and color can go here */ />
                </div>
              );
            }
            if (error) {
              return <div>Failed to load PDF</div>;
            }
            return (
              <div>
                {url && (
                  <>
                    <iframe src={url} className="pdf-iframe" title="Worksheet PDF"></iframe>
                    <a href={url} download="math-worksheet.pdf" className="download-button">
                      Download PDF
                    </a>
                  </>
                )}
              </div>
            );
          }}
        </BlobProvider>
        {/* <div className="worksheet-display">
          {worksheet.map((row, rowIndex) => (
            <div key={rowIndex} className="worksheet-row">
              {row.map((problem, problemIndex) => (
                <div key={problemIndex} className="worksheet-problem">
                  {problem.question}
                </div>
              ))}
            </div>
          ))}
        </div> */}
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div>
          {problems.map((problem, index) => (
            <div key={index}>
              <p>Problem: {problem.problem}</p>
              <p>Answer: {problem.answer}</p>
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
