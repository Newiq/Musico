'use client'
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { fetchSheetsList } from '../utils/api';
pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";

export default function SheetLibrary() {
    interface Sheet {
        id: number;
        name: string;
        description: string;
        file_path: string;
    }

    const [sheets, setSheets] = useState<Sheet[]>([]);

    useEffect(() => {
        const fetchSheets = async () => {
            try {
                const response = await fetchSheetsList(); 
                setSheets(response.data);
            } catch (error) {
                console.error('Failed to fetch sheets', error);
            }
        };
        fetchSheets();
    }, []);

    return (
        <div>
            <h1>Sheets Library</h1>
            {sheets.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {sheets.map((sheet) => (
                        <div key={sheet.id} className="w-32 h-48 overflow-hidden border border-gray-300 m-2">
                            <Document
                                file={sheet.file_path}
                                onLoadSuccess={({ numPages }) => console.log('Document loaded with ', numPages, ' pages')}
                            >
                                <Page pageNumber={1} width={150} />
                            </Document>
                            <div>{sheet.name}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>It's empty here... fill it with your musical inspiration!💐</p>
            )}
        </div>
    );
}
