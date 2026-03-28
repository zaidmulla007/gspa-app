import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
    title: 'About Us | WBM Contracting LLC - Construction Company in Dubai',
    description: 'Learn about WBM Contracting LLC, a trusted construction company in Dubai with 30 years of experience in interior fit-out, MEP contracting, renovation, and project management across the UAE.',
    keywords: 'about WBM Contracting, construction company Dubai, interior fit-out Dubai, MEP contractor UAE, renovation Dubai, project management Dubai',
    openGraph: {
        title: 'About Us | WBM Contracting LLC - Construction Company in Dubai',
        description: 'Learn about WBM Contracting LLC, a trusted construction company in Dubai with 30 years of experience.',
        type: 'website',
        images: [{ url: '/about-image.jpg', width: 380, height: 480, alt: 'WBM Contracting LLC - About Us' }],
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen overflow-x-hidden w-full bg-gradient-to-b from-white via-gray-50 to-white">
            <Navbar />
            <AboutContent />
            <Footer />
            <FloatingActions />
        </main>
    );
}
