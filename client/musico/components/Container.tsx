"use client"
import React, { ReactNode } from 'react';
import { useTheme } from '../app/ThemeContext';
interface MainContainerProps {
children: ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
    const { theme } = useTheme(); 
return (
<div className={"mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"} data-theme={theme}>
    {children}
</div>
);
};

export default MainContainer;
