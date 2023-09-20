import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getInterview from '@wasp/queries/getInterview';
import transcribeResponseAndCompare from '@wasp/actions/transcribeResponseAndCompare';

export function InterviewPage() {
  const { interviewId } = useParams();
  const { data: interview, isLoading, error } = useQuery(getInterview, { interviewId });
  const transcribeAndCompare = useAction(transcribeResponseAndCompare);
  const [responses, setResponses] = useState({});

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleResponseSubmit = (question, response) => {
    setResponses({ ...responses, [question.id]: response });
    transcribeAndCompare({ interviewId, questionId: question.id, response });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Interview</h1>

      {interview.questions.map((question) => (
        <div key={question.id} className='mb-4 pb-4 border-b'>
          <h2 className='text-lg font-bold mb-2'>{question.text}</h2>

          <input
            type='text'
            className='px-4 py-2 border rounded mb-2'
            placeholder='Your response'
            onChange={(e) => handleResponseSubmit(question, e.target.value)}
          />
        </div>
      ))}

      <h2 className='text-lg font-bold mt-8'>Score: {interview.score}</h2>
      <div className='mt-4'>
        <Link to='/dashboard' className='text-blue-500'>Go to Dashboard</Link>
      </div>
    </div>
  );
}