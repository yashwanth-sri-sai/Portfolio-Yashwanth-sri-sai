import { notFound } from "next/navigation";
import { getBlogBySlug, blogs } from "@/data/blogs";
import ArticleContent from "./ArticleContent";

// Generate static params for all blogs at build time
export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug);
  
  if (!blog) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${blog.title} | Yashwanth Sri Sai`,
    description: blog.excerpt,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  // We need a client component to handle the scroll progress and animations
  return <ArticleContent blog={blog} />;
}
