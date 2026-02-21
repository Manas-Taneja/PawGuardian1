import React from 'react';
import { PawPrint, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      className="border-t py-12"
      style={{ backgroundColor: '#f8f4e8', borderColor: 'rgba(30,52,112,0.12)' }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div
            className="text-white p-1.5 rounded-lg"
            style={{ backgroundColor: '#282239' }}
          >
            <PawPrint size={20} />
          </div>
          <span className="font-bold tracking-tight" style={{ color: '#282239' }}>
            PawGuardian
          </span>
        </div>

        <div className="flex gap-8 text-sm" style={{ color: '#6b6888' }}>
          <a
            href="#"
            className="transition-colors"
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#282239')}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#6b6888')}
          >
            Privacy
          </a>
          <a
            href="#"
            className="transition-colors"
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#282239')}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#6b6888')}
          >
            Terms
          </a>
          <a
            href="#"
            className="transition-colors"
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#282239')}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#6b6888')}
          >
            Contact
          </a>
        </div>

        <div className="flex gap-4" style={{ color: '#a8a6b8' }}>
          <a
            href="#"
            className="transition-colors"
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#1e3470')}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#a8a6b8')}
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            className="transition-colors"
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#1e3470')}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#a8a6b8')}
          >
            <Instagram size={20} />
          </a>
          <a
            href="#"
            className="transition-colors"
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#1e3470')}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = '#a8a6b8')}
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-8 text-center text-xs" style={{ color: '#9896a8' }}>
        © 2026 PawGuardian. All rights reserved.
      </div>
    </footer>
  );
};