'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PaintBucket, Wrench } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 1,
      icon: <PaintBucket className="w-12 h-12" />,
      title: 'Interior Design Services',
      description: 'Transforming spaces into experiences. We create innovative, functional, and aesthetically pleasing interior environments tailored to reflect your vision, comfort, and modern standards.',
      image: '/interior-design/JPJ-004.jpeg',
      features: ['Residential Interior Design', 'Commercial Interior Design', 'Fit-Out & Trunking Solutions'],
    },
    {
      id: 2,
      icon: <Wrench className="w-12 h-12" />,
      title: 'MEP Contracting Services',
      description: 'Complete Mechanical, Electrical & Plumbing solutions for residential, commercial, and industrial projects — from design and planning to installation, testing, and commissioning.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
      features: ['Mechanical Works (HVAC, Fire Fighting)', 'Electrical Works (Power, Lighting, Low Current)', 'Plumbing Works (Water, Drainage, Irrigation)'],
    },
  ];

  return (
    <section id="services" className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-dark via-dark-light to-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 lg:mb-24"
        >
          <span className="inline-block px-4 py-2 bg-gold/10 border border-gold rounded-full text-gold font-semibold text-sm tracking-wider mb-6">
            OUR SERVICES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Complete Construction Solutions
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            From interior design to MEP contracting, we deliver complete solutions tailored to meet the needs of residential, commercial, and industrial spaces
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-14 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-gold/20 transition-all duration-300"
            >
              <Link href={`/services/${service.id}`} className="block h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />

                  {/* Icon */}
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gold rounded-full flex items-center justify-center text-dark shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-dark mb-3 group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-black mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-black">
                        <span className="w-2 h-2 bg-gold rounded-full mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <div className="block">
                    <span className="inline-block w-full text-center py-3 bg-dark text-white font-semibold rounded-lg group-hover:bg-gold group-hover:text-dark transition-all duration-300 transform group-hover:scale-105">
                      Explore More
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 md:mt-28 lg:mt-32 text-center"
        >
          <div className="bg-gradient-to-r from-gold via-gold-light to-gold p-12 rounded-2xl shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-dark mb-4 text-center">
              Ready to Start Your Project?
            </h3>
            <p className="text-xl text-dark/80 mb-8 max-w-2xl mx-auto text-center">
              Let&apos;s discuss how we can bring your vision to life with our expert construction services
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-dark hover:bg-dark-light text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Request a Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
