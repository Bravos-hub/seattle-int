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
         {/* Cinematic Hero */}
         <section className="relative w-full pt-48 pb-32 flex flex-col justify-center bg-[#0b162c] text-white isolate overflow-hidden">
            <img
               src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2600&auto=format&fit=crop"
               className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
               alt="Church lobby"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b162c] via-[#0b162c]/60 to-transparent pointer-events-none" />

            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16">
               <motion.div
                  initial="hidden"
                  animate="show"
                  className="max-w-3xl"
               >
                  <motion.p variants={fadeInUp} className="text-primary-500 font-bold uppercase tracking-[0.2em] text-xs mb-4">
                     Plan your visit
                  </motion.p>
                  <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6 whitespace-nowrap">
                     SEATTLE INTERNATIONAL CHURCH.
                  </motion.h1>
                  <motion.p variants={fadeInUp} className="text-xl text-stone-300 font-medium max-w-xl leading-relaxed italic">
                     We can't wait to meet you. Here is everything you need to know for your first Sunday.
                  </motion.p>
               </motion.div>
            </div>
         </section>

         {/* Service Times & Address */}
         <section className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 -mt-16 relative z-20">
            <motion.article
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.3, duration: 1 }}
               className="bg-white p-10 md:p-14 shadow-2xl shadow-stone-900/5 border border-stone-100 h-full flex flex-col"
            >
               <h2 className="font-display text-3xl font-bold text-stone-900 mb-8 uppercase tracking-wide">Gathering Times</h2>
               <div className="flex flex-col gap-8 flex-1">
                  {siteContent.site.serviceTimes.map((time, idx) => (
                     <div key={idx} className="flex justify-between items-baseline border-b border-stone-50 pb-4 last:border-0 last:pb-0">
                        <div>
                           <strong className="block text-stone-900 font-bold text-lg leading-none mb-2">{time.label}</strong>
                           <p className="text-stone-400 text-xs italic">{time.note}</p>
                        </div>
                        <span className="text-primary-500 font-display font-medium text-2xl">{time.time}</span>
                     </div>
                  ))}
               </div>
               <div className="mt-12 p-8 bg-stone-50 border border-stone-100 flex flex-col gap-4">
                  <div>
                     <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block mb-2">Location</span>
                     <p className="text-stone-800 font-bold">{siteContent.site.address}</p>
                  </div>
                  <a href={siteContent.site.directionsUrl} target="_blank" rel="noreferrer" className="px-8 py-3 bg-[#f97316] text-white font-bold text-xs tracking-widest uppercase hover:bg-[#ea580c] transition-colors text-center w-full">Get Directions →</a>
               </div>
            </motion.article>

            <motion.article
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.4, duration: 1 }}
               className="bg-[#0b162c] p-10 md:p-14 shadow-2xl shadow-stone-900/10 border border-white/5 text-white flex flex-col"
            >
               <h2 className="font-display text-3xl font-bold mb-8 uppercase tracking-wide">What to expect</h2>
               <div className="flex flex-col gap-8">
                  {siteContent.visitHighlights.map((highlight, idx) => (
                     <div key={idx} className="flex gap-6 group">
                        <span className="text-primary-500 font-display font-extrabold text-4xl opacity-20 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                        <div>
                           <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors uppercase tracking-tight">{highlight.title}</h3>
                           <p className="text-white/40 text-sm leading-relaxed italic">"{highlight.description}"</p>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="mt-auto pt-12 text-center flex flex-col items-center">
                  <p className="text-white/60 text-sm mb-6 max-w-xs">{siteContent.site.welcomeMessage}</p>
                  <Link to="/ministries" className="text-primary-500 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors border-b border-primary-500/30 pb-1">Explore Ministries →</Link>
               </div>
            </motion.article>
         </section>

         {/* Scripture CTA */}
         <section className="py-32 bg-stone-50 overflow-hidden text-center items-center flex flex-col">
            <div className="max-w-[800px] mx-auto px-6 md:px-16 w-full flex flex-col items-center gap-8">
               <h2 className="font-display text-3xl md:text-5xl font-bold text-stone-900 leading-tight">
                  "For where two or three gather in my name, there am I with them."
               </h2>
               <p className="text-stone-400 italic font-medium">— Matthew 18:20</p>
            </div>
         </section>
      </div>
   )
}
