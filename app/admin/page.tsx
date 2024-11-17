'use client'

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminLogin: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Authentication logic here
    if (username === 'admin' && password === 'password') {
      // Redirect to dashboard or admin home if login is successful
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='max-w-md mx-auto py-6'>
      <h2 className='text-2xl font-bold text-yellow-500 mb-4'>Admin Login</h2>
      <form onSubmit={handleLogin} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm'
          />
        </div>
        <button
          type="submit"
          className='w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
