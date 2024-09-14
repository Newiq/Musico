'use client'
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { fetchSheetById } from '../utils/api';
import { Sheet } from '../interfaces/sheets';

const SingleSheet = () => {
const [sheet, setSheet] = useState<Sheet | null>(null);

useEffect(() => {
const query = new URLSearchParams(window.location.search);
const id = query.get('id');

if (id) {
fetchSheetById(id).then(response => {
    setSheet(response.data);  
}).catch(error => {
    console.error('Failed to fetch sheet', error);
    setSheet(null);  
});
}
}, []);

if (!sheet) {
return <p>Loading...</p>;
}

return (
<div>
    <h1>{sheet.title}</h1>
    <Document
    file={sheet.file_path}
    onLoadSuccess={({ numPages }) => console.log(`Loaded a document with ${numPages} pages`)}
    onError={(error) => console.error('Failed to load PDF', error)}
    >
    <Page pageNumber={1} />
    </Document>
    <p>{sheet.description}</p>
</div>
);
};

export default SingleSheet;
