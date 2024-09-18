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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const renderTaskRef = useRef<any>(null);
  const pdfDocRef = useRef<any>(null);

  useEffect(() => {
    let isCancelled = false;

    async function renderPDF() {
      try {
        const container = containerRef.current;
        if (!container) return;

        container.innerHTML = '';
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (renderTaskRef.current) {
          renderTaskRef.current.cancel();
        }

        if (pdfDocRef.current) {
          pdfDocRef.current.destroy();
        }

        const pdfDocument = await pdfjs.getDocument(pdf).promise;
        pdfDocRef.current = pdfDocument;

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

        if (isCancelled) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Error rendering PDF:', error);
        }
      }
    }

    renderPDF();

    return () => {
      isCancelled = true;

      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      if (pdfDocRef.current) {
        pdfDocRef.current.destroy();
      }
    };
  }, [pdf, containerWidth, containerHeight]);

  return (
    <div ref={containerRef} style={{ width: containerWidth, height: containerHeight }} />
  );
}
