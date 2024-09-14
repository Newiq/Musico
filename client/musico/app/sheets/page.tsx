'use client'
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { fetchSheetsList } from '../utils/api';
import Link from 'next/link';

pdfjs.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.min.mjs';

export default function SheetLibrary() {
    interface Sheet {
        id: number;
        title: string;
        description: string;
        file_path: string;
    }

    const [sheets, setSheets] = useState<Sheet[]>([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div>
            <h1>Sheets Library</h1>
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
