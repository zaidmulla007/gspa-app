'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceSubCategory {
    title: string;
    items: string[];
}

interface Service {
    id: number;
    icon: ReactNode;
    title: string;
    description: string;
    image: string;
    features: string[];
    detailedDescription: string;
    benefits: string[];
    subCategories?: ServiceSubCategory[];
    processSteps?: string[];
    additionalServices?: string[];
    industriesServed?: string[];
}

const galleryCategories = [
    {
        title: 'Interior Ceiling Design',
        images: Array.from({ length: 12 }, (_, i) => `/interior-design/JPJ-${String(i + 4).padStart(3, '0')}.jpeg`),
    },
    {
        title: 'Cabinets',
        images: Array.from({ length: 5 }, (_, i) => `/office-fitouts/cabinets/${i + 1}.jpeg`),
    },
    {
        title: 'Office Chairs',
        images: Array.from({ length: 3 }, (_, i) => `/office-fitouts/office-chairs/${i + 1}.jpeg`),
    },
    {
        title: 'Office Tables',
        images: Array.from({ length: 8 }, (_, i) => `/office-fitouts/office-tables/${i + 1}.jpeg`),
    },
    {
        title: 'Sofa',
        images: Array.from({ length: 3 }, (_, i) => `/office-fitouts/reception-sofa/${i + 1}.jpeg`),
    },
    {
        title: 'Work Station',
        images: Array.from({ length: 2 }, (_, i) => `/office-fitouts/work-station/${i + 1}.jpeg`),
    },
];

export default function ServiceContent({ service }: { service: Service }) {
    const [activeCategory, setActiveCategory] = useState(0);
    const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);

    const currentImages = galleryCategories[activeCategory].images;

    const handleOpenModal = (index: number) => {
        setModalImageIndex(index);
    };

    const handlePrev = () => {
        if (modalImageIndex === null) return;
        setModalImageIndex(modalImageIndex === 0 ? currentImages.length - 1 : modalImageIndex - 1);
    };

    const handleNext = () => {
        if (modalImageIndex === null) return;
        setModalImageIndex(modalImageIndex === currentImages.length - 1 ? 0 : modalImageIndex + 1);
    };

    return (
        <>
            {/* Hero Banner */}
            <div className="relative h-[60vh] md:h-[70vh]">
                <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark" />

                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-block px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold rounded-full mb-4">
                                <span className="text-gold font-bold text-sm tracking-wider">OUR SERVICE</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                {service.title}
                            </h1>
                            <p className="text-xl text-white/90 max-w-2xl bg-dark/40 backdrop-blur-sm p-6 rounded-lg border-l-4 border-gold">
                                {service.description}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Service Details Content */}
            <div className="bg-gradient-to-b from-white via-gray-50 to-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Overview Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <div className="flex flex-col lg:flex-row gap-12 items-start">
                            <div className="lg:w-2/3">
                                <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">About This Service</h2>
                                <p className="text-black text-lg leading-relaxed text-justify">
                                    {service.detailedDescription}
                                </p>
                            </div>
                            <div className="lg:w-1/3 w-full">
                                <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-gold">
                                    <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6 mx-auto">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-dark text-center mb-4">Why Choose Us?</h3>
                                    <p className="text-center text-gray-600 mb-6">
                                        Our {service.title} is designed to deliver excellence and value at every step.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="block w-full text-center bg-dark text-white py-3 rounded-lg hover:bg-gold hover:text-dark transition-all duration-300 font-bold"
                                    >
                                        Get a Quote
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sub-categories Section */}
                    {service.subCategories && service.subCategories.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-8">
                                {service.id === 1 ? 'Our Interior Design Services' : 'Our MEP Services'}
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {service.subCategories.map((cat, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-gold hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <h3 className="text-xl font-bold text-dark mb-5 pb-3 border-b border-gray-100">
                                            {cat.title}
                                        </h3>
                                        <ul className="space-y-3">
                                            {cat.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-gray-700">
                                                    <span className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Design Process — Interior Design only */}
                    {service.processSteps && service.processSteps.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-8">Our Design Process</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {service.processSteps.map((step, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div className="w-11 h-11 bg-gold rounded-full flex items-center justify-center text-dark font-bold text-lg flex-shrink-0 shadow-md">
                                            {idx + 1}
                                        </div>
                                        <span className="text-dark font-semibold text-lg leading-snug pt-1">{step}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Additional MEP Design & Engineering Services */}
                    {service.additionalServices && service.additionalServices.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">MEP Design & Engineering Services</h2>
                            <div className="bg-white p-8 rounded-xl shadow-lg">
                                <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                                    {service.additionalServices.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-black text-lg">
                                            <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}

                    {/* Industries We Serve — MEP */}
                    {service.industriesServed && service.industriesServed.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">Industries We Serve</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {service.industriesServed.map((industry, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-gradient-to-br from-dark to-dark-light p-5 rounded-xl text-center hover:from-gold hover:to-gold hover:text-dark transition-all duration-300 group"
                                    >
                                        <span className="text-white font-semibold group-hover:text-dark">{industry}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">Benefits</h2>
                        <div className="bg-gradient-to-br from-dark to-dark-light p-8 rounded-xl shadow-lg">
                            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                                {service.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3 text-white text-lg">
                                        <CheckCircle className="w-6 h-6 text-gold mt-0.5 flex-shrink-0" />
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Gallery — Interior Design only */}
                    {service.id === 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-8">Our Portfolio</h2>

                            {/* Category Tabs */}
                            <div className="flex flex-wrap gap-3 mb-8">
                                {galleryCategories.map((cat, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveCategory(idx)}
                                        className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                                            activeCategory === idx
                                                ? 'bg-gold text-dark shadow-lg'
                                                : 'bg-white text-dark border-2 border-gray-200 hover:border-gold'
                                        }`}
                                    >
                                        {cat.title}
                                    </button>
                                ))}
                            </div>

                            {/* Images Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {galleryCategories[activeCategory].images.map((image, index) => (
                                    <motion.div
                                        key={`${activeCategory}-${index}`}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="relative h-[200px] md:h-[250px] rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                                        onClick={() => handleOpenModal(index)}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${galleryCategories[activeCategory].title} ${index + 1}`}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                        />
                                        <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/30 transition-all duration-300" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-gold via-gold-light to-gold p-12 rounded-2xl shadow-2xl text-center"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                            Interested in {service.title}?
                        </h3>
                        <p className="text-xl text-dark/80 mb-8 max-w-2xl mx-auto">
                            Contact us today to discuss your requirements and let our experts guide you through the process.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-10 py-4 bg-dark hover:bg-dark-light text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Contact Us Now
                        </Link>
                    </motion.div>
                </div>
            </div>
            {/* Image Modal */}
            {modalImageIndex !== null && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setModalImageIndex(null)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setModalImageIndex(null)}
                        className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 z-10"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Previous Arrow */}
                    <button
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 z-10 group"
                    >
                        <ChevronLeft className="w-6 h-6 text-white group-hover:text-dark" />
                    </button>

                    {/* Next Arrow */}
                    <button
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-gold rounded-full flex items-center justify-center transition-all duration-300 z-10 group"
                    >
                        <ChevronRight className="w-6 h-6 text-white group-hover:text-dark" />
                    </button>

                    {/* Image */}
                    <motion.div
                        key={modalImageIndex}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full max-w-4xl h-[80vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={currentImages[modalImageIndex]}
                            alt={`${galleryCategories[activeCategory].title} ${modalImageIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 1200px) 100vw, 1200px"
                        />
                    </motion.div>

                    {/* Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium">
                        {modalImageIndex + 1} / {currentImages.length}
                    </div>
                </motion.div>
            )}
        </>
    );
}
