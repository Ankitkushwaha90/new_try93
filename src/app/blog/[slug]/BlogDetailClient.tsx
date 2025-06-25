"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// @ts-expect-error: prismjs has no types, using as-is
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import Head from "next/head";

interface SubTopic {
  id: number;
  title: string;
  content: string;
  code?: string;
  code_language?: string;
  order: number;
  image?: string;
}

interface Blog {
  id: number;
  title: string;
  description?: string;
  thumbnail?: string;
  description_image?: string;
  image?: string;
  slug: string;
  created_at: string;
  subtopics: SubTopic[];
}

const languageLabels: Record<string, string> = {
  python: "Python",
  javascript: "JavaScript",
  java: "Java",
  c: "C",
  cpp: "C++",
  html: "HTML",
  css: "CSS",
  bash: "Bash",
  json: "JSON",
  other: "Other",
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const codeRefs = useRef<(HTMLPreElement | null)[]>([]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError("");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    fetch(`${apiUrl}/api/blogs/${slug}/`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Blog not found.");
        const data = await res.json();
        setBlog(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Blog not found.");
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (blog) {
      setTimeout(() => {
        Prism.highlightAll();
      }, 0);
    }
  }, [blog]);

  const handleCopy = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <>
      {blog && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": blog.title,
                "description": blog.description,
                "datePublished": blog.created_at,
                "image": blog.thumbnail || undefined,
                "author": {
                  "@type": "Person",
                  "name": "Blog Author"
                },
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": typeof window !== 'undefined' ? window.location.href : ''
                }
              })
            }}
          />
        </Head>
      )}
      <main className="min-h-screen bg-neutral-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">← Back to Home</Link>
          {loading ? (
            <div className="text-center text-lg">Loading...</div>
          ) : error ? (
            <div className="text-center text-lg text-red-500">{error}</div>
          ) : blog ? (
            <article className="bg-white rounded-lg shadow-md p-8 border border-neutral-200">
              {blog.thumbnail && (
                <Image
                  src={blog.thumbnail}
                  alt={blog.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover rounded mb-6 border"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  unoptimized
                />
              )}
              <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
              {blog.description && <p className="mb-4 text-lg text-neutral-700">{blog.description}</p>}
              {blog.description_image && (
                <Image
                  src={blog.description_image}
                  alt={blog.title + " description"}
                  width={800}
                  height={350}
                  className="w-full h-56 object-cover rounded mb-6 border"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  unoptimized
                />
              )}
              <div className="text-neutral-500 text-sm mb-6">
                {new Date(blog.created_at).toLocaleDateString()}
              </div>
              <div className="space-y-8">
                {blog.subtopics.map((sub, idx) => (
                  <section key={sub.id} className="">
                    <h2 className="text-2xl font-semibold mb-2">{sub.title}</h2>
                    <div className="prose prose-neutral max-w-none text-lg leading-relaxed mb-4">
                      {sub.content}
                    </div>
                    {sub.image && (
                      <Image
                        src={sub.image}
                        alt={sub.title + " image"}
                        width={600}
                        height={256}
                        className="w-full max-h-64 object-contain rounded mb-4 border"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        unoptimized
                      />
                    )}
                    {sub.code && (
                      <div className="relative group mb-4">
                        <div className="flex items-center justify-between mb-1">
                          {sub.code_language && (
                            <span className="bg-neutral-200 text-neutral-700 px-2 py-1 rounded text-xs font-mono">
                              {languageLabels[sub.code_language] || sub.code_language}
                            </span>
                          )}
                          <button
                            onClick={() => handleCopy(sub.code!, sub.id)}
                            className="bg-neutral-800 text-white px-2 py-1 rounded hover:bg-neutral-700 text-xs shadow"
                          >
                            {copiedId === sub.id ? "Copied!" : "Copy code"}
                          </button>
                        </div>
                        <pre
                          ref={el => { codeRefs.current[idx] = el || null; }}
                          className={`bg-neutral-900 text-white rounded p-4 overflow-x-auto max-h-96 overflow-y-auto text-sm language-${sub.code_language || "plaintext"}`}
                        >
                          <code className={`language-${sub.code_language || "plaintext"}`}>{sub.code}</code>
                        </pre>
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </main>
    </>
  );
} 