import "./AnalysisResult.css";

function AnalysisResult({ analysis }) {
  return (
    <div className="analysis-container">
      <h2>Resume Analysis</h2>

      <div className="score-card">
        <h2>Resume Score</h2>
        <h1>{analysis.score}/100</h1>
      </div>

      <div className="analysis-section">
        <h3>Strengths</h3>

        <ul>
          {analysis.strengths?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="analysis-section">
        <h3>Weaknesses</h3>

        <ul>
          {analysis.weaknesses?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="analysis-section">
        <h3>Missing Skills</h3>

        <ul>
          {analysis.missingSkills?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="analysis-section">
        <h3>ATS Suggestions</h3>

        <ul>
          {analysis.atsSuggestions?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="analysis-section">
        <h3>Recommendations</h3>

        <ul>
          {analysis.recommendations?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AnalysisResult;
