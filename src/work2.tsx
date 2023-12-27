import React, { useState } from 'react';

type Problem = {
  problem: string;
  answer: string;
};

const WorksheetGen = () => {
  const [topic, setTopic] = useState('');
  const [numberOfProblems, setNumberOfProblems] = useState(5);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };

  const handleNumberOfProblemsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfProblems(parseInt(event.target.value, 10));
  };

  const generateWorksheet = async () => {
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
    <div>
      <input
        type="text"
        value={topic} 
        onChange={handleTopicChange}
        placeholder="Enter topic"
      />
      <input
        type="number"
        value={numberOfProblems}
        onChange={handleNumberOfProblemsChange}
        min="1"
        max="20"
      />
      <button onClick={generateWorksheet} disabled={isLoading}>
        Generate Worksheet
      </button>
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
    </div>
  );
};

export default WorksheetGen;
