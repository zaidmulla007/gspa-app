'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import Swal from 'sweetalert2';

const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const apiUrl = window.location.hostname === 'localhost'
        ? 'http://localhost/wbm/public/api/send-email.php'
        : 'https://wbmcontractingllc.com/api/send-email.php';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        await Swal.fire({
          title: 'Thank You!',
          text: 'Thank you for submitting the form. We will get back to you shortly!',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#D4AF37',
          customClass: {
            confirmButton: 'font-bold',
          }
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } else {
        await Swal.fire({
          title: 'Oops!',
          text: data.message || 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#D4AF37',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      await Swal.fire({
        title: 'Connection Error',
        text: 'Unable to send your message. Please check your internet connection and try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#D4AF37',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <Phone className="w-6 h-6" />, title: 'Phone', content: '+971 55 339 6704', hoverName: 'Mohammadin', link: 'tel:+971553396704' },
    { icon: <Phone className="w-6 h-6" />, title: 'Phone', content: '+971 56 666 9304', hoverName: 'Usman', link: 'tel:+971566669304' },
    { icon: <Phone className="w-6 h-6" />, title: 'Phone', content: '+971 54 722 6972', hoverName: 'Muhammad Siddiq Khokhar (Project Manager)', link: 'tel:+971547226972' },
    { icon: <Mail className="w-6 h-6" />, title: 'Email', content: 'wbmcontracting@gmail.com', link: 'mailto:wbmcontracting@gmail.com' },
    { icon: <MapPin className="w-6 h-6" />, title: 'Location', content: 'P.O.Box: 93361, Dubai, U.A.E', link: '#' },
    { icon: <Clock className="w-6 h-6" />, title: 'Working Hours', content: 'Mon - Sat: 8:00 AM - 6:00 PM', link: '#' },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, link: 'https://instagram.com', name: 'Instagram' },
    { icon: <Facebook className="w-5 h-5" />, link: 'https://facebook.com', name: 'Facebook' },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      link: 'https://www.tiktok.com/@technical.boss1?_r=1&_t=ZS-944q79a07fh',
      name: 'TikTok'
    },
    { icon: <Youtube className="w-5 h-5" />, link: 'https://youtube.com', name: 'YouTube' },
    { icon: <Linkedin className="w-5 h-5" />, link: 'https://linkedin.com', name: 'LinkedIn' },
  ];

  return (
    <div className="pt-32 pb-20 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-gold/10 border border-gold rounded-full text-gold font-semibold text-sm tracking-wider mb-4">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-4">
            Let's Start Your Project
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto">
            Ready to bring your vision to life? Contact us today for a consultation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-12 rounded-2xl shadow-xl flex flex-col h-full"
          >
            <h2 className="text-3xl font-bold text-dark mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col flex-1">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">Full Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors duration-300" placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">Email Address *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors duration-300" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-black mb-2">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors duration-300" placeholder="+971 XX XXX XXXX" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-black mb-2">Subject *</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors duration-300">
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="quote">Request a Quote</option>
                    <option value="project">New Project</option>
                    <option value="support">Support</option>
                  </select>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <label htmlFor="message" className="block text-sm font-semibold text-black mb-2">Your Message *</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gold focus:outline-none transition-colors duration-300 resize-none flex-1 min-h-[200px]" placeholder="Tell us about your project..."></textarea>
              </div>

              <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }} className={`w-full py-4 bg-gold hover:bg-gold-dark text-dark font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-gold/30 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.a key={index} href={info.link} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -5 }} className="group/card bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-gold/20 transition-all duration-300 border-l-4 border-gold">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center text-gold flex-shrink-0">{info.icon}</div>
                    <div>
                      <h3 className="font-bold text-dark mb-1">{info.title}</h3>
                      <p className="text-black text-sm">{info.content}</p>
                      {info.hoverName && <p className="text-gray-500 text-xs mt-1">{info.hoverName}</p>}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-dark mb-4">Visit Our Office</h3>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3610.098876581832!2d55.3291359!3d25.2759647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjXCsDE2JzMzLjUiTiA1NcKwMTknNTQuMiJF!5e0!3m2!1sen!2sae!4v1234567890" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }} className="bg-gradient-to-br from-dark to-dark-light p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a key={index} href={social.link} whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }} className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center text-dark hover:bg-gold-light transition-all duration-300 shadow-lg" aria-label={social.name}>{social.icon}</motion.a>
                ))}
              </div>
              <p className="text-white mt-4 text-sm">Follow us on social media for updates, projects, and industry insights</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }} className="bg-gradient-to-r from-gold via-gold-light to-gold p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-dark mb-4">Why Choose WBM?</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-dark"><span className="w-2 h-2 bg-dark rounded-full mr-3 mt-2"></span>Expert team with years of industry experience</li>
                <li className="flex items-start text-dark"><span className="w-2 h-2 bg-dark rounded-full mr-3 mt-2"></span>Quality craftsmanship and attention to detail</li>
                <li className="flex items-start text-dark"><span className="w-2 h-2 bg-dark rounded-full mr-3 mt-2"></span>On-time delivery and transparent pricing</li>
                <li className="flex items-start text-dark"><span className="w-2 h-2 bg-dark rounded-full mr-3 mt-2"></span>Comprehensive project management</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;
