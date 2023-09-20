import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getUserInterviews from '@wasp/queries/getUserInterviews';

export function DashboardPage() {
  const { data: interviews, isLoading, error } = useQuery(getUserInterviews);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div>
      <h1>Dashboard</h1>
      {interviews.map((interview) => (
        <div key={interview.id}>      
          <h3>Interview ID: {interview.id}</h3>
          <p>User: {interview.user.username}</p>
          <p>Score: {interview.score}</p>
          <p>Job Description: {interview.jobDescription}</p>
          <p>Job Role: {interview.jobRole}</p>
          <Link to={`/interview/${interview.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}