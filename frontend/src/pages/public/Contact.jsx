import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function Contact() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Your message has been sent successfully. We will respond within 24 hours!', 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight">Contact Gearbox support</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Got questions about part compatibility, shipments, or bulk building? Our expert engineers are here to assist!
        </p>
      </section>

      {/* Grid Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact info list */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Get in Touch</h2>
          <p className="text-sm text-slate-450 dark:text-slate-400">
            For urgent issues like order cancellation or address redirects, please call our hotline directly.
          </p>
          
          <div className="space-y-4">
            <div className="flex gap-4 p-4 border border-slate-150 dark:border-slate-700 bg-white dark:bg-slate-800/40 rounded-2xl">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Hotline</h4>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">+1 (512) 555-0199</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 border border-slate-150 dark:border-slate-700 bg-white dark:bg-slate-800/40 rounded-2xl">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Email</h4>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">support@gearboxpc.com</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 border border-slate-150 dark:border-slate-700 bg-white dark:bg-slate-800/40 rounded-2xl">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Address</h4>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">123 Tech Lane, Austin, TX 78701</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 p-6 md:p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-sm">
          <h2 className="text-xl font-bold tracking-tight mb-6">Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter name..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Order inquiry, parts support..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase">Message Details</label>
              <textarea
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Provide as many details as possible (order numbers, motherboard sockets, PSU models)..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Send message
            </button>
          </form>
        </div>

      </div>

      {/* FAQ Accordion */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How long does assembly take?', a: 'Standard build configuration orders take 2-4 business days for professional assembly, cable management, and extensive hardware benchmark stress testing before shipping.' },
            { q: 'Do you ship original part boxes?', a: 'Yes! All original brand manufacturing component retail boxes, warranties, accessories, manuals, and screws are securely packed inside a larger shipping pallet alongside your fully-assembled computer.' },
            { q: 'What is your compatibility guarantee?', a: 'Our PC Builder Dashboard is equipped with automatic validation criteria checking socket layouts, TDP power draws, and sizes. If our system registers a functional green status, we guarantee parts will match!' }
          ].map((item, idx) => (
            <details key={idx} className="group p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex justify-between items-center font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 cursor-pointer list-none">
                <span className="flex items-center gap-2"><HelpCircle className="w-4.5 h-4.5 text-primary flex-shrink-0" /> {item.q}</span>
                <span className="transition-transform group-open:rotate-180 text-slate-400">▼</span>
              </summary>
              <p className="text-sm text-slate-500 dark:text-slate-450 mt-3 pl-6.5 leading-relaxed font-semibold">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

    </div>
  );
}
