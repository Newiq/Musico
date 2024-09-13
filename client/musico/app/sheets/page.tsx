'use client'
import React, { useState } from 'react';

export default function SheetLibrary() {
const [files, setFiles] = useState<File[]>([]); 

const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
const file = event.target.files && event.target.files[0]; 
if (file) {
    setFiles([...files, file]);
}
};

return (
<div>
    <h1>Sheets Library</h1>
    {files.length > 0 ? (
    <ul>
        {files.map((file, index) => (
        <li key={index}>{file.name}</li> 
        ))}
    </ul>
    ) : (
    <p>It's empty here... fill it with your musical inspiration!💐</p>
    )}
    <div>
    <label htmlFor="file-upload" className="btn">
        Upload
    </label>
    <input
        id="file-upload"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
    />
    </div>
</div>
);
}
