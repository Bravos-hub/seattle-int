import { motion, type Variants } from 'framer-motion'
import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export function GivePage() {
  const siteContent = useSiteContent()
  useDocumentMeta(
    'Give',
    'Invest in the mission. Support the work of Seattle International Church through secure online giving.',
  )

  return (
    <div className="flex flex-col bg-white">
      {/* Cinematic Hero */}
      <section className="relative w-full pt-48 pb-32 flex flex-col justify-center bg-[#0b162c] text-white isolate overflow-hidden text-center items-center">
        <img 
          src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2600&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" 
          alt="Hands giving" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b162c] via-[#0b162c]/60 to-transparent pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16">
          <motion.div 
            initial="hidden"
            animate="show"
            className="max-w-3xl border-b border-white/5 pb-12 mb-12 mx-auto"
          >
            <motion.p variants={fadeInUp} className="text-primary-500 font-bold uppercase tracking-[0.2em] text-xs mb-4">
              Invest in the Mission
            </motion.p>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
               Generosity changes lives.
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Give Content */}
      <section className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 -mt-24 relative z-20">
         <motion.article 
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.3, duration: 1 }}
           className="bg-white p-10 md:p-14 shadow-2xl shadow-stone-900/5 border border-stone-100 h-full"
         >
            <h2 className="font-display text-3xl font-bold text-stone-900 mb-8 uppercase tracking-tight">The Heart of Seattle International</h2>
            <div className="space-y-6 text-stone-600 leading-[1.8] italic">
               <p>
                  "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
               </p>
               <cite className="block text-stone-400 not-italic font-bold text-xs uppercase tracking-widest">— 2 Corinthians 9:7</cite>
            </div>
            <p className="mt-8 text-stone-500 text-sm leading-relaxed">
               Your financial support directly fuels the ministries, outreaches, and daily operations that make Seattle International a spiritual home for so many. Thank you for partnering with us.
            </p>
         </motion.article>

         <motion.article 
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.4, duration: 1 }}
           className="bg-[#0b162c] p-10 md:p-14 shadow-2xl shadow-stone-900/10 border border-white/5 flex flex-col items-center text-center text-white"
         >
            <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-primary-500/20">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="font-display text-3xl font-bold mb-4">Secure Online Giving</h2>
            <p className="text-white/60 text-sm mb-8 max-w-sm">We use a secure giving portal to ensure your information is safe and your donation reaches the mission instantly.</p>
            
            <a 
              href={siteContent.site.givingPortalUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="w-full max-w-sm py-4 bg-[#f97316] text-white font-bold text-sm tracking-widest uppercase hover:bg-[#ea580c] transition-colors shadow-2xl shadow-primary-500/10"
            >
              Access Giving Portal
            </a>

            <div className="mt-12 pt-8 border-t border-white/5 w-full flex flex-col gap-4 text-[10px] uppercase font-bold tracking-widest text-white/40">
               <span>Other ways to give</span>
               <div className="flex flex-wrap justify-center gap-6">
                  <span>Check by mail</span>
                  <span>In-Person Box</span>
                  <span>Text to Give</span>
               </div>
            </div>
         </motion.article>
      </section>

      {/* Trust Blocks */}
      <section className="py-32 px-6 md:px-16 max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12">
        {['Financial Integrity', 'Mission Focused', 'Impact Driven'].map((item, idx) => (
          <div key={item} className="flex flex-col items-center text-center">
             <div className="text-primary-500 font-display font-medium text-4xl mb-4 opacity-20 italic">0{idx + 1}</div>
             <h3 className="font-display text-xl font-bold text-stone-900 mb-2 uppercase tracking-wide">{item}</h3>
             <p className="text-stone-400 text-xs italic leading-relaxed max-w-xs mx-auto">
                Seattle International is committed to transparency and wise stewardship of all resources trusted to us.
             </p>
          </div>
        ))}
      </section>
    </div>
  )
}
