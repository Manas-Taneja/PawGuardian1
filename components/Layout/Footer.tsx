import React from 'react';
import { PawPrint, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
            <div className="bg-gray-900 text-white p-1.5 rounded-lg">
                <PawPrint size={20} />
            </div>
            <span className="font-bold text-gray-900 tracking-tight">PawGuardian</span>
        </div>

        <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
        </div>

        <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-blue-500 transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-blue-700 transition-colors"><Linkedin size={20} /></a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 text-center text-xs text-gray-400">
        © 2024 PawGuardian. All rights reserved.
      </div>
    </footer>
  );
};