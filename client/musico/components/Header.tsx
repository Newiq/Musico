'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="/sheets">Sheet Library</Link></li>
            <li>
              <a>Tools</a>
              <ul className="p-2">
                <li><Link href="/tools/tuner">Tuner</Link></li>
                <li><Link href="/tools/metronome">Metronome</Link></li>
              </ul>
            </li>
            <li><Link href="/dictionary">Dictionary</Link></li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">🎼Musico</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/sheets">Sheet Library</Link></li>
          <li>
            <details>
              <summary>Tools</summary>
              <ul className="p-2">
                <li><Link href="/tools/tuner">Tuner</Link></li>
                <li><Link href="/tools/metronome">Metronome</Link></li>
              </ul>
            </details>
          </li>
          <li><Link href="/dictionary">Dictionary</Link></li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <div className="form-control">
          <ThemeToggle />
        </div>
        <div className="dropdown dropdown-end">
          {user ? (
            <>
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="User avatar" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`} />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><span>{user.name}</span></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </>
          ) : (
            <Link href="/" className="btn btn-ghost">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}
        