import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
    title: 'Contact Us | WBM Contracting LLC - Get a Quote for Construction in Dubai',
    description: 'Contact WBM Contracting LLC for construction services in Dubai. Get a free quote for interior design, MEP contracting, fit-out, and renovation projects. Call +971 55 339 6704.',
    keywords: 'contact WBM Contracting, construction quote Dubai, interior design quote Dubai, MEP contracting Dubai contact, construction company Dubai phone',
    openGraph: {
        title: 'Contact Us | WBM Contracting LLC - Get a Quote for Construction in Dubai',
        description: 'Contact WBM Contracting LLC for construction services in Dubai. Get a free quote today.',
        type: 'website',
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen overflow-x-hidden w-full">
            <Navbar />
            <ContactContent />
            <Footer />
            <FloatingActions />
        </main>
    );
}
