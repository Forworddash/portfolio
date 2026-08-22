interface AboutProps {
  id?: string;
}

/**
 * The hero doubles as the pitch, so it leads with the EDI consulting story
 * rather than a generic developer intro — that is what the title, meta
 * description and the compliance-audit project all promise a visitor.
 */
export default function About({ id = 'about' }: AboutProps) {
  return (
    <section
      id={id}
      // The fade-in is a CSS animation rather than a mount-triggered opacity
      // transition: the old version rendered the section at opacity-0 and let a
      // useEffect flip it, which meant a blank hero for anyone whose JS was slow
      // and a permanently blank one if that effect never ran.
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-6 py-20 animate-fade-in"
    >
      <div className="max-w-5xl w-full">
        <div className="space-y-6">
          <div>
            {/* A label, not a heading — keeping it a <p> leaves the document
                outline as h1 -> h2 instead of h2 -> h1. */}
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              Developer &amp; EDI Consultant
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 text-balance">
              Samuel Baker
            </h1>
          </div>

          {/* Credibility up front, before anyone decides whether to keep reading. */}
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {[
              { value: '4.5 years', label: 'Full-stack development' },
              { value: '30+', label: 'Trading partner integrations' },
              { value: 'AS2 / X12', label: 'Built and maintained in-house' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</dt>
                <dd className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <div className="max-w-3xl space-y-4">
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              I'm a full-stack developer with 4.5 years of experience, most of it spent as the
              primary developer on an in-house EDI application built from the ground up. I own it
              end to end: over 30 trading partner integrations, AS2 connectivity and certificate
              rotation, X12 mapping, onboarding new retailers, and keeping existing partnerships
              healthy when specs change underneath them.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              That work is unglamorous and unforgiving — a mapping that drifts by one qualifier
              surfaces as a chargeback three weeks later, coded as something else entirely. So I
              treat EDI the way I treat the rest of my software: trace the failure to its actual
              root, fix it at the source, and leave the evidence behind. The sample compliance
              audit below is what that looks like as a client deliverable.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Outside of EDI I build and ship in TypeScript and Rust, with privacy and security as
              defaults rather than features — the tools below run client-side or store nothing at
              all. Currently going deeper on Rust and C for systems work and performance.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Get in touch
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200 shadow-lg hover:shadow-xl border border-slate-200 dark:border-slate-700"
            >
              View Projects
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="https://github.com/Forworddash"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
