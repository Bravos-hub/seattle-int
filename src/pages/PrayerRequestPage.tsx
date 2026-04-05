import { motion, type Variants } from 'framer-motion'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export function PrayerRequestPage() {
  useDocumentMeta(
    'Prayer Request',
    'Submit a prayer request and let our community stand with you in faith and support.',
  )

  return (
    <div className="flex flex-col bg-white overflow-hidden pb-12">
      {/* Cinematic Hero */}
      <section className="relative w-full pt-48 pb-32 flex flex-col justify-center bg-[#0b162c] text-white isolate overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1499209974431-9dac36449171?q=80&w=2600&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" 
          alt="Hands praying" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b162c] via-[#0b162c]/60 to-transparent pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16">
          <motion.div 
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <motion.p variants={fadeInUp} className="text-primary-500 font-bold uppercase tracking-[0.2em] text-xs mb-4">
              Prayer
            </motion.p>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
               You are not alone.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-stone-300 font-medium max-w-xl leading-relaxed italic">
               Submit a prayer request and let our community stand with you in faith and support.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Prayer Form & Message */}
      <section className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 -mt-24 relative z-20">
         <motion.article 
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.3, duration: 1 }}
           className="bg-white p-10 md:p-14 shadow-2xl shadow-stone-900/5 border border-stone-100 flex flex-col"
         >
            <div className="mb-12">
               <h2 className="font-display text-3xl font-bold text-stone-900 mb-6 uppercase tracking-tight">How can we pray?</h2>
               <p className="text-stone-500 text-sm italic leading-relaxed">
                  Our prayer team and leadership meet weekly to pray over every request submitted. Whether it's a burden or a celebration, we want to hear from you.
               </p>
            </div>

            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                     <label className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none pl-1">Your Name</label>
                     <input 
                       className="w-full bg-stone-50 border border-stone-100 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 text-sm rounded-sm px-4 py-3 outline-none transition-all placeholder:text-stone-300 italic"
                       placeholder="First & Last Name"
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none pl-1">Email Address</label>
                     <input 
                       className="w-full bg-stone-50 border border-stone-100 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 text-sm rounded-sm px-4 py-3 outline-none transition-all placeholder:text-stone-300 italic"
                       placeholder="email@example.com"
                     />
                  </div>
               </div>
               
               <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none pl-1">Your Request</label>
                  <textarea 
                    rows={6}
                    className="w-full bg-stone-50 border border-stone-100 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 text-sm rounded-sm px-4 py-3 outline-none transition-all placeholder:text-stone-300 italic"
                    placeholder="Tell us what's on your heart..."
                  />
               </div>

               <div className="flex items-center gap-4 py-4 p-4 bg-stone-50 border border-stone-100">
                  <input type="checkbox" className="w-4 h-4 text-primary-500 focus:ring-primary-500/20 border-stone-200 rounded" />
                  <span className="text-[11px] text-stone-400 font-bold uppercase tracking-widest underline decoration-stone-200 underline-offset-4">Keep this request confidential (Leaders Only)</span>
               </div>
               
               <button 
                 type="submit"
                 className="w-full py-4 bg-[#f97316] text-white font-bold text-sm tracking-widest uppercase hover:bg-[#ea580c] transition-colors shadow-2xl shadow-primary-500/10"
               >
                 Submit Prayer Request
               </button>
            </form>
         </motion.article>

         <motion.article 
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.4, duration: 1 }}
           className="bg-[#0b162c] p-10 md:p-14 shadow-2xl shadow-stone-900/10 border border-white/5 text-white flex flex-col justify-center text-center items-center h-full"
         >
            <div className="mb-12">
               <h2 className="font-display text-3xl font-bold mb-8 uppercase tracking-wide">Our Commitment</h2>
               <p className="text-white/40 text-lg leading-relaxed italic max-w-sm mb-12">
                  "Let us then approach God's throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need."
               </p>
               <cite className="block text-primary-500 not-italic font-bold text-[10px] uppercase tracking-[0.2em]">— Hebrews 4:16</cite>
            </div>
            
            <div className="w-px h-24 bg-gradient-to-b from-primary-500 to-transparent opacity-30 mb-8" />
            
            <div className="space-y-4">
              <p className="text-white font-bold text-sm uppercase tracking-widest animate-pulse">Prayer Team Meeting</p>
              <p className="text-white/20 text-xs italic">Wednesdays at 7:00 pm</p>
            </div>
         </motion.article>
      </section>

      {/* Bottom Nav */}
      <section className="py-24 bg-stone-50 overflow-hidden text-center items-center flex flex-col">
         <div className="max-w-[800px] mx-auto px-6 md:px-16 w-full flex flex-col items-center gap-8">
            <h2 className="font-display text-4xl font-bold text-stone-900 leading-tight">
               "God hears every whisper and knows every heart."
            </h2>
         </div>
      </section>
    </div>
  )
}
