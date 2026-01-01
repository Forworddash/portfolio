import { useEffect, useState } from 'react';
import { openSourceContributions } from '../data';

interface OpenSourceProps {
  id?: string;
}

export default function OpenSource({ id = 'opensource' }: OpenSourceProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const statusColors = {
    merged: 'bg-green-100 text-green-800 border-green-200',
    open: 'bg-blue-100 text-blue-800 border-blue-200',
    closed: 'bg-slate-100 text-slate-800 border-slate-200',
  };

  const statusIcons = {
    merged: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    ),
    open: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
      </svg>
    ),
    closed: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
  };

  return (
    <section
      id={id}
      className={`min-h-screen bg-slate-50 px-6 py-20 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
            Contributions
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Open Source Work
          </h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Contributing to the community by supporting open source projects.
          </p>
        </div>

        {/* Contributions List */}
        <div className="grid md:grid-cols-2 gap-6">
          {openSourceContributions.map((contribution, index) => (
            <a
              key={contribution.id}
              href={contribution.prUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'slideUp 0.5s ease-out forwards',
              }}
            >
              {/* Repository Name */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-slate-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {contribution.repo}
                  </h4>
                </div>
                <span
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${
                    statusColors[contribution.status]
                  }`}
                >
                  {statusIcons[contribution.status]}
                  {contribution.status.charAt(0).toUpperCase() +
                    contribution.status.slice(1)}
                </span>
              </div>

              {/* Description */}
              <p className="text-slate-600 mb-3">{contribution.description}</p>

              {/* Link */}
              <div className="flex items-center gap-2 text-sm text-blue-600 group-hover:text-blue-700 transition-colors">
                <span>View Pull Request</span>
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* GitHub Profile Link */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/Forworddash"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View All Contributions on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
