import { motion, type Variants } from 'framer-motion'
import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export function ContactPage() {
  const siteContent = useSiteContent()
  useDocumentMeta(
    'Contact',
    'Get in touch with Seattle International Church. Find our office hours, address, phone number, and social links.',
  )

  return (
    <div className="flex flex-col bg-white">
      {/* Cinematic Hero */}
      <section className="relative w-full pt-48 pb-32 flex flex-col justify-center bg-[#0b162c] text-white isolate overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?q=80&w=2600&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" 
          alt="Church office" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b162c] via-[#0b162c]/60 to-transparent pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16">
          <motion.div 
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <motion.p variants={fadeInUp} className="text-primary-500 font-bold uppercase tracking-[0.2em] text-xs mb-4">
              Get in touch
            </motion.p>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6 whitespace-nowrap">
               We're here for you.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-stone-300 font-medium max-w-xl leading-relaxed italic">
               Whether you have a question, want to volunteer, or simply need someone to talk to.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content Grid */}
      <section className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
         
         <div className="lg:col-span-4 flex flex-col gap-12">
            <div className="bg-white p-10 border border-stone-100 shadow-2xl shadow-stone-900/5">
               <h2 className="font-display text-2xl font-bold text-stone-900 mb-8 uppercase tracking-wide">Church Office</h2>
               <div className="flex flex-col gap-8">
                  <div className="flex items-start gap-4">
                     <div className="shrink-0 w-10 h-10 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none">Address</span>
                        <p className="text-stone-800 font-bold">{siteContent.site.address}</p>
                        <a href={siteContent.site.directionsUrl} target="_blank" rel="noreferrer" className="text-xs text-primary-500 hover:text-stone-900 transition-colors font-bold underline underline-offset-4 mt-2 inline-block">View on Google Maps</a>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="shrink-0 w-10 h-10 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-22.57 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none">Phone</span>
                        <p className="text-stone-800 font-bold">{siteContent.site.phone}</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="shrink-0 w-10 h-10 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none">Email</span>
                        <p className="text-stone-800 font-bold">{siteContent.site.email}</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-[#0b162c] p-10 shadow-2xl shadow-stone-900/10 border border-white/5 text-white">
               <h2 className="font-display text-2xl font-bold mb-8 uppercase tracking-wide">Office Hours</h2>
               <ul className="flex flex-col gap-6">
                  {siteContent.site.officeHours.map((time, idx) => (
                    <li key={idx} className="flex flex-col border-b border-white/5 pb-4 last:border-0 last:pb-0">
                       <p className="text-sm italic text-white/50">{time}</p>
                    </li>
                  ))}
               </ul>
            </div>
         </div>

         <div className="lg:col-span-8 flex flex-col gap-8">
            {siteContent.site.mapEmbedUrl ? (
               <div className="w-full h-full min-h-[500px] border border-stone-100 shadow-2xl shadow-stone-900/5 overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
                  <iframe
                     className="w-full h-full"
                     src={siteContent.site.mapEmbedUrl}
                     allowFullScreen
                     loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade"
                  />
               </div>
            ) : (
               <div className="w-full h-full min-h-[500px] bg-stone-50 border border-stone-100 flex flex-col items-center justify-center p-12 text-center shadow-inner">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-stone-100">
                    <svg className="w-8 h-8 text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">Map Embed Pending</h3>
                  <p className="text-stone-400 italic max-w-sm">Place a Google Maps embed URL in the Admin CMS to display the church location here.</p>
               </div>
            )}
         </div>
      </section>

      {/* Social Bar */}
      <section className="py-24 bg-stone-50 overflow-hidden text-center items-center flex flex-col">
         <p className="text-stone-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">Follow Our Journey</p>
         <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full flex flex-wrap justify-center gap-12 md:gap-24">
            {siteContent.site.socials.map((social) => (
              <a 
                key={social.label} 
                href={social.url} 
                target="_blank" 
                rel="noreferrer" 
                className="group flex flex-col items-center gap-2"
              >
                 <span className="font-display font-bold text-lg text-stone-900 group-hover:text-primary-500 transition-colors uppercase tracking-widest">{social.label}</span>
                 <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">View Profile →</span>
              </a>
            ))}
         </div>
      </section>
    </div>
  )
}
