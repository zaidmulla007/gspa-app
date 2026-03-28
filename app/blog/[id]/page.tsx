import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FloatingActions from '../../components/FloatingActions';
import BlogDetailContent from './BlogDetailContent';
import { blogPosts } from '../../data/blogData';

export function generateStaticParams() {
    return blogPosts.map((post) => ({
        id: post.id.toString(),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const post = blogPosts.find((p) => p.id === Number(resolvedParams.id));

    if (!post) {
        return { title: 'Blog Post Not Found | WBM Contracting LLC' };
    }

    return {
        title: post.metaTitle,
        description: post.metaDescription,
        keywords: post.keywords,
        openGraph: {
            title: post.metaTitle,
            description: post.metaDescription,
            type: 'article',
            publishedTime: post.dateISO,
            authors: [post.author],
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.metaTitle,
            description: post.metaDescription,
            images: [post.image],
        },
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const post = blogPosts.find((p) => p.id === Number(resolvedParams.id));

    if (!post) {
        return (
            <main className="min-h-screen overflow-x-hidden w-full flex items-center justify-center">
                <Navbar />
                <div className="text-center pt-32">
                    <h1 className="text-4xl font-bold text-dark mb-4">Blog Post Not Found</h1>
                    <Link href="/blog" className="text-gold hover:underline text-lg">
                        Back to Blog
                    </Link>
                </div>
            </main>
        );
    }

    // JSON-LD structured data for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription,
        image: post.image,
        datePublished: post.dateISO,
        dateModified: post.dateISO,
        author: {
            '@type': 'Organization',
            name: 'WBM Contracting LLC',
            url: 'https://www.wbmcontractingllc.com',
        },
        publisher: {
            '@type': 'Organization',
            name: 'WBM Contracting LLC',
            url: 'https://www.wbmcontractingllc.com',
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.wbmcontractingllc.com/blog/${post.id}`,
        },
        keywords: post.keywords,
    };

    return (
        <main className="min-h-screen overflow-x-hidden w-full">
            <Navbar />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogDetailContent post={post} />
            <Footer />
            <FloatingActions />
        </main>
    );
}
