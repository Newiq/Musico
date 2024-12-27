'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function Hero() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswordHints, setShowPasswordHints] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const validatePassword = (pass: string) => {
    return PASSWORD_REGEX.test(pass);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      if (isRegister) {
        // Validate password for registration
        if (!validatePassword(password)) {
          setError('Password does not meet requirements');
          return;
        }

        // Register
        const response = await axios.post('/api/auth/register', {
          email,
          password,
          name
        });
        if (response.data.success) {
          setSuccess('Registration successful! You can now login.');
          // Clear form
          setEmail('');
          setPassword('');
          setName('');
          // Switch to login view after 2 seconds
          setTimeout(() => {
            setIsRegister(false);
            setSuccess('');
          }, 2000);
        }
      } else {
        // Login
        const response = await axios.post('/api/auth/login', {
          email,
          password,
        });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.reload();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  const passwordHints = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { text: 'Contains number', met: /\d/.test(password) },
    { text: 'Contains special character (@$!%*?&)', met: /[@$!%*?&]/.test(password) },
  ];

  if (user) {
    return (
      <div className="hero min-h-screen bg-base-200 rounded-md m-5">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <div className="flex items-center justify-center mb-8">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=96`} alt="User avatar" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-8">Welcome back, {user.name}! 🎵</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body">
                  <h2 className="card-title justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    Sheet Library
                  </h2>
                  <p>Access your music sheets and explore new pieces.</p>
                  <div className="card-actions justify-end">
                    <Link href="/sheets" className="btn btn-primary btn-sm">Open Library</Link>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body">
                  <h2 className="card-title justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Music Tools
                  </h2>
                  <p>Use our tuner, metronome, and other music tools.</p>
                  <div className="card-actions justify-end">
                    <Link href="/tools/tuner" className="btn btn-primary btn-sm">Open Tools</Link>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="card-body">
                  <h2 className="card-title justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Dictionary
                  </h2>
                  <p>Look up musical terms and definitions.</p>
                  <div className="card-actions justify-end">
                    <Link href="/dictionary" className="btn btn-primary btn-sm">Open Dictionary</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="stats shadow mt-8">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <div className="stat-title">Your Sheets</div>
                <div className="stat-value text-primary">0</div>
                <div className="stat-desc">Start adding your sheets</div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="stat-title">Practice Time</div>
                <div className="stat-value text-secondary">0h</div>
                <div className="stat-desc">Track your progress</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero bg-base-200 min-h-screen rounded-md m-5">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold ml-2">
            {isRegister ? 'Register now!' : 'Login now!'}
          </h1>
          <p className="py-6 ml-2">
            Musico is a music tool and score management platform that focuses on providing users with a series of practical music tools and score management functions.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="alert alert-success">
                <span>{success}</span>
              </div>
            )}
            {isRegister && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => isRegister && setShowPasswordHints(true)}
                required
              />
              {isRegister && showPasswordHints && (
                <div className="mt-2 text-sm">
                  <p className="font-semibold mb-1">Password requirements:</p>
                  <ul className="space-y-1">
                    {passwordHints.map((hint, index) => (
                      <li key={index} className={hint.met ? 'text-success' : 'text-error'}>
                        {hint.met ? '✓' : '○'} {hint.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="form-control mt-6">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isRegister && !validatePassword(password)}
              >
                {isRegister ? 'Register' : 'Login'}
              </button>
            </div>
            <div className="text-center mt-2">
              <button
                type="button"
                className="link link-hover"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setError('');
                  setSuccess('');
                  setPassword('');
                  setEmail('');
                  setName('');
                  setShowPasswordHints(false);
                }}
              >
                {isRegister
                  ? 'Already have an account? Login'
                  : 'Need an account? Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}