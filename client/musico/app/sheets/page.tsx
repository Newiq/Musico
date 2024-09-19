'use client';
import React, { useEffect, useState } from 'react';
import { fetchSheetsList, uploadSheet } from '../utils/api';
import Link from 'next/link';
import ImagePreview from '../../components/ImagePreview';

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
        <div className='min-h-screen p-4'>
            <h1 className="text-3xl font-bold mb-4">Sheets Library</h1>
            <button className="btn mb-2" onClick={() => document.getElementById('my_modal_3')?.showModal()}>+</button>
            <dialog id="my_modal_3" className="modal">
    <div className="modal-box relative">
        <form method="dialog" onSubmit={handleUpload}>
        <button 
            type="button" 
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" 
            onClick={() => document.getElementById('my_modal_3')?.close()}
        >✕</button>

        <h2 className="text-lg font-bold text-center mb-4">Upload Sheets</h2>

        <div className="form-control w-full mb-4">
            <label className="label">
            <span className="label-text">Title:</span>
            </label>
            <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter sheet title"
            required
            className="input input-bordered w-full"
            />
        </div>

        <div className="form-control w-full mb-4">
            <label className="label">
            <span className="label-text">Upload file:</span>
            </label>
            <input 
            type="file" 
            accept="application/pdf"
            className="file-input file-input-bordered w-full"
            onChange={handleFileChange}
            required
            />
        </div>

        <div className="divider">🎧</div>

        <div className="flex justify-center">
            <button type="submit" className="btn btn-primary w-full">Upload Sheet</button>
        </div>
        </form>
    </div>
    </dialog>

            {loading ? (
                <p>Loading sheets...</p>
            ) : (
                sheets.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {sheets.map((sheet) => (
                            <div key={sheet._id} className="w-full h-auto border border-gray-300 p-2 rounded-md shadow-lg">
                                <Link href={`/singlesheet?id=${sheet._id}`}>
                                    <div>
                                        <ImagePreview pdf={`${process.env.NEXT_PUBLIC_API_URL}/files/${sheet.pdf}`} containerWidth={200} containerHeight={250} />
                                        <div className="text-center mt-2 text-sm">
                                            <p className='text-center mb-2'>{sheet.title}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>It's empty here... fill it with your musical inspiration!💐</p>
                )
            )}
        </div>
    );
}
