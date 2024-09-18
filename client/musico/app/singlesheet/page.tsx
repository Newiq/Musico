'use client';
import React, { useEffect, useState } from 'react';
import { fetchSheetById } from '../utils/api';
import { Sheet } from '../interfaces/sheets';
import PdfComp from '../PdfComp';
import { pdfjs } from 'react-pdf';
import ToolsNav from '@/components/ToolsNav';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const SingleSheet = () => {
const [sheet, setSheet] = useState<Sheet | null>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
const query = new URLSearchParams(window.location.search);
const id = query.get('id');

if (id) {
    fetchSheetById(id).then((response) => {
    setSheet(response.data.data);
    setLoading(false);
    }).catch(error => {
    console.error('Failed to fetch sheet', error);
    setSheet(null);
    setLoading(false);
    });
} else {
    setLoading(false);
}
}, []);

if (loading) {
return <p>Loading...</p>;
}

if (!sheet) {
return <p>Sheet not found.</p>;
}

const pdfFilePath = `${process.env.NEXT_PUBLIC_API_URL}/files/${sheet.pdf}`;

return (
<div>
    <h1>{sheet.title}</h1>
    <div className='flex'>
        <ToolsNav sheetId={sheet._id} />
        <PdfComp pdfFile={pdfFilePath} />
    </div>
    
</div>
);
};

export default SingleSheet;
