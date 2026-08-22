interface ContactProps {
  id?: string;
}

const EMAIL = 'samuel@samuelbaker.ca';

// Naming the work explicitly is what turns "open to opportunities" into
// something a prospective client can recognise their own problem in.
const SERVICES = [
  'Trading partner onboarding — new retailers, new document types, spec changes',
  'X12 and EDIFACT mapping: building, auditing, and fixing what silently drifted',
  'AS2 and SFTP connectivity, certificate rotation, and keeping partnerships live',
  'Chargeback and compliance remediation — tracing deductions to their real cause',
  'Full-stack build work in TypeScript, React, Node and Rust',
];

export default function Contact({ id = 'contact' }: ContactProps) {
  return (
    <section id={id} className="bg-white dark:bg-slate-900 px-6 py-24 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 text-balance">
            Let's talk about your EDI
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Available for EDI consulting engagements and full-stack development work. If deductions
            are climbing, an onboarding is stalled, or a mapping stopped behaving, that's the kind
            of thing I fix.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <ul className="space-y-3">
            {SERVICES.map((service) => (
              <li key={service} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <svg
                  className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{service}</span>
              </li>
            ))}
          </ul>

          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Get in touch
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
              Email is the fastest way to reach me. Tell me what's going wrong and I'll tell you
              whether I can help.
            </p>

            <a
              href={`mailto:${EMAIL}?subject=EDI%20consulting%20enquiry`}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email me
            </a>

            {/* Shown in full as well as linked — plenty of people would rather
                copy an address than hand the click to their mail client. */}
            <p className="mt-3 text-center text-sm">
              <a
                href={`mailto:${EMAIL}`}
                className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
              >
                {EMAIL}
              </a>
            </p>

            <a
              href="https://github.com/Forworddash"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full px-6 py-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Code on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
