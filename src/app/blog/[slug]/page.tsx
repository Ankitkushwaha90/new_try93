import BlogDetailPage from "./BlogDetailClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  
  
  try {
    const { slug } = await params;
    const res = await fetch(`${apiUrl}/api/blogs/${slug}/`, { cache: "no-store" });
    if (!res.ok) throw new Error("Blog not found");
    const blog = await res.json();
    const url = `/blog/${slug}`;
    const imageUrl = blog.thumbnail ? (blog.thumbnail.startsWith("http") ? blog.thumbnail : `${apiUrl}${blog.thumbnail}`) : undefined;
    return {
      title: blog.title ? `${blog.title} | Blog` : "Blog",
      description: blog.description || "Read this blog post.",
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: blog.title,
        description: blog.description,
        url,
        type: "article",
        siteName: "Your Blog Site Name",
        images: imageUrl ? [imageUrl] : [],
        publishedTime: blog.created_at,
      },
      twitter: {
        card: imageUrl ? "summary_large_image" : "summary",
        title: blog.title,
        description: blog.description,
        images: imageUrl ? [imageUrl] : [],
        site: "@yourtwitterhandle",
      },
    };
  } catch {
    const { slug } = await params;
    const url = `/blog/${slug}`;
    return {
      title: "Blog Not Found",
      description: "This blog post could not be found.",
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: "Blog Not Found",
        description: "This blog post could not be found.",
        url,
        type: "article",
        siteName: "Your Blog Site Name",
        images: [],
      },
      twitter: {
        card: "summary",
        title: "Blog Not Found",
        description: "This blog post could not be found.",
        images: [],
        site: "@yourtwitterhandle",
      },
    };
  }
}

export default function Page() {
  return <BlogDetailPage />;
} 