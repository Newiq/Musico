'use client';
import React, { useRef, useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import PDFAnnotate from 'annotpdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfAnnotator() {
  const canvasRef = useRef(null);
  const pdfAnnotate = useRef(null);

  useEffect(() => {
    const initPdf = async () => {
      const pdfDocument = await pdfjs.getDocument('/path/to/pdf').promise;
      const page = await pdfDocument.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };

      await page.render(renderContext).promise;

      pdfAnnotate.current = new PDFAnnotate.default({
        documentId: 'pdf-doc',
        pdfDocument,
        page,
        canvas,
        ctx
      });

      pdfAnnotate.current.enableHighlight();
    };

    initPdf();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
      <button
        onClick={() => {
          pdfAnnotate.current.createHighlight({
            color: '#ff0',
            rects: [], 
          });
        }}
      >
        Highlight
      </button>
    </div>
  );
}
