'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { blogPosts } from '../data/blogData';

const Blog = () => {
  const post = blogPosts[0];

  return (
    <section id="blog" className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-dark via-dark-light to-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 lg:mb-24"
        >
          <span className="inline-block px-4 py-2 bg-gold/10 border border-gold rounded-full text-gold font-semibold text-sm tracking-wider mb-4">
            OUR INSIGHTS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shaping Better Built Environments
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Our insights reflect our knowledge, expertise, and commitment to staying ahead of industry trends through continuous learning, innovation, and improvement
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 lg:mb-24"
        >
          <Link href={`/blog/${post.id}`}>
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-2xl hover:shadow-gold/20 transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-80 md:h-[400px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-4 py-2 bg-gold rounded-full text-dark font-bold text-sm">
                    Featured
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="inline-block w-fit px-3 py-1 bg-gold/10 text-gold text-xs font-bold rounded-full mb-4">
                    {post.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4 group-hover:text-gold transition-colors duration-300">
                    {post.title}
                  </h3>
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
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-dark group-hover:text-gold font-semibold transition-colors duration-300">
                    Read Full Article
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-block px-8 py-4 bg-gold hover:bg-gold-dark text-dark font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-gold/30"
          >
            View All Articles
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
