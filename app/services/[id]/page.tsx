import type { Metadata } from 'next';
import Link from 'next/link';
import { PaintBucket, Wrench } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FloatingActions from '../../components/FloatingActions';
import ServiceContent from './ServiceContent';

const services = [
    {
        id: 1,
        icon: <PaintBucket className="w-12 h-12" />,
        title: 'Interior Design Services',
        description: 'Transforming Spaces into Experiences — innovative, functional, and aesthetically pleasing interior spaces tailored to reflect your vision while maintaining comfort, efficiency, and modern standards.',
        image: '/interior-design/JPJ-004.jpeg',
        features: ['Residential Interior Design', 'Commercial Interior Design', 'Fit-Out & Trunking Solutions'],
        detailedDescription: 'At WBM Contracting, we specialize in creating innovative, functional, and aesthetically pleasing interior spaces. Our interior design solutions are tailored to reflect your vision while maintaining comfort, efficiency, and modern standards. Whether it\'s a luxury home, corporate office, or a retail space, our expert designers bring creativity and precision to every project.',
        benefits: [
            'Professional consultation and requirement analysis',
            'Concept development tailored to your vision',
            '2D & 3D design presentation before execution',
            'Careful material selection and procurement',
            'Expert execution and on-site supervision',
            'Smooth final handover and quality assurance',
        ],
        subCategories: [
            {
                title: 'Residential Interior Design',
                items: [
                    'Villas & Apartments',
                    'Luxury Homes',
                    'Bedroom & Living Room Design',
                    'Kitchen & Bathroom Design',
                    'Space Planning & Renovation',
                ],
            },
            {
                title: 'Commercial Interior Design',
                items: [
                    'Offices & Corporate Spaces',
                    'Retail Shops & Showrooms',
                    'Restaurants & Cafés',
                    'Clinics & Healthcare Spaces',
                    'Educational Institutions',
                ],
            },
            {
                title: 'Fit-Out & Trunking Solutions',
                items: [
                    'Complete Design & Execution',
                    'False Ceiling & Gypsum Work',
                    'Partition & Glass Work',
                    'Custom Furniture',
                    'Flooring (Tiles, Marble, Wood, Vinyl)',
                    'Lighting & Decorative Installations',
                ],
            },
        ],
        processSteps: [
            'Consultation & Requirement Analysis',
            'Concept Development',
            '2D & 3D Design Presentation',
            'Material Selection',
            'Execution & Supervision',
            'Final Handover',
        ],
    },
    {
        id: 2,
        icon: <Wrench className="w-12 h-12" />,
        title: 'MEP Contracting Services',
        description: 'Complete Mechanical, Electrical & Plumbing Solutions for residential, commercial, and industrial projects — delivered by experienced engineers and skilled technicians.',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
        features: ['Mechanical Works', 'Electrical Works', 'Plumbing Works'],
        detailedDescription: 'At WBM Contracting, we provide comprehensive MEP contracting services for residential, commercial, and industrial projects. Our experienced engineers and skilled technicians deliver reliable, efficient, and code-compliant solutions that ensure safety, performance, and long-term sustainability. We manage projects from design and planning to installation, testing, and commissioning — delivering turnkey MEP solutions tailored to client requirements.',
        benefits: [
            'Code-compliant and fully safe installations',
            'Experienced licensed engineers and certified technicians',
            'Turnkey MEP solutions from design to commissioning',
            'Reliable, energy-efficient, and sustainable systems',
            'Comprehensive testing & commissioning process',
            'Annual Maintenance Contracts (AMC) available',
        ],
        subCategories: [
            {
                title: 'Mechanical Works',
                items: [
                    'HVAC System Installation & Maintenance',
                    'Air Conditioning Systems (Split, VRF, Package Units)',
                    'Ventilation & Exhaust Systems',
                    'Duct Fabrication & Installation',
                    'Chilled Water Systems',
                    'Fire Fighting & Fire Protection Systems',
                    'Smoke Management Systems',
                    'Heat Load Calculation & System Design',
                ],
            },
            {
                title: 'Electrical Works',
                items: [
                    'Electrical Wiring & Cabling',
                    'Power Distribution Systems',
                    'Distribution Board (DB) Installation',
                    'Lighting Design & Installation',
                    'Internal & External Lighting Systems',
                    'Low Current Systems (CCTV, Access Control, Data & Telephone)',
                    'Fire Alarm Systems',
                    'Emergency Lighting & Backup Systems',
                    'Earthing & Lightning Protection Systems',
                ],
            },
            {
                title: 'Plumbing Works',
                items: [
                    'Water Supply Systems',
                    'Drainage & Sewage Systems',
                    'Storm Water Drainage',
                    'Pump Installation & Maintenance',
                    'Sanitary Ware Installation',
                    'Water Heater Systems',
                    'Irrigation Systems',
                    'Pipe Fitting & Maintenance',
                ],
            },
        ],
        additionalServices: [
            'MEP Design & Consultancy',
            'Shop Drawings & As-Built Drawings',
            'Authority Approvals & Documentation',
            'Load Calculations & Technical Submittals',
            'BOQ Preparation',
            'Testing & Commissioning',
            'Annual Maintenance Contracts (AMC)',
        ],
        industriesServed: [
            'Residential Buildings & Villas',
            'Commercial Offices',
            'Retail & Shopping Centers',
            'Hospitality & Hotels',
            'Warehouses & Industrial Facilities',
            'Healthcare & Educational Institutions',
        ],
    },
];

export function generateStaticParams() {
    return services.map((service) => ({
        id: service.id.toString(),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const service = services.find(s => s.id === Number(resolvedParams.id));

    if (!service) {
        return { title: 'Service Not Found | WBM Contracting LLC' };
    }

    return {
        title: `${service.title} | WBM Contracting LLC Dubai`,
        description: service.description,
        keywords: `${service.title}, construction company Dubai, WBM Contracting, ${service.features.join(', ')}`,
        openGraph: {
            title: `${service.title} | WBM Contracting LLC Dubai`,
            description: service.description,
            type: 'website',
            images: [{ url: service.image, alt: service.title }],
        },
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const service = services.find(s => s.id === Number(resolvedParams.id));

    if (!service) {
        return (
            <main className="min-h-screen overflow-x-hidden w-full flex items-center justify-center">
                <Navbar />
                <div className="text-center pt-32">
                    <h1 className="text-4xl font-bold text-dark mb-4">Service Not Found</h1>
                    <Link href="/services" className="text-gold hover:underline text-lg">
                        Back to Services
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen overflow-x-hidden w-full">
            <Navbar />
            <ServiceContent service={service} />
            <Footer />
            <FloatingActions />
        </main>
    );
}
