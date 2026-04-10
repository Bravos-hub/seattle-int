import { motion } from 'framer-motion'
import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

export function AboutPage() {
  const siteContent = useSiteContent()
  useDocumentMeta(
    'About',
    'Meet Seattle International Church through our mission, vision, values, statement of faith, story, and leadership team.',
  )

  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* 1. Cinematic Hero - Parity with Homepage */}
      <section className="relative w-full min-h-[80vh] flex flex-col justify-center bg-stone-900 text-white isolate overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?q=80&w=2600&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" 
          alt="Church interior" 
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
            <motion.div variants={fadeInUp as any} className="flex items-center gap-4 mb-6">
              <div className="w-12 h-0.5 bg-primary-500" />
              <p className="text-primary-500 font-black uppercase tracking-[0.4em] text-[10px]">
                Our Story & Vision
              </p>
            </motion.div>
            <motion.h1 variants={fadeInUp as any} className="font-display text-4xl md:text-8xl font-black leading-[1] tracking-tighter mb-8 text-white">
               Who we are and what shapes our church family
            </motion.h1>
            <motion.p variants={fadeInUp as any} className="text-lg md:text-2xl text-white/60 font-medium max-w-2xl leading-relaxed italic border-l-2 border-white/10 pl-6 md:pl-8">
              "We want this church to feel spiritually grounded, practically welcoming,
              and transparent about what we believe."
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 px-6 md:px-16 max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:-mt-16 relative z-20">
        <motion.article 
          whileHover={{ y: -5 }}
          className="bg-white p-10 md:p-14 shadow-2xl shadow-stone-900/5 border border-stone-100 flex flex-col"
        >
          <p className="text-primary-500 font-bold uppercase tracking-widest text-xs mb-4">Mission</p>
          <h2 className="font-display text-3xl font-bold text-stone-900 mb-6">What we are committed to</h2>
          <p className="text-stone-600 leading-relaxed text-lg italic border-l-4 border-primary-500 pl-6">
            "{siteContent.about.mission}"
          </p>
        </motion.article>

        <motion.article 
          whileHover={{ y: -5 }}
          className="bg-white p-8 md:p-14 shadow-2xl shadow-stone-900/5 border border-stone-100 flex flex-col"
        >
          <p className="text-primary-500 font-bold uppercase tracking-widest text-xs mb-4">Vision</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-6">Where we are headed</h2>
          <p className="text-stone-600 leading-relaxed text-base md:text-lg">
            {siteContent.about.vision}
          </p>
        </motion.article>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-stone-50 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full flex flex-col">
          <div className="mb-12 md:mb-16">
            <p className="text-stone-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">Core Values</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900">Practices that shape our culture</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteContent.about.values.map((value, idx) => (
              <motion.article 
                key={value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 border border-stone-100 shadow-sm flex items-start gap-4"
              >
                <div className="shrink-0 w-8 h-8 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <p className="text-stone-800 font-medium leading-relaxed">{value}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Statement of Faith */}
        <article>
          <div className="mb-12">
            <p className="text-stone-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">Statement of faith</p>
            <h2 className="font-display text-3xl font-bold text-stone-900">What we believe</h2>
          </div>
          <ul className="flex flex-col gap-6">
            {siteContent.about.statementOfFaith.map((item, idx) => (
              <li key={item} className="flex gap-4 group">
                <span className="text-primary-500 font-display font-bold text-xl opacity-20 group-hover:opacity-100 transition-opacity translate-y-[-2px]">0{idx + 1}</span>
                <p className="text-stone-600 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </article>

        {/* Our Story */}
        <article>
          <div className="mb-12">
            <p className="text-stone-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">Our story</p>
            <h2 className="font-display text-3xl font-bold text-stone-900">How the church has grown</h2>
          </div>
          <div className="flex flex-col gap-8 relative pl-10 md:pl-12 border-l border-stone-200 ml-4">
            {siteContent.about.history.map((item) => (
              <div key={item} className="relative">
                <div className="absolute left-[-49px] md:left-[-53px] top-1 w-4 h-4 rounded-full bg-white border-2 border-primary-500 z-10" />
                <p className="text-stone-600 leading-relaxed text-base">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* 5. Leadership - Glass Grid */}
      <section className="py-32 md:py-48 bg-stone-900 text-white isolate overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 pointer-events-none" />
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full flex flex-col items-center relative z-10">
          <div className="mb-24 text-center">
            <p className="text-primary-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6">Leadership</p>
            <h2 className="font-display text-5xl md:text-7xl font-black tracking-tighter">Meet the team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {siteContent.leaders.map((leader, idx) => (
              <motion.article 
                key={leader.email}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="glass-card p-8 md:p-12 hover:border-primary-500/30 transition-all duration-700 group flex flex-col"
              >
                <div className="w-20 h-20 bg-white/5 text-white font-display font-black text-2xl flex items-center justify-center mb-8 group-hover:bg-primary-500 group-hover:scale-110 transition-all duration-500 shadow-2xl rounded-2xl">
                  {leader.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-primary-500 font-black uppercase tracking-[0.3em] text-[10px] mb-3">{leader.role}</p>
                  <h3 className="font-display text-3xl font-bold mb-6 group-hover:text-primary-500 transition-colors tracking-tight">{leader.name}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-10 italic line-clamp-3">"{leader.bio}"</p>
                </div>
                
                <div className="flex flex-col gap-3 pt-8 border-t border-white/5 mt-auto">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{leader.focus}</span>
                  <a href={`mailto:${leader.email}`} className="text-sm font-bold text-white/60 hover:text-primary-500 transition-colors break-all">{leader.email}</a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
