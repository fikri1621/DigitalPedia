import { Mail, MessageSquare, ExternalLink, Globe, Share2 } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-24 bg-neutral-50 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-neutral-900 mb-6">Get in Touch.</h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
            Have a question about a product or need help with a template? We&apos;re here to help you succeed.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8">Contact Information</h2>
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-900 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-1">Email Us</h3>
                  <p className="text-neutral-500">hello@auradigital.com</p>
                  <p className="text-xs text-neutral-400 mt-1">Typical response time: 24-48 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-900 shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900 mb-1">Etsy Messages</h3>
                  <p className="text-neutral-500">Contact us directly on Etsy for order support.</p>
                  <a href="https://www.etsy.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-neutral-900 underline underline-offset-4 mt-2 inline-block">
                    Send Etsy Message
                  </a>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8">Follow Our Journey</h2>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-neutral-900 text-white rounded-2xl flex items-center justify-center hover:bg-neutral-800 transition-colors">
                <Share2 className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-neutral-900 text-white rounded-2xl flex items-center justify-center hover:bg-neutral-800 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-neutral-900 text-white rounded-2xl flex items-center justify-center hover:bg-neutral-800 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            
            <div className="mt-12 p-8 bg-neutral-900 text-white rounded-3xl">
               <h3 className="text-lg font-bold mb-4">Support Our Shop</h3>
               <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                 The best way to support our independent design studio is to visit our Etsy shop and share your feedback.
               </p>
               <a
                 href="https://www.etsy.com"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center px-6 py-3 text-xs font-bold uppercase tracking-widest text-neutral-900 bg-white rounded-full hover:bg-neutral-100 transition-colors"
               >
                 Visit Etsy Store <ExternalLink className="w-3.5 h-3.5 ml-2" />
               </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-neutral-50 p-8 sm:p-12 rounded-3xl border border-neutral-100">
            <h2 className="text-2xl font-serif font-bold text-neutral-900 mb-8">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white" placeholder="jane@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white appearance-none">
                  <option>General Inquiry</option>
                  <option>Product Support</option>
                  <option>Custom Project</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-neutral-500">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white" placeholder="How can we help?"></textarea>
              </div>
              <button type="button" className="w-full py-4 bg-neutral-900 text-white font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-neutral-800 transition-colors shadow-lg active:scale-95">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
