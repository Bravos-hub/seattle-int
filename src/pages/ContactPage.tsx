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
    <div className="flex flex-col bg-white overflow-hidden">
      {/* 1. Cinematic Hero - Parity with others */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-center bg-stone-900 text-white isolate overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?q=80&w=2600&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" 
          alt="Church office" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-900/40 to-stone-900 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-primary-500" />
              <p className="text-primary-500 font-black uppercase tracking-[0.4em] text-[10px]">
                Get in touch
              </p>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-6xl md:text-8xl font-black leading-[1] tracking-tighter mb-8 text-white">
               We're here for you.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/50 font-medium max-w-2xl leading-relaxed italic border-l-2 border-white/10 pl-8">
               Whether you have a question, want to volunteer, or simply need someone to talk to.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. Contact Content Grid */}
      <section className="py-32 px-6 md:px-16 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
         <motion.div 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="lg:col-span-12 mb-12 text-center"
         >
            <h2 className="font-display text-5xl md:text-7xl font-black text-stone-900 tracking-tighter mb-4">Connect With Us</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto" />
         </motion.div>

         <div className="lg:col-span-5 flex flex-col gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 shadow-[0_40px_80px_rgba(0,0,0,0.06)] border border-stone-100 relative group overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-stone-50 rounded-full translate-x-12 -translate-y-12" />
               <h2 className="font-display text-xs font-black text-primary-500 uppercase tracking-[0.4em] mb-12 relative z-10">Church Office</h2>
               <div className="flex flex-col gap-10 relative z-10">
                  <div className="flex items-start gap-6 group/item">
                     <div className="shrink-0 w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center group-hover/item:bg-primary-500 group-hover/item:text-white transition-all duration-500 shadow-sm shadow-primary-500/10 font-black">
                        @
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none mb-1">Office Email</span>
                        <p className="text-stone-900 font-bold text-lg">{siteContent.site.email}</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-6 group/item">
                     <div className="shrink-0 w-12 h-12 bg-stone-50 text-stone-400 rounded-2xl flex items-center justify-center group-hover/item:bg-stone-900 group-hover/item:text-white transition-all duration-500 shadow-sm font-black">
                        #
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none mb-1">Phone Line</span>
                        <p className="text-stone-900 font-bold text-lg">{siteContent.site.phone}</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-6 group/item">
                     <div className="shrink-0 w-12 h-12 bg-stone-50 text-stone-400 rounded-2xl flex items-center justify-center group-hover/item:bg-stone-900 group-hover/item:text-white transition-all duration-500 shadow-sm font-black">
                        ^
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none mb-1">Our Location</span>
                        <p className="text-stone-900 font-bold text-lg leading-relaxed">{siteContent.site.address}</p>
                        <a href={siteContent.site.directionsUrl} target="_blank" rel="noreferrer" className="text-primary-500 hover:text-stone-900 transition-colors font-black text-xs uppercase tracking-widest mt-4 inline-flex items-center gap-2 group-hover/item:translate-x-2 transition-transform">Get Directions <span>→</span></a>
                     </div>
                  </div>
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-stone-900 p-12 shadow-[0_40px_80px_rgba(0,0,0,0.15)] border border-white/5 text-white relative overflow-hidden"
            >
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-500/5 blur-[100px] rounded-full pointer-events-none" />
               <h2 className="font-display text-xs font-black text-primary-500 uppercase tracking-[0.4em] mb-12">Office Hours</h2>
               <ul className="flex flex-col gap-8 relative z-10">
                  {siteContent.site.officeHours.map((time, idx) => (
                    <li key={idx} className="flex flex-col border-b border-white/5 pb-4 last:border-0 last:pb-0">
                       <p className="text-lg font-medium text-white italic">"{time}"</p>
                    </li>
                  ))}
               </ul>
            </motion.div>
         </div>

         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="lg:col-span-7 flex flex-col gap-8"
         >
            {siteContent.site.mapEmbedUrl ? (
               <div className="w-full h-full min-h-[600px] border border-stone-100 shadow-2xl relative group">
                  <iframe
                     className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                     src={siteContent.site.mapEmbedUrl}
                     allowFullScreen
                     loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute inset-0 pointer-events-none border-[20px] border-white/0 group-hover:border-white transition-all duration-700 opacity-20" />
               </div>
            ) : (
               <div className="w-full h-full min-h-[600px] bg-stone-50 border border-stone-100 flex flex-col items-center justify-center p-12 text-center shadow-inner">
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-stone-900/5 border border-stone-100 animate-pulse">
                    <svg className="w-8 h-8 text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <h3 className="font-display text-4xl font-bold text-stone-900 mb-4 tracking-tighter">Map Embed Pending</h3>
                  <p className="text-stone-400 italic max-w-sm font-medium">Place a Google Maps embed URL in the Admin CMS to display the church location here.</p>
               </div>
            )}
         </motion.div>
      </section>

      {/* 3. Social Bar - Modern Cinematic Strip */}
      <section className="py-48 bg-stone-50 items-center flex flex-col relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
         
         <p className="text-primary-500 font-black uppercase tracking-[0.6em] text-[10px] mb-20 animate-pulse">Stay Connected</p>
         
         <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full flex flex-wrap justify-center gap-16 md:gap-32">
            {siteContent.site.socials.map((social, idx) => (
              <motion.a 
                key={social.label} 
                href={social.url} 
                target="_blank" 
                rel="noreferrer" 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col items-center gap-6"
              >
                 <span className="font-display font-black text-4xl md:text-6xl text-stone-200 group-hover:text-primary-500 transition-all duration-700 uppercase tracking-tighter">
                   {social.label}
                 </span>
                 <div className="w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-500" />
              </motion.a>
            ))}
         </div>
      </section>
    </div>
  )
}
