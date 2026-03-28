'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const ProjectsContent = () => {
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'commercial', 'residential', 'industrial'];

  const projects = [
    { id: 1, title: 'Luxury Business Tower', category: 'commercial', image: '/projects/luxury-bussines-tower.jpg', location: 'Dubai Marina', year: '2023', description: '45-story luxury commercial complex' },
    { id: 2, title: 'Oceanview Residence', category: 'residential', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', location: 'Palm Jumeirah', year: '2023', description: 'Premium waterfront villa' },
    { id: 3, title: 'Tech Manufacturing Hub', category: 'industrial', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80', location: 'Dubai Industrial City', year: '2022', description: 'State-of-the-art manufacturing facility' },
    { id: 4, title: 'Shopping Plaza', category: 'commercial', image: '/projects/shopping-plaza.jpg', location: 'Downtown Dubai', year: '2023', description: 'Modern retail and entertainment complex' },
    { id: 5, title: 'Villa Community', category: 'residential', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', location: 'Arabian Ranches', year: '2022', description: 'Exclusive gated community' },
    { id: 6, title: 'Logistics Center', category: 'industrial', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80', location: 'Jebel Ali', year: '2023', description: 'Advanced logistics and distribution center' },
    { id: 7, title: 'Corporate Headquarters', category: 'commercial', image: '/projects/corporate-hardquarters.jpg', location: 'Business Bay', year: '2024', description: 'Premium office space with modern amenities' },
    { id: 8, title: 'Luxury Apartments', category: 'residential', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', location: 'Dubai Hills', year: '2024', description: 'High-end residential tower' },
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(project => project.category === filter);

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-gold/10 border border-gold rounded-full text-gold font-semibold text-sm tracking-wider mb-4">OUR PORTFOLIO</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-4">Featured Projects</h1>
          <p className="text-xl text-black max-w-3xl mx-auto">Explore our portfolio of successful projects that showcase our commitment to excellence</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button key={category} onClick={() => setFilter(category)} className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${filter === category ? 'bg-gold text-dark shadow-lg shadow-gold/30' : 'bg-white text-black border-2 border-gray-200 hover:border-gold'}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-14">
            {filteredProjects.map((project, index) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -10 }} className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300 cursor-pointer">
                  <div className="relative h-72 overflow-hidden">
                    <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <span className="inline-block w-fit px-3 py-1 bg-gold text-dark text-xs font-bold rounded-full mb-3">{project.category.toUpperCase()}</span>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-gold transition-colors duration-300">{project.title}</h3>
                      <p className="text-gray-300 mb-2">{project.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">{project.location}</span>
                        <span className="text-sm text-gold font-semibold">{project.year}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <ExternalLink className="w-6 h-6 text-dark" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} className="mt-24 text-center">
          <div className="bg-gradient-to-r from-gold via-gold-light to-gold p-12 rounded-2xl shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-dark mb-4">Have a Project in Mind?</h3>
            <p className="text-xl text-dark/80 mb-8 max-w-2xl mx-auto">Let's collaborate to bring your vision to life with our proven expertise</p>
            <Link href="/contact" className="inline-block px-10 py-4 bg-dark hover:bg-dark-light text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">Start Your Project</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsContent;
