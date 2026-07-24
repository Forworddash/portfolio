import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPost, formatDate } from '../blog';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    const previous = document.title;
    document.title = `${post.title} — Blog`;
    return () => {
      document.title = previous;
    };
  }, [post]);

  if (!post) {
    return (
      <section className="min-h-screen bg-white dark:bg-slate-900 px-6 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Post not found
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            There's no post at this address.
          </p>
          <Link
            to="/blog"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white dark:bg-slate-900 px-6 pt-32 pb-20">
      <article className="max-w-3xl mx-auto animate-slide-up">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
        >
          ← Back to all posts
        </Link>

        <header className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 text-balance">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="text-slate-300 dark:text-slate-600">•</span>
            <span>{post.readingTime} min read</span>
            {post.author && (
              <>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span>{post.author}</span>
              </>
            )}
            {post.draft && (
              <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-medium">
                Draft
              </span>
            )}
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-md font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Markdown is first-party content from content/posts/, rendered by marked. */}
        <div
          className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-700"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </section>
  );
}
