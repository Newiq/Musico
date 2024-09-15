'use client'
import React, { useState } from 'react';
import TeoriaIntegration from '../../components/TeoriaIntegration';

export default function Home() {
const [term, setTerm] = useState('');
const [result, setResult] = useState(null);

const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault();
const teoriaResult = TeoriaIntegration(term);
setResult(teoriaResult);
};

return (
<div className="flex flex-col items-center mt-12 min-h-screen bg-base-100 text-base-content">
    <h1 className="text-5xl font-bold mb-6">Musico - Music Dictionary</h1>
    <form
    onSubmit={handleSearch}
    className="w-full max-w-lg mb-8 flex justify-center space-x-4"
    >
    <input
        type="text"
        placeholder="Enter music term (e.g., Cmaj7, minor scale)"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="input input-bordered input-success w-full max-w-xs"
        required
    />
    <button className="btn btn-primary" type="submit">
        Search
    </button>
    </form>

    {result && (
    <div className="card shadow-lg bg-base-200 w-full max-w-lg p-6">
        <h2 className="card-title text-lg mb-4">Result for: {term}</h2>
        <pre className="text-sm bg-base-300 p-4 rounded-lg">
        {JSON.stringify(result, null, 2)}
        </pre>
    </div>
    )}
    </div>
);
}
