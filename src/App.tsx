import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import './App.css'
import Modal from './Modal'; // Import the Modal component
import { BlobProvider } from '@react-pdf/renderer';
import WorksheetPDF from './WorksheetPDF'; // Import the PDF component
import { ScaleLoader } from 'react-spinners';
import backgroundImage1 from './background/b1.png';
import backgroundImage2 from './background/b2.png';
import backgroundImage3 from './background/b3.png';
import backgroundImage4 from './background/b4.png';
import backgroundImage5 from './background/b5.jpeg';
import backgroundImage6 from './background/b6.jpeg';
import backgroundImage7 from './background/b7.jpeg';
import backgroundImage8 from './background/b8.jpeg';

// ... import other images

// In App.tsx
const allImages = [backgroundImage1,
  backgroundImage2,
  backgroundImage3,
  backgroundImage4,
  backgroundImage5,
  backgroundImage6,
  backgroundImage7,
  backgroundImage8];


type Problem = {
  problem: string;
  answer: string;
};

const App: React.FC = () => {
  const [topic, setTopic] = useState('Translate Spanish greetings');
  const [rows, setRows] = useState<number>(5);
  const [columns, setColumns] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [numberOfProblems, setNumberOfProblems] = useState<number>(8);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>(backgroundImage1);
  const [borderVisible, setBorderVisible] = useState<boolean>(true);


  const changeBackground = (image: string) => {
    setBackgroundImage(image);
  };

  useEffect(() => {
    if (columns === 1) {
      setRows(numberOfProblems);
    }
  }, [columns, numberOfProblems]);

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
      // const response = await fetch('http://localhost:3001/generate-problems', {
      const response = await fetch('/.netlify/functions/openaiAPI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, numberOfProblems })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProblems(data.problems);
      console.log(data.problems)
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
        rows={rows}
        columns={columns}
        numProblems={numberOfProblems}
      />
      <Modal isOpen={isModalOpen} onClose={closeModal} onChangeBackground={changeBackground} backgroundImages={allImages} borderVisible={borderVisible} setBorderVisible={setBorderVisible} >
        <BlobProvider document={<WorksheetPDF problems={problems} rows={rows} columns={columns} backgroundImage={backgroundImage} borderVisible={borderVisible} />}>
          {({ blob, url, loading, error }) => {
            if (loading || isLoading) {
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
                    <div>
                      <embed src={url} className="pdf-iframe" type="application/pdf" title="Large Screen PDF" />
                      {/* embed div is better than iframe */}
                    </div>
                    <a href={url} download="math-worksheet.pdf" className="download-button">
                      Download PDF
                    </a>
                  </>
                )}
              </div>
            );
          }}
        </BlobProvider>
      </Modal>
      {/* <div>This is the topic being fetched: {topic}</div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div>
        {problems.map((problem, index) => (
          <div key={index}>
            <p>{index + 1}. {problem.problem}</p>
            <p>Answer: {problem.answer}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default App;