import React from 'react';

interface LandingPageProps {
  onTopicChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onRowsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onColumnsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerate: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onTopicChange, onRowsChange, onColumnsChange, onGenerate }) => {
  return (
    <div className="landing-page">
      <h1>Math Worksheet Generator</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        onGenerate();
      }}>
        <div className="form-group">
          <label htmlFor="mathTopic">Math Topic:</label>
          <select id="mathTopic" onChange={onTopicChange}>
            <option value="addition">Addition</option>
            <option value="subtraction">Subtraction</option>
            <option value="multiplication">Multiplication</option>
            <option value="division">Division</option>
            {/* Add more math topics as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="rows">Number of Rows:</label>
          <input type="number" id="rows" min="1" defaultValue='3' onChange={onRowsChange} />
        </div>
        <div className="form-group">
          <label htmlFor="columns">Number of Columns:</label>
          <input type="number" id="columns" min="1"  defaultValue='3' onChange={onColumnsChange} />
        </div>
        <button type="submit" className="generate-btn">Generate Worksheet</button>
      </form>
    </div>
  );
};

export default LandingPage;
