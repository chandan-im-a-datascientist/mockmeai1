import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAction } from '@wasp/actions';

export function HomePage() {
  const createInterviewFn = useAction(createInterviewFromResumeAndJobRole);
  const history = useHistory();
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState(null);
  const [jobRole, setJobRole] = useState('');

  const handleCreateInterview = async () => {
    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    formData.append('resume', resume);
    formData.append('jobRole', jobRole);

    await createInterviewFn(formData);
    history.push('/interview');
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <label htmlFor='jobDescription'>Job Description</label>
        <textarea
          id='jobDescription'
          className='border rounded p-2'
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder='Enter job description...'
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='resume'>Upload Resume</label>
        <input
          id='resume'
          type='file'
          onChange={(e) => setResume(e.target.files[0])}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='jobRole'>Job Role</label>
        <input
          id='jobRole'
          className='border rounded p-2'
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          placeholder='Enter job role...'
        />
      </div>
      <button
        onClick={handleCreateInterview}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Start Interview
      </button>
    </div>
  );
}