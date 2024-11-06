import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <img
            src="/kbf-logo.png"
            alt="KBF Logo"
            className="h-12 w-12"
          />
          <h3 className="text-lg font-semibold text-gray-900">
            Kenya Basketball Federation
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span>info@kbf.co.ke</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4" />
            <span>+254 700 000 000</span>
          </div>

          <button
            onClick={() => navigate('/login/player')}
            className="mt-4 rounded-[4px] bg-orange-600 px-4 py-2 text-sm text-white hover:bg-orange-700"
          >
            Portal Login
          </button>

          <p className="mt-4 text-sm text-gray-500">
            © {new Date().getFullYear()} Kenya Basketball Federation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;