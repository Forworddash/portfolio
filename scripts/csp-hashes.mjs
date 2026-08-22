/**
 * Prints the sha256- values the Content-Security-Policy in index.html needs for
 * its inline <script> blocks — the pre-paint theme script and the JSON-LD
 * block. Chrome enforces script-src on application/ld+json as well, so both
 * need a hash or the structured data is dropped.
 *
 * Run `npm run csp-hashes` after editing either script and paste the output
 * into the script-src list.
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const html = readFileSync(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');

const inline = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1])
  .filter((body) => body.trim());

if (!inline.length) {
  console.log('No inline scripts found — script-src needs no hashes.');
  process.exit(0);
}

for (const body of inline) {
  const digest = createHash('sha256').update(body, 'utf8').digest('base64');
  console.log(`'sha256-${digest}'`);
}
