import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
    title: 'Our Services | WBM Contracting LLC - Interior Design & MEP Contracting Dubai',
    description: 'Explore WBM Contracting LLC services: Interior Design (residential, commercial, fit-out) and MEP Contracting (mechanical, electrical, plumbing) for projects across Dubai and the UAE.',
    keywords: 'interior design Dubai, MEP contracting Dubai, fit-out services Dubai, construction services UAE, HVAC installation Dubai, plumbing contractor Dubai, electrical contractor Dubai',
    openGraph: {
        title: 'Our Services | WBM Contracting LLC - Interior Design & MEP Contracting Dubai',
        description: 'Explore WBM Contracting LLC services: Interior Design and MEP Contracting for projects across Dubai.',
        type: 'website',
    },
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen overflow-x-hidden w-full bg-gradient-to-b from-dark via-dark-light to-dark">
            <Navbar />
            <ServicesContent />
            <Footer />
            <FloatingActions />
        </main>
    );
}
