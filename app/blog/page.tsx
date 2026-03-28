import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import BlogPageContent from './BlogPageContent';

export const metadata: Metadata = {
    title: 'Blog | WBM Contracting LLC - Construction Insights & Industry Trends Dubai',
    description: 'Read the latest insights from WBM Contracting LLC on construction trends, interior design, MEP contracting, and building solutions in Dubai and the UAE.',
    keywords: 'construction blog Dubai, WBM Contracting blog, interior design trends Dubai, MEP contracting insights, construction company Dubai blog, building industry UAE',
    openGraph: {
        title: 'Blog | WBM Contracting LLC - Construction Insights & Industry Trends Dubai',
        description: 'Read the latest insights from WBM Contracting LLC on construction trends, interior design, MEP contracting, and building solutions in Dubai and the UAE.',
        type: 'website',
    },
};

export default function BlogPage() {
    return (
        <main className="min-h-screen overflow-x-hidden w-full">
            <Navbar />
            <BlogPageContent />
            <Footer />
            <FloatingActions />
        </main>
    );
}
