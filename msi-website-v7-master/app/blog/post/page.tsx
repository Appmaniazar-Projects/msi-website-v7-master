'use client';

import { getBlogPostBySlug } from '@/lib/blog';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Facebook } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function BlogPostContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        notFound();
        return;
      }
      
      try {
        const postData = await getBlogPostBySlug(slug);
        if (!postData) {
          notFound();
          return;
        }
        setPost(postData);
      } catch (error) {
        console.error('Error loading post:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return notFound();
  }
  
  // Extract hashtags from content if present
  const hashtags = post.content.match(/#[a-zA-Z0-9]+/g) || [];

  // Custom renderers for ReactMarkdown
  const customRenderers = {
    h1: ({ node, children }) => (
      <h1 className="text-3xl font-bold my-6 text-navy-blue border-b-2 border-red-600 pb-2">{children}</h1>
    ),
    h2: ({ node, children }) => (
      <h2 className="text-2xl font-bold my-5 text-navy-blue">{children}</h2>
    ),
    h3: ({ node, children }) => (
      <h3 className="text-xl font-bold my-4 text-navy-blue">{children}</h3>
    ),
    blockquote: ({ node, children }) => (
      <blockquote className="pl-4 border-l-4 border-red-600 italic my-6 text-gray-700 bg-gray-50 p-4 rounded-r-md">
        {children}
      </blockquote>
    ),
    a: ({ node, href, children }) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-red-600 font-medium hover:underline"
      >
        {children}
      </a>
    ),
    ul: ({ node, children }) => (
      <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>
    ),
    ol: ({ node, children }) => (
      <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>
    ),
    li: ({ node, children }) => (
      <li className="text-gray-700">{children}</li>
    ),
    img: ({ node, src, alt }) => (
      <div className="my-6">
        <Image 
          src={src} 
          alt={alt || 'Blog image'} 
          width={800} 
          height={450} 
          className="rounded-lg shadow-md mx-auto" 
        />
        {alt && <p className="text-center text-sm text-gray-600 mt-2 italic">{alt}</p>}
      </div>
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="my-6 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={match[1]}
            PreTag="div"
            className="rounded-lg"
            showLineNumbers
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-gray-100 text-red-800 px-1.5 py-0.5 rounded font-mono text-sm" {...props}>
          {children}
        </code>
      );
    },
    hr: () => <hr className="my-8 border-t-2 border-gray-200" />,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb Navigation */}
      <div className="mb-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all articles
        </Link>
      </div>
      
      <article>
        {/* Featured Image */}
        {post.frontmatter.image && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg relative">
            <div className="aspect-video relative">
              <Image
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Tags overlay */}
            <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end">
              {post.frontmatter.tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Post Header */}
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-navy-blue leading-tight">
            {post.frontmatter.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2 text-red-600" />
              <span>{post.frontmatter.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-red-600" />
              <span>{post.frontmatter.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-red-600" />
              <span>{post.readingTime} min read</span>
            </div>
            {post.facebookLink && (
              <a 
                href={post.facebookLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Facebook className="w-5 h-5 mr-2" />
                View on Facebook
              </a>
            )}
          </div>
          
          {/* Post Excerpt */}
          <div className="text-xl text-gray-700 font-medium border-l-4 border-red-600 pl-4 py-2 bg-gray-50 rounded-r-md">
            {post.frontmatter.excerpt}
          </div>
        </header>
        
        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={customRenderers}
          >
            {post.content}
          </ReactMarkdown>
        </div>
        
        {/* Hashtags */}
        {hashtags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Share Links */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-navy-blue">Share this article</h3>
          <div className="flex gap-4">
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877F2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            {/* Add more social sharing buttons as needed */}
          </div>
        </div>
      </article>
      
      {/* Related Posts - Could be added here if needed */}
    </div>
  );
}

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-md">
        <Header />
      </div>
      <div className="pt-24 pb-16">
        <Suspense fallback={
          <div className="flex items-center justify-center py-32">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <BlogPostContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
