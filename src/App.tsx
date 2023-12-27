import React, { useState } from 'react';
import LandingPage from './LandingPage';
import './App.css'
import Modal from './Modal'; // Import the Modal component
import { BlobProvider } from '@react-pdf/renderer';
import WorksheetPDF from './WorksheetPDF'; // Import the PDF component
import { ScaleLoader } from 'react-spinners';

type Problem = {
  problem: string;
  answer: string;
};

const App: React.FC = () => {
  const [topic, setTopic] = useState('Translate Spanish greetings');
  const [rows, setRows] = useState<number>(5);
  const [columns, setColumns] = useState<number>(5);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [numberOfProblems, setNumberOfProblems] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);

  const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    generateProblems();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const generateProblems = async () => {
    setIsLoading(true);
    setError(null);
    setProblems([]);

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
        onRowsChange={handleRowsChange}
        onColumnsChange={handleColumnsChange}
        onNumsetChange={handleNumsetChange}
        onGenerate={generateWorksheet}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <BlobProvider document={<WorksheetPDF problems={problems} />}>
          {({ blob, url, loading, error }) => {
            if (loading) {
              return (
                <div className="spinner-container">
                  <ScaleLoader
                    color="#36d7b7"
                    margin={10}
                    radius={60}
                    width={40}
                  />
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
        <div>This is the topic being fetched: { topic }</div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div>
          {problems.map((problem, index) => (
            <div key={index}>
              <p>{index + 1}. {problem.problem}</p>
              <p>Answer: {problem.answer}</p>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default App;