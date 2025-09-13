
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { SparklesIcon } from '../components/icons';

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-cream p-4">
      <div className="w-full max-w-sm mx-auto text-center">
        <SparklesIcon className="w-16 h-16 text-brand-purple mx-auto" />
        <h1 className="mt-4 text-4xl font-bold text-brand-charcoal">HeartSync</h1>
        <p className="mt-2 text-gray-600">Connect deeper, one day at a time.</p>

        <div className="mt-10 space-y-4">
          <input 
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:outline-none"
            defaultValue="alex@example.com"
          />
          <input 
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-purple focus:outline-none"
            defaultValue="password123"
          />
          <button
            onClick={login}
            className="w-full bg-brand-purple-dark text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Sign In
          </button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-brand-cream text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={login}
            className="w-full flex items-center justify-center bg-white border border-gray-300 text-brand-charcoal font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition duration-300"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;