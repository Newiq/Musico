'use client'
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PdfComp from '../PdfComp'; 
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function TestPDF() {
    const testPdfUrl = "http://www.pdf995.com/samples/pdf.pdf";

    return (
        <div>
            <PdfComp props={testPdfUrl} />
            <PdfComp pdfFile="http://www.pdf995.com/samples/pdf.pdf" />
        </div>
    );
}
