'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import { BlogPost, BlogLink } from '../../data/blogData';

function renderTextWithLinks(text: string, links?: BlogLink[]) {
    if (!links || links.length === 0) return text;

    const parts: (string | React.ReactNode)[] = [];
    let remaining = text;
    let keyIdx = 0;

    // Sort links by their position in the text to process in order
    const sortedLinks = [...links].sort((a, b) => remaining.indexOf(a.text) - remaining.indexOf(b.text));

    for (const link of sortedLinks) {
        const idx = remaining.indexOf(link.text);
        if (idx === -1) continue;

        if (idx > 0) parts.push(remaining.substring(0, idx));

        parts.push(
            link.external ? (
                <a
                    key={keyIdx++}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-dark underline underline-offset-2 font-semibold transition-colors duration-300"
                >
                    {link.text}
                </a>
            ) : (
                <Link
                    key={keyIdx++}
                    href={link.href}
                    className="text-gold hover:text-gold-dark underline underline-offset-2 font-semibold transition-colors duration-300"
                >
                    {link.text}
                </Link>
            )
        );

        remaining = remaining.substring(idx + link.text.length);
    }

    if (remaining) parts.push(remaining);
    return <>{parts}</>;
}

export default function BlogDetailContent({ post }: { post: BlogPost }) {
    return (
        <>
            {/* Hero Banner */}
            <div className="relative h-[50vh] md:h-[60vh]">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark" />

                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors duration-300 mb-6"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Blog
                            </Link>
                            <span className="inline-block px-3 py-1 bg-gold text-dark text-xs font-bold rounded-full mb-4 ml-4">
                                {post.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-white/80">
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
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="bg-gradient-to-b from-white via-gray-50 to-white py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="prose-content"
                    >
                        {post.content.map((section, idx) => {
                            switch (section.type) {
                                case 'h2':
                                    return (
                                        <h2
                                            key={idx}
                                            className="text-2xl md:text-3xl font-bold text-dark mt-12 mb-6 pb-3 border-b-2 border-gold/30"
                                        >
                                            {section.text}
                                        </h2>
                                    );
                                case 'h3':
                                    return (
                                        <h3
                                            key={idx}
                                            className="text-xl md:text-2xl font-bold text-dark mt-8 mb-4"
                                        >
                                            {section.text}
                                        </h3>
                                    );
                                case 'paragraph':
                                    return (
                                        <p
                                            key={idx}
                                            className="text-black text-lg leading-relaxed mb-6 text-justify"
                                        >
                                            {renderTextWithLinks(section.text || '', section.links)}
                                        </p>
                                    );
                                case 'image':
                                    return (
                                        <div key={idx} className="my-10 rounded-xl overflow-hidden shadow-lg">
                                            <Image
                                                src={section.src || ''}
                                                alt={section.alt || ''}
                                                width={900}
                                                height={500}
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    );
                                case 'bold-list':
                                    return (
                                        <div key={idx} className="space-y-6 my-8">
                                            {section.items?.map((item, i) => (
                                                <p
                                                    key={i}
                                                    className="text-black text-lg leading-relaxed text-justify"
                                                >
                                                    <strong className="text-dark">{item.bold}</strong>{' '}
                                                    {item.text}
                                                </p>
                                            ))}
                                        </div>
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16 bg-gradient-to-r from-gold via-gold-light to-gold p-10 md:p-12 rounded-2xl shadow-2xl text-center"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4">
                            Ready to Build? Let&apos;s Talk.
                        </h3>
                        <p className="text-lg text-dark/80 mb-8 max-w-2xl mx-auto">
                            Visit our website to review our portfolio, explore our full service range, or connect with our team directly.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-block px-10 py-4 bg-dark hover:bg-dark-light text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/services"
                                className="inline-block px-10 py-4 bg-white hover:bg-gray-100 text-dark font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Explore Services
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </article>
        </>
    );
}
