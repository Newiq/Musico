'use client'
import { useTheme } from '../app/ThemeContext';

export default function ThemeToggle() {
  const { theme, changeTheme } = useTheme();

  return (
    <details className="dropdown dropdown-end">
      <summary className="btn">
        Theme
        <svg width="12px" height="12px" className="h-2 w-2 ml-2 fill-current opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </summary>
      <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><a onClick={() => changeTheme('lemonade')}>🍋 Lemonade</a></li>
        <li><a onClick={() => changeTheme('emerald')}>🥤 Milkshake</a></li>
        <li><a onClick={() => changeTheme('cupcake')}>🍰 Cupcake</a></li>
      </ul>
    </details>
  );
} 