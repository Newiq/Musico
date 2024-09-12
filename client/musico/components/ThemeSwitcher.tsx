"use client"
import React, { useState } from 'react';

const ThemeSwitcher = () => {
const [theme, setTheme] = useState('theme1'); 
const toggleTheme = () => {
setTheme(theme === 'theme1' ? 'theme2': 'theme1');
};

return (
<div className={`bg-themes-${theme}-background text-themes-${theme}-text`}>
    <h1>Hello, switch the theme!</h1>
    <button onClick={toggleTheme}>Switch Theme</button>
</div>
);
};

export default ThemeSwitcher;
