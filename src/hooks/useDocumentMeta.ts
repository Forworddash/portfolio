import { useEffect } from 'react';

export interface DocumentMeta {
  /** Full <title>. Written verbatim, so include the site name if you want one. */
  title: string;
  description: string;
  /** Router path, e.g. '/' or '/blog/hello-world'. Becomes canonical and og:url. */
  path: string;
  /** og:type — 'article' for blog posts, 'website' for everything else. */
  type?: 'website' | 'article';
  /** Set on routes that should not be indexed — notably the 404 page, which
   *  GitHub Pages serves with a 200 status, so crawlers cannot tell it apart
   *  from a real page without being told. */
  noindex?: boolean;
}

/**
 * Upserts a tag in <head>, matching on the attribute that identifies it
 * (`name` for meta, `property` for Open Graph, `rel` for <link>).
 */
function upsert(selector: string, create: () => HTMLElement, attribute: string, value: string) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

function setMeta(name: string, content: string) {
  upsert(`meta[name="${name}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('name', name);
    return el;
  }, 'content', content);
}

function setProperty(property: string, content: string) {
  upsert(`meta[property="${property}"]`, () => {
    const el = document.createElement('meta');
    el.setAttribute('property', property);
    return el;
  }, 'content', content);
}

function setCanonical(href: string) {
  upsert('link[rel="canonical"]', () => {
    const el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    return el;
  }, 'href', href);
}

/**
 * index.html carries the home page's tags so a scraper that does not run
 * JavaScript still sees something useful. Because GitHub Pages serves that same
 * HTML for every deep link (via the 404.html copy), a route that does not
 * override them would claim the home page's title and canonical URL as its own
 * — so every route calls this hook.
 *
 * The origin is read at runtime rather than baked in, so moving to a custom
 * domain does not leave stale absolute URLs behind.
 */
export function useDocumentMeta({ title, description, path, type = 'website', noindex = false }: DocumentMeta) {
  useEffect(() => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    const url = `${window.location.origin}${base}${path === '/' ? '/' : path}`;

    document.title = title;
    setMeta('description', description);
    setMeta('robots', noindex ? 'noindex, follow' : 'index, follow');
    setCanonical(url);

    setProperty('og:title', title);
    setProperty('og:description', description);
    setProperty('og:url', url);
    setProperty('og:type', type);

    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
  }, [title, description, path, type, noindex]);
}
