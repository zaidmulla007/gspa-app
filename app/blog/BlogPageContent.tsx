'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../data/blogData';

export default function BlogPageContent() {
    return (
        <div className="pt-32 pb-20 bg-gradient-to-b from-dark via-dark-light to-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-2 bg-gold/10 border border-gold rounded-full text-gold font-semibold text-sm tracking-wider mb-4">
                        OUR INSIGHTS
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Shaping Better Built Environments
                    </h1>
                    <p className="text-xl text-white max-w-3xl mx-auto">
                        Our insights reflect our knowledge, expertise, and commitment to staying ahead of industry trends through continuous learning, innovation, and improvement
                    </p>
                </motion.div>

                {/* Blog Posts */}
                <div className="space-y-12">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-gold/20 transition-all duration-300"
                        >
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Image */}
                                <div className="relative h-80 md:h-auto overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 px-4 py-2 bg-gold rounded-full text-dark font-bold text-sm">
                                        {post.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 md:p-12 flex flex-col justify-center">
                                    <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4 hover:text-gold transition-colors duration-300">
                                        {post.title}
                                    </h2>
                                    <p className="text-black text-lg mb-6 leading-relaxed text-justify">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-black">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <time dateTime={post.dateISO}>{post.date}</time>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="inline-flex items-center gap-2 text-dark hover:text-gold font-semibold transition-colors duration-300 group"
                                    >
                                        Read Full Article
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mt-24 text-center"
                >
                    <div className="bg-gradient-to-r from-gold via-gold-light to-gold p-12 rounded-2xl shadow-2xl">
                        <h3 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                            Want to Learn More?
                        </h3>
                        <p className="text-xl text-dark/80 mb-8 max-w-2xl mx-auto">
                            Contact us for the latest insights and industry updates
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-10 py-4 bg-dark hover:bg-dark-light text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
