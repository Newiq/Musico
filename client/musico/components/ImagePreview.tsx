'use client';
import React, { useEffect, useRef } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface ImagePreviewProps {
  pdf: string;
  containerWidth: number;
  containerHeight: number;
}

export default function ImagePreview({ pdf, containerWidth, containerHeight }: ImagePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);

  useEffect(() => {
    async function renderPDF() {
      try {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const pdfDocument = await pdfjs.getDocument(pdf).promise;


        const page = await pdfDocument.getPage(1);
        const viewport = page.getViewport({ scale: 1 });


        const scaleX = containerWidth / viewport.width;
        const scaleY = containerHeight / viewport.height;
        const scale = Math.min(scaleX, scaleY);

        const scaledViewport = page.getViewport({ scale });


        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        const renderContext = {
          canvasContext: ctx,
          viewport: scaledViewport,
        };


        renderTaskRef.current = page.render(renderContext);


        await renderTaskRef.current.promise;
      } catch (error) {
        console.error('Error rendering PDF:', error);
      }
    }


    renderPDF();

    return () => {
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pdf, containerWidth, containerHeight]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ width: containerWidth, height: containerHeight }} />
    </div>
  );
}
