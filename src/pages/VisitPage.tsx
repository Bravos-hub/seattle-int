import { motion, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const fadeInUp: Variants = {
   hidden: { opacity: 0, y: 30 },
   show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export function VisitPage() {
   const siteContent = useSiteContent()
   useDocumentMeta(
      'Visit',
      'Plan your visit to Seattle International Church. Know our service times, what to expect, and how to find our community.',
   )

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* 1. Cinematic Hero - Parity with others */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-center bg-stone-900 text-white isolate overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2600&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" 
          alt="Church lobby" 
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
                Join our community
              </p>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-6xl md:text-8xl font-black leading-[1] tracking-tighter mb-8 text-white uppercase">
               SEATTLE INTERNATIONAL CHURCH.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-white/50 font-medium max-w-2xl leading-relaxed italic border-l-2 border-white/10 pl-8">
               We can't wait to meet you. Whether it's your first time or your hundredth, you're home here.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. Service Times & Expectation Grid */}
      <section className="py-32 px-6 md:px-16 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 -mt-32 relative z-20">
         <motion.article 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="lg:col-span-6 bg-white p-12 md:p-16 shadow-[0_40px_80px_rgba(0,0,0,0.08)] border border-stone-100 flex flex-col group overflow-hidden relative"
         >
            <div className="absolute top-0 right-0 w-32 h-32 bg-stone-50 rounded-full translate-x-12 -translate-y-12 transition-transform duration-700 group-hover:scale-150" />
            
            <h2 className="font-display text-xs font-black text-primary-500 uppercase tracking-[0.4em] mb-12 relative z-10">Gathering Times</h2>
            <div className="flex flex-col gap-10 flex-1 relative z-10">
               {siteContent.site.serviceTimes.map((time, idx) => (
                  <div key={idx} className="flex justify-between items-baseline border-b border-stone-100 pb-6 last:border-0 last:pb-0 group/item">
                     <div>
                        <strong className="block text-stone-900 font-bold text-xl leading-none mb-3 group-hover/item:text-primary-500 transition-colors">{time.label}</strong>
                        <p className="text-stone-400 text-sm italic font-medium">"{time.note}"</p>
                     </div>
                     <span className="text-stone-900 font-display font-black text-3xl group-hover/item:scale-110 transition-transform">{time.time}</span>
                  </div>
               ))}
            </div>
            
            <div className="mt-16 pt-12 border-t border-stone-100 flex flex-col gap-8 relative z-10">
               <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-stone-300 font-black uppercase tracking-[0.3em]">Our Location</span>
                  <p className="text-stone-900 font-bold text-lg leading-relaxed">{siteContent.site.address}</p>
               </div>
               <a href={siteContent.site.directionsUrl} target="_blank" rel="noreferrer" className="px-10 py-4 bg-primary-500 text-white font-black text-xs tracking-[0.2em] uppercase hover:bg-stone-900 transition-all duration-500 text-center w-full shadow-lg shadow-primary-500/20">Get Directions <span>→</span></a>
            </div>
         </motion.article>

         <motion.article 
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="lg:col-span-6 bg-stone-900 p-12 md:p-16 shadow-[0_40px_80px_rgba(0,0,0,0.2)] border border-white/5 text-white flex flex-col relative overflow-hidden group"
         >
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-500/5 blur-[100px] rounded-full pointer-events-none" />
            
            <h2 className="font-display text-xs font-black text-primary-500 uppercase tracking-[0.4em] mb-12">What to expect</h2>
            <div className="flex flex-col gap-12 relative z-10">
               {siteContent.visitHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex gap-8 group/item">
                     <span className="text-white/10 font-display font-black text-4xl group-hover/item:text-primary-500 transition-all">0{idx + 1}</span>
                     <div>
                        <h3 className="font-display text-2xl font-bold mb-3 group-hover/item:text-white transition-colors tracking-tight uppercase">{highlight.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed italic font-medium">"{highlight.description}"</p>
                     </div>
                  </div>
               ))}
            </div>
            
            <div className="mt-auto pt-24 text-center flex flex-col items-center relative z-10">
               <p className="text-white/30 text-sm mb-10 italic max-w-sm font-medium leading-relaxed">"{siteContent.site.welcomeMessage}"</p>
               <Link to="/ministries" className="text-white text-[10px] font-black uppercase tracking-[0.3em] hover:text-primary-500 transition-colors border-b-2 border-white/10 group-hover:border-primary-500/50 pb-2">Explore Ministries <span className="ml-2">→</span></Link>
            </div>
         </motion.article>
      </section>

      {/* 3. Scripture CTA - Cinematic Modern Strip */}
      <section className="py-48 bg-stone-50 overflow-hidden text-center items-center flex flex-col relative isolate">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none opacity-50">
           <div className="absolute top-1/2 left-0 w-32 h-32 bg-primary-500/10 blur-[80px] rounded-full" />
           <div className="absolute top-1/2 right-0 w-32 h-32 bg-blue-500/10 blur-[80px] rounded-full" />
         </div>

         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="max-w-[1000px] mx-auto px-6 md:px-16 w-full flex flex-col items-center gap-12 relative z-10"
         >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary-500 shadow-xl shadow-black/5 font-black text-2xl">"</div>
            <h2 className="font-display text-4xl md:text-6xl font-black text-stone-900 leading-[1.1] tracking-tighter italic">
               For where two or three gather in my name, there am I with them.
            </h2>
            <div className="flex flex-col items-center gap-4">
               <div className="w-8 h-px bg-stone-200" />
               <p className="text-primary-500 font-black uppercase tracking-[0.4em] text-[10px]">Matthew 18:20</p>
            </div>
         </motion.div>
      </section>
    </div>
  )
}
