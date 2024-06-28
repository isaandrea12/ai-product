import React, { useState } from 'react';
import axios from 'axios';

const InterviewForm = () => {
  const [formData, setFormData] = useState({
    jobRole: '',
    industry: '',
    experienceLevel: '',
  });

  const [interviewData, setInterviewData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/generate-interview', formData);
      setInterviewData(response.data);
    } catch (error) {
      console.error('Error generating interview questions:', error);
    }
  };

  return (
    <div className="container">
      <h1>Interview Preparation Tool</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Job Role:</label>
          <input type="text" name="jobRole" value={formData.jobRole} onChange={handleChange} required />
        </div>
        <div>
          <label>Industry:</label>
          <input type="text" name="industry" value={formData.industry} onChange={handleChange} required />
        </div>
        <div>
          <label>Experience Level:</label>
          <input type="text" name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} required />
        </div>
        <button type="submit">Generate Questions</button>
      </form>
      {interviewData && (
        <div className="results">
          <h2>Interview Questions and Answers</h2>
          {interviewData.questions.map((q, index) => (
            <div key={index}>
              <p><strong>Question:</strong> {q.question}</p>
              <p><strong>Answer:</strong> {q.answer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewForm;
