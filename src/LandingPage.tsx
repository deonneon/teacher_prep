import React from "react";

interface LandingPageProps {
  onTopicChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRowsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onColumnsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNumsetChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerate: () => void;
  rows: number;
  columns: number;
  numProblems: number;
}

const LandingPage: React.FC<LandingPageProps> = ({
  rows,
  columns,
  numProblems,
  onTopicChange,
  onRowsChange,
  onColumnsChange,
  onNumsetChange,
  onGenerate,
}) => {
  return (
    <div className="landing-page">
      <h1>Practice Worksheet Generator</h1>
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          onGenerate();
        }}
      >
        <div className="form-group">
          <h4>
            A dynamic tool designed to help educators create customized
            worksheets tailored to their curriculum needs. Input your topic and
            let our AI do the rest, generating high-quality, relevant questions
            that challenge and engage your students.
          </h4>
          <label htmlFor="topic">Enter Your Topic:</label>
          <input
            type="text"
            id="topic"
            onChange={onTopicChange}
            placeholder="Be Specific!"
          />
          <div className="hint-topic">
            <i>
              Hint: The more specific the topic is, the more relevant the
              questions will be.
            </i>
          </div>
        </div>
        <div className="form-group">
          <p>
            <b>Customize Worksheet Layout: </b>Choose the number of problems,
            rows, and columns for your worksheet.
          </p>
          <label htmlFor="problems">Number of Problems:</label>
          <input
            type="number"
            id="problems"
            min="1"
            value={numProblems}
            onChange={onNumsetChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="columns">Number of Columns:</label>
          <input
            type="number"
            id="columns"
            min="1"
            value={columns}
            onChange={onColumnsChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rows">Number of Rows:</label>
          <input
            type="number"
            id="rows"
            min="1"
            value={rows}
            disabled={columns === 1}
            onChange={onRowsChange}
          />
        </div>
        <button type="submit" className="generate-btn">
          Generate Worksheet
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
