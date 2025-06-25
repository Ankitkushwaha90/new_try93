"use client";
import React, { useEffect, useState, Suspense } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface Blog {
  id: number;
  title: string;
  description?: string;
  thumbnail?: string;
  description_image?: string;
  image?: string;
  slug: string;
  created_at: string;
  subtopics: { id: number; title: string }[];
}

function HomePageContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference or default to system preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    // Save dark mode preference and apply to document
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  useEffect(() => {
    axios.get(`${apiUrl}/api/blogs/`).then((res) => {
      setBlogs(res.data);
      setLoading(false);
      setFilteredBlogs(res.data);
    });
  }, [apiUrl]);

  useEffect(() => {
    if (!search) {
      setFilteredBlogs(blogs);
    } else {
      const lower = search.toLowerCase();
      setFilteredBlogs(
        blogs.filter(
          (b) =>
            b.title.toLowerCase().includes(lower) ||
            (b.description && b.description.toLowerCase().includes(lower))
        )
      );
    }
  }, [search, blogs]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Latest Blogs
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-neutral-400 dark:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900 pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="text-center text-lg text-neutral-900 dark:text-neutral-100">Loading...</div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center text-lg text-neutral-900 dark:text-neutral-100">No blogs found.</div>
          ) : (
            <div className="space-y-6">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="block rounded-lg shadow-md bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition p-6 border border-neutral-200 dark:border-neutral-700"
                >
                  {(blog.thumbnail || blog.image) && (
                    <Image
                      src={blog.thumbnail || blog.image || ""}
                      alt={blog.title}
                      className="w-full h-48 object-cover rounded mb-4 border"
                      width={600}
                      height={400}
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  )}
                  <h2 className="text-2xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">{blog.title}</h2>
                  {blog.description && <p className="mb-2 text-neutral-700 dark:text-neutral-300">{blog.description}</p>}
                  <div className="text-neutral-500 dark:text-neutral-400 text-sm mb-1">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {blog.subtopics.map((sub) => (
                      <span
                        key={sub.id}
                        className="bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 px-2 py-1 rounded text-xs"
                      >
                        {sub.title}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense>
      <HomePageContent />
    </Suspense>
  );
}
