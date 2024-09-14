'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Document, Page } from 'react-pdf';
import { fetchSheetsList, uploadSheet } from '../utils/api'; // 导入上传文件的API
import Link from 'next/link';
import PdfComp from '../PdfComp'; 
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function SheetLibrary() {
    interface Sheet {
        id: number;
        title: string;
        description: string;
        file_path: string;
    }

    const [sheets, setSheets] = useState<Sheet[]>([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf_viewer.min.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        const fetchSheets = async () => {
            try {
                const response = await fetchSheetsList();
                console.log("Fetched sheets:", response.data);
                setSheets(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch sheets', error);
            }
        };
        fetchSheets();

        return () => {
            document.head.removeChild(link);
        };
    }, []);

    // 处理文件上传的函数
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
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            alert('Please provide a title and choose a file.');
        }
    };

    const testPdfUrl = "http://www.pdf995.com/samples/pdf.pdf";
    
    return (
        <div>
            <h1>Sheets Library</h1>

            {/* 文件上传表单 */}
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
                <br />
                <label>
                    Upload PDF:
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        required
                        style={{ marginLeft: '10px' }}
                    />
                </label>
                <br />
                <button type="submit" style={{ marginTop: '10px' }}>Upload Sheet</button>
            </form>

            {/* 测试显示 PDF */}
            <PdfComp props={testPdfUrl} />
            {loading ? (
                <p>Loading sheets...</p>
            ) : (
                sheets.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                        {sheets.map((sheet) => (
                            <div key={sheet.id} className="w-32 h-48 overflow-hidden border border-gray-300 m-2">
                                <Link href={`/singlesheet?id=${sheet.id}`}>
                                    <Document
                                        file={sheet.file_path}
                                        onLoadSuccess={({ numPages }) => console.log('Document loaded with ', numPages, ' pages')}
                                        onError={(error) => console.error('Failed to load PDF', error)}
                                    >
                                        <Page pageNumber={1} width={150} />
                                    </Document>
                                </Link>
                                <div>{sheet.title}</div>
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
