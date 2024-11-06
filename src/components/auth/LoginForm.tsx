import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  userType?: 'admin' | 'team' | 'official' | 'player' | 'fan';
}

const LoginForm: React.FC<LoginFormProps> = ({ userType = 'player' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUserType, setSelectedUserType] = useState(userType);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // In a real app, you would validate credentials against an API
    // For demo purposes, we'll use some basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Mock successful login
    login(selectedUserType);
    navigate(`/${selectedUserType}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-md">
        <div className="rounded-[4px] bg-white px-8 py-12 shadow">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your KBF portal account
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-[4px] bg-red-50 p-4 text-sm text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                Portal Type
              </label>
              <select
                id="userType"
                value={selectedUserType}
                onChange={(e) => setSelectedUserType(e.target.value as typeof userType)}
                className="mt-1 block w-full rounded-[4px] border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="admin">Admin Portal</option>
                <option value="team">Team Manager Portal</option>
                <option value="official">Officials Portal</option>
                <option value="player">Player Portal</option>
                <option value="fan">Fan Portal</option>
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-[4px] border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-[4px] border border-gray-300 px-3 py-2 pr-10 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-orange-600 hover:text-orange-500">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-[4px] bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-gray-600 hover:text-gray-500">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;