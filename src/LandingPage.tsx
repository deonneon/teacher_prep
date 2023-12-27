import React from 'react';

interface LandingPageProps {
  onTopicChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRowsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onColumnsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNumsetChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerate: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onTopicChange, onRowsChange, onColumnsChange, onNumsetChange, onGenerate }) => {
  return (
    <div className="landing-page">
      <h1>Practice Worksheet Generator</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        onGenerate();
      }}>
        <div className="form-group">
          <label htmlFor="topic">Enter Topic:</label>
          <input
            type="text"
            id="topic"
            defaultValue="Two Digit Multiplications"
            onChange={onTopicChange}
            placeholder="Enter topic"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rows">Number of Rows:</label>
          <input type="number" id="rows" min="1" defaultValue='3' onChange={onRowsChange} />
        </div>
        <div className="form-group">
          <label htmlFor="columns">Number of Columns:</label>
          <input type="number" id="columns" min="1" defaultValue='3' onChange={onColumnsChange} />
        </div>
        <div className="form-group">
          <label htmlFor="problems">Number of Problems:</label>
          <input type="number" id="problems" min="1" defaultValue='10' onChange={onNumsetChange} />
        </div>
        <button type="submit" className="generate-btn">Generate Worksheet</button>
      </form>
    </div>
  );
};

export default LandingPage;
