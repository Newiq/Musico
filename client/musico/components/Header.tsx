import Link from 'next/link';
import React from 'react';

const Header = () => {
return (
<header className="bg-green-500 text-white text-center p-4">
    <div className="container mx-auto flex justify-between items-center">
    <h1 className="text-xl font-bold">Musico</h1>
    <nav>
        <ul className="flex space-x-4">
        <li><Link href={'/sheets'}>Music Sheet</Link></li>
        <li><Link href={'/tools'}>Music Tools</Link></li>
        <li><Link href={'/dictionary'}>Music Dictionary</Link></li>
        </ul>
    </nav>
    </div>
</header>
);
};

export default Header;
