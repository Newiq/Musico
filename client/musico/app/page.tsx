'use client'
import { useTheme } from '../app/ThemeContext';
export default function Home() {
  const { theme } = useTheme(); 
  return (
    <div className="min-h-screen" data-theme={theme}>

    </div>
  );
}
