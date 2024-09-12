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
        <ul className="menu menu-horizontal p-0">
            <li><Link href="/sheets">Music Sheet</Link></li>
            <li><Link href="/tools">Music Tools</Link></li>
            <li><Link href="/dictionary">Music Dictionary</Link></li>
        </ul>
    </nav>
        {/* <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
        </ul> */}
        <details className="dropdown dropdown-end">
        <summary className="btn m-1">Choose Theme</summary>
        <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><a onClick={() => changeTheme('lemonade')}>Lemonade</a></li>
        <li><a onClick={() => changeTheme('emerald')}>Emerald</a></li>
        <li><a onClick={() => changeTheme('cupcake')}>Cupcake</a></li>
        </ul>
        </details>

    </div>
</header>
);
};

export default Header;
