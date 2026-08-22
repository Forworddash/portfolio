import { useState } from 'react';
import { Link } from 'react-router-dom';
import { posts, allTags, formatDate } from '../blog';

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = ['All', ...allTags];
  const filteredPosts =
    selectedTag === 'All' ? posts : posts.filter((p) => p.tags.includes(selectedTag));

  return (
    <section className="min-h-screen bg-white dark:bg-slate-900 px-6 pt-32 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
            Writing
          </p>
          {/* The blog index is its own page, so its title is the h1. */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Notes from another brain.
          </p>
        </div>

        {/* Filter Tags */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Post List */}
        <div className="flex flex-col gap-6">
          {filteredPosts.map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              // Delay goes inside the shorthand — see the note in Projects.tsx.
              style={{ animation: `slideUp 0.5s ease-out ${index * 100}ms both` }}
            >
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-2">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span>{post.readingTime} min read</span>
                {post.draft && (
                  <>
                    <span className="text-slate-300 dark:text-slate-600">•</span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-medium">
                      Draft
                    </span>
                  </>
                )}
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>

              <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-md font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              {posts.length === 0
                ? 'No posts yet — add a markdown file to content/posts/.'
                : 'No posts found for the selected tag.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
