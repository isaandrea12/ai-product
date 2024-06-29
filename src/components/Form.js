import React, { useState } from 'react';
import axios from 'axios';
import jobRoles from '../assets/jobRoles.json';
import industries from '../assets/industries.json';
import experienceLevel from '../assets/experienceLevel.json';

const InterviewForm = () => {
  const [formData, setFormData] = useState({
    jobRole: '',
    industry: '',
    experienceLevel: '',
    numQuestions: 1,
  });

  const [interviewData, setInterviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state
  const [showAnswers, setShowAnswers] = useState(false); // State to manage showing answers

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/generate-interview', formData);
      setInterviewData(response.data);
    } catch (error) {
      console.error('Error generating interview questions:', error);
    } finally {
      setIsLoading(false); 
      setShowAnswers(false); 
    }
  };

  const handleShowAnswers = () => {
    setShowAnswers(true);
  };

  const toggleShowAnswers = () => {
    setShowAnswers(!showAnswers); 
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Generate Questions</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Job Role:</label>
          <select
            className="select select-bordered w-full"
            value={formData.jobRole}
            onChange={handleChange}
            name="jobRole"
            required
          >
            <option disabled value="">Select one</option>
            {jobRoles.map((role, index) => (
              <option key={index} value={role}>{role}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Industry:</label>
          <select
            className="select select-bordered w-full"
            value={formData.industry}
            onChange={handleChange}
            name="industry"
            required
          >
            <option disabled value="">Select one</option>
            {industries.map((industry, index) => (
              <option key={index} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Experience Level:</label>
          <select
            className="select select-bordered w-full"
            value={formData.experienceLevel}
            onChange={handleChange}
            name="experienceLevel"
            required
          >
            <option disabled value="">Select one</option>
            {experienceLevel.map((level, index) => (
              <option key={index} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-full">Generate Questions</button>
      </form>
      {isLoading && <span className="loading loading-spinner loading-md"></span>}
      {interviewData && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Interview Questions and Answers</h2>
          {interviewData.questions.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium mb-2"><strong>Question:</strong> {q.question}</p>
              {showAnswers && <p><strong>Answer:</strong> {q.answer}</p>}
              <button
                className="btn btn-secondary mt-2"
                onClick={toggleShowAnswers}
              >
                {showAnswers ? "Hide Answer" : "Show Answer"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewForm;
