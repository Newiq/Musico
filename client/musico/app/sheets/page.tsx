'use client'
import React, { useEffect, useState } from 'react';
import { fetchSheetsList, uploadSheet } from '../utils/api';
import Link from 'next/link';

export default function SheetLibrary() {
    interface Sheet {
        _id: string;  
        title: string;
        pdf: string; 
    }

    const [sheets, setSheets] = useState<Sheet[]>([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchSheets = async () => {
            try {
                const response = await fetchSheetsList();
                console.log("Fetched sheets:", response.data.data); 
                setSheets(response.data.data); 
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch sheets', error);
            }
        };
        fetchSheets();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (file && title) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);

            try {
                const response = await uploadSheet(formData);
                console.log('File uploaded successfully:', response.data);
                const updatedResponse = await fetchSheetsList();
                setSheets(updatedResponse.data.data); 
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            alert('Please provide a title and choose a file.');
        }
    };

    return (
        <div className='min-h-screen'>
            <h1>Sheets Library</h1>

            <form onSubmit={handleUpload} style={{ marginBottom: '20px' }}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Enter sheet title"
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </label>
                {/* <label>
                    Upload PDF:
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </label> */}
                <label className="form-control w-full max-w-xs">
                    <input 
                    type="file" 
                    accept="application/pdf"
                    className="file-input file-input-bordered w-full max-w-xs" 
                    onChange={handleFileChange}
                    required
                    />
                    </label>
                <button type="submit" style={{ marginTop: '10px' }}>Upload Sheet</button>
            </form>
            
            {loading ? (
                <p>Loading sheets...</p>
            ) : (
                sheets.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                        {sheets.map((sheet) => (
                            <div key={sheet._id} className="w-32 h-48 overflow-hidden border border-gray-300 m-2">
                                <Link href={`/singlesheet?id=${sheet._id}`}>
                                    <div style={{
                                        backgroundColor: '#ccc',
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <p>Sheet {sheet.title}</p>
                                    </div>
                                </Link>
                                
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>It's empty here... fill it with your musical inspiration!💐</p>
                )
            )}
            <div className="join">
                <input
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label="1"
                    defaultChecked />
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
                </div>
        </div>
        
    );
}
