'use client'
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
const [theme, setTheme] = useState('lemonade');

const changeTheme = (newTheme) => {
setTheme(newTheme);
};

return (
<ThemeContext.Provider value={{ theme, changeTheme }}>
    {children}
</ThemeContext.Provider>
);
};
