import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import ProjectsContent from './ProjectsContent';

export const metadata: Metadata = {
    title: 'Our Projects | WBM Contracting LLC - Construction Portfolio Dubai',
    description: 'View WBM Contracting LLC project portfolio featuring commercial towers, luxury residences, industrial facilities, and retail spaces across Dubai and the UAE.',
    keywords: 'construction projects Dubai, WBM Contracting portfolio, commercial construction Dubai, residential projects UAE, industrial construction Dubai, fit-out projects Dubai',
    openGraph: {
        title: 'Our Projects | WBM Contracting LLC - Construction Portfolio Dubai',
        description: 'View WBM Contracting LLC project portfolio featuring commercial, residential, and industrial projects across Dubai.',
        type: 'website',
    },
};

export default function ProjectsPage() {
    return (
        <main className="min-h-screen overflow-x-hidden w-full bg-gradient-to-b from-white via-gray-50 to-white">
            <Navbar />
            <ProjectsContent />
            <Footer />
            <FloatingActions />
        </main>
    );
}
