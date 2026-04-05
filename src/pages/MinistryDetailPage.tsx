import { useParams, Navigate, Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'

import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export function MinistryDetailPage() {
  const { slug } = useParams()
  const siteContent = useSiteContent()
  const ministry = siteContent.ministries.find((m) => m.slug === slug)

  useDocumentMeta(
    ministry?.name ?? 'Ministry',
    ministry?.summary ?? 'Learn more about this ministry at Seattle International Church.',
  )

  if (!ministry) {
    return <Navigate replace to="/ministries" />
  }

  return (
    <div className="flex flex-col bg-white">
      {/* Cinematic Hero */}
      <section className="relative w-full pt-48 pb-32 flex flex-col justify-center bg-[#0b162c] text-white isolate overflow-hidden">
        <img 
          src={`https://images.unsplash.com/photo-1521791136064-7986c2959213?q=80&w=2600&auto=format&fit=crop`} 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" 
          alt={ministry.name} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b162c] via-[#0b162c]/60 to-transparent pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16">
          <motion.div 
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <motion.p variants={fadeInUp} className="text-primary-500 font-bold uppercase tracking-[0.2em] text-xs mb-4">
              {ministry.audience}
            </motion.p>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
               {ministry.name}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-stone-300 font-medium max-w-2xl leading-relaxed italic">
               "{ministry.summary}"
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Detail Content */}
      <section className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
         
         <div className="lg:col-span-8 flex flex-col gap-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full aspect-video bg-stone-100 overflow-hidden shadow-2xl shadow-stone-900/5 mb-8"
            >
               <img 
                 src={`https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000&auto=format&fit=crop`} 
                 className="w-full h-full object-cover" 
                 alt={ministry.name} 
               />
            </motion.div>

            <div className="max-w-3xl">
              <h2 className="font-display text-3xl font-bold text-stone-900 mb-6 uppercase tracking-tight">Our Purpose</h2>
              <p className="text-stone-600 leading-[1.8] text-lg mb-12">{ministry.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                 <div>
                    <h3 className="font-display text-xl font-bold text-stone-900 mb-6 uppercase border-b border-stone-100 pb-2">Rhythm & Activities</h3>
                    <ul className="flex flex-col gap-4">
                       {ministry.rhythm.map((item, idx) => (
                          <li key={idx} className="flex gap-4 items-start pt-4 border-t border-stone-50 first:border-0 first:pt-0">
                             <span className="text-primary-500 font-bold text-sm">0{idx + 1}</span>
                             <p className="text-sm text-stone-500 italic leading-relaxed">{item}</p>
                          </li>
                       ))}
                    </ul>
                 </div>
                 <div>
                    <h3 className="font-display text-xl font-bold text-stone-900 mb-6 uppercase border-b border-stone-100 pb-2">Opportunities</h3>
                    <ul className="flex flex-col gap-4">
                       {ministry.opportunities.map((item, idx) => (
                          <li key={idx} className="flex gap-4 items-center pt-4 border-t border-stone-50 first:border-0 first:pt-0">
                             <svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                             <p className="text-sm text-stone-500 italic leading-relaxed">{item}</p>
                          </li>
                       ))}
                    </ul>
                 </div>
              </div>
            </div>
         </div>

         <aside className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-stone-50 p-10 border border-stone-100 flex flex-col items-center text-center">
               <div className="w-20 h-20 bg-[#0b162c] text-white rounded-full flex items-center justify-center font-display font-bold text-2xl mb-6 shadow-xl shadow-stone-900/10">
                  {ministry.leader.split(' ').map(n => n[0]).slice(0, 2).join('')}
               </div>
               <p className="text-primary-500 font-bold uppercase tracking-widest text-[10px] mb-2 leading-none">Ministry Leader</p>
               <h4 className="font-display text-2xl font-bold text-stone-900 mb-4">{ministry.leader}</h4>
               <a href={`mailto:${ministry.email}`} className="text-sm text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-widest font-bold border-b border-stone-200 pb-1 mb-8">{ministry.email}</a>
               
               <div className="flex flex-col gap-6 w-full pt-8 border-t border-stone-200">
                  <div className="flex flex-col gap-1 items-center">
                     <span className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em]">Typical Meeting Time</span>
                     <p className="text-stone-800 font-bold text-lg">{ministry.meetingTime}</p>
                  </div>
                  
                  <a 
                    href={`mailto:${ministry.email}?subject=Interested in ${ministry.name}`}
                    className="w-full py-4 bg-[#f97316] text-white font-bold text-sm tracking-widest uppercase hover:bg-[#ea580c] transition-colors shadow-2xl shadow-primary-500/10"
                  >
                    Get Involved
                  </a>
               </div>
            </div>

            <div className="p-8 border border-stone-100 space-y-4">
               <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Other Ministries</p>
               <div className="flex flex-col gap-2">
                  {siteContent.ministries.filter(m => m.slug !== ministry.slug).slice(0, 4).map(m => (
                    <Link key={m.slug} to={`/ministries/${m.slug}`} className="text-stone-900 font-bold text-sm hover:text-primary-500 transition-colors py-2 border-b border-stone-50">
                      {m.name} →
                    </Link>
                  ))}
               </div>
            </div>
         </aside>
      </section>

      {/* Bottom Nav */}
      <section className="py-12 px-6 md:px-16 border-t border-stone-100">
         <div className="max-w-[1400px] mx-auto w-full flex justify-between items-center">
            <Link to="/ministries" className="text-stone-400 font-bold text-xs uppercase tracking-widest hover:text-stone-900 transition-colors flex items-center gap-2">
               ← Back to Ministries
            </Link>
         </div>
      </section>
    </div>
  )
}
