'use client'
import React from 'react';
import { useTheme } from '../app/ThemeContext';

const Footer = () => {
const { theme } = useTheme(); 
return (
<footer className="text-center p-4" data-theme={theme}>
    <div>Contact | Help | About</div>
</footer>
);
};

export default Footer;
