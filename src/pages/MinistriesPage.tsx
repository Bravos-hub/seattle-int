import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'

import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

export function MinistriesPage() {
  const siteContent = useSiteContent()
  useDocumentMeta(
    'Ministries',
    'Find a place to belong. Explore our ministries for children, students, men, women, and the local community.',
  )

  return (
    <div className="flex flex-col bg-white">
      {/* Cinematic Hero */}
      <section className="relative w-full pt-48 pb-32 flex flex-col justify-center bg-stone-900 text-white isolate overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1526666923127-b2970f64b422?q=80&w=2600&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" 
          alt="Hands joined" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.p variants={fadeInUp} className="text-primary-500 font-bold uppercase tracking-[0.2em] text-xs mb-4">
              Community
            </motion.p>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
               Find your people.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-stone-300 font-medium max-w-2xl leading-relaxed">
               Church is more than a Sunday service. It's a family where everyone has a place to belong and serve.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto w-full">
         <div className="mb-16">
            <p className="text-stone-400 font-bold uppercase tracking-[0.2em] text-xs mb-4 text-center">Our Ministries</p>
            <h2 className="font-display text-4xl font-bold text-stone-900 text-center">Ways to connect and serve</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
            {siteContent.ministries.map((ministry, idx) => (
               <motion.article 
                 key={ministry.slug} 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: idx * 0.1 }}
                 className="flex flex-col items-start group"
               >
                  <div className="w-14 h-14 bg-stone-50 border border-stone-100 flex items-center justify-center mb-8 text-stone-400 group-hover:bg-[#f97316] group-hover:text-white group-hover:border-[#f97316] transition-all duration-300">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d={
                          idx % 5 === 0 ? "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" : 
                          idx % 5 === 1 ? "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" : 
                          idx % 5 === 2 ? "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" : 
                          idx % 5 === 3 ? "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" : 
                          "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        }/>
                     </svg>
                  </div>
                  <p className="text-primary-500 text-[10px] font-bold tracking-widest uppercase mb-2">{ministry.audience}</p>
                  <h3 className="font-display text-2xl font-bold text-stone-900 mb-4 group-hover:text-primary-500 transition-colors uppercase leading-none">{ministry.name}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-8 italic">"{ministry.summary}"</p>
                  <Link 
                    to={`/ministries/${ministry.slug}`} 
                    className="text-stone-900 text-xs font-bold uppercase tracking-[0.2em] group-hover:text-[#f97316] transition-colors flex items-center gap-2 border-b border-stone-100 pb-2 group-hover:border-[#f97316]/30"
                  >
                    Explore Ministry →
                  </Link>
               </motion.article>
            ))}
         </div>
      </section>

      {/* Scripture Block */}
      <section className="py-24 bg-stone-50 relative isolate overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 text-center flex flex-col items-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold max-w-4xl leading-tight mb-8 text-stone-900">
               "God has given each of you a gift from his great variety of spiritual gifts. Use them well to serve one another."
            </h2>
            <p className="text-stone-400 italic font-medium">— 1 Peter 4:10</p>
        </div>
      </section>
    </div>
  )
}
