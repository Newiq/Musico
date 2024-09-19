'use client'
import React, { useState } from 'react';
import TeoriaIntegration from '../../components/TeoriaIntegration';
import DictionaryNav from '@/components/DictionaryNav';

export default function Home() {
  const [term, setTerm] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const teoriaResult = TeoriaIntegration(term);
    setResult(teoriaResult);
  };

  const handleTermClick = (clickedTerm: string) => {
    const teoriaResult = TeoriaIntegration(clickedTerm);
    setTerm(clickedTerm);
    setResult(teoriaResult);
  };

  return (
    <div>
      <h1 className="text-5xl font-bold mt-6 mb-6 w-full text-center">Music Dictionary</h1>
      <div className='flex'>
        <DictionaryNav onTermClick={handleTermClick} />
        <div className="flex flex-col items-center mt-12 min-h-screen bg-base-100 text-base-content w-10/12">
          <form
            onSubmit={handleSearch}
            className="w-full max-w-lg mb-8 flex justify-center space-x-4"
          >
        
            <div className="join  w-full flex">
                <div className='flex-1 justify-center'>
                    <div>
                    <input placeholder="Enter music term (e.g., Cmaj7, minor scale)"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="input input-bordered join-item input-secondary w-full max-w-2xl"
                    required />
                    </div>
                </div>
                
                <div className="indicator">
                    <span className="indicator-item badge badge-secondary">new</span>
                    <button className="btn btn-primary join-item" type="submit">Search</button>
                </div>
                </div>
          </form>

          {result && (
            <div className="card shadow-lg bg-base-200 w-full max-w-lg p-6">
              <h2 className="card-title text-lg mb-4">Result for: {term}</h2>
              <pre className="text-sm bg-base-300 p-4 rounded-lg w-full text-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}