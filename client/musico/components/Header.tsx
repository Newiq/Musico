'use client'
import { useTheme } from '../app/ThemeContext';
import Link from 'next/link';

const Header = () => {
const { theme, changeTheme } = useTheme();

return (
<header className={`p-4`} data-theme={theme}>
    <div className="container mx-auto flex justify-between items-center">
    <h1 className="text-xl font-bold">Musico</h1>
    <nav>
        <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6">
            <li>
                <a href="/" className="tooltip" data-tip="Home">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                </a>
            </li>
            <li>
                <a href="/sheets" className="tooltip" data-tip="Sheet Library">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h10V4H7zm2 4h6m-6 4h6m-6 4h6"
                />
            </svg>

                </a>
                
            </li>
            <li>
                <a href="/tools" className="tooltip" data-tip="Music Tools">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </a>
            </li>
            <li>
            <a href="/dictionary" className="tooltip" data-tip="Music Dictionary">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            </a>
            </li>
        </ul>
    </nav>
    
    <details className="dropdown dropdown-end">
        <summary className="btn m-1">Choose Theme
                <svg
                    width="12px"
                    height="12px"
                    className="inline-block h-2 w-2 fill-current opacity-60"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048">
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
        </summary>
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={() => changeTheme('lemonade')}>🍋Lemonade</a></li>
            <li><a onClick={() => changeTheme('emerald')}>🥤Milkshake</a></li>
            <li><a onClick={() => changeTheme('cupcake')}>🍰Cupcake</a></li>
        </ul>
    </details>
    </div>
</header>
);
};

export default Header;
