"use client";
import { useEffect } from 'react';

    function Success({ onClose }: { onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(() => {
        onClose(); 
        }, 3000); 

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div role="alert" className="alert alert-success shadow-lg">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Your music sheet has been uploaded!</span>
        </div>
        </div>
    );
    }

    export default Success;
