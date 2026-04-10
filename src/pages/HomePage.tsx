import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'

import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatDate } from '../lib/formatters'

// Helper for animations
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

export function HomePage() {
  const siteContent = useSiteContent()
  useDocumentMeta(
    'Welcome',
    'Join our community. A place to worship, grow, and belong.'
  )


  const featuredSermons = siteContent.sermons.slice(0, 3)

  // A manual mapping over services section to replicate the design grid.
  // Using generic terms inspired by the layout picture combined with ministry data.
  const mappedServices = [
    { title: 'Weekly Services', desc: 'Join us every Saturday for powerful worship.' },
    { title: 'Youth', desc: 'A vibrant community for middle and high school students.' },
    { title: 'Kids', desc: 'Safe, fun environments for children to learn about faith.' },
    { title: 'Special Events', desc: 'Gatherings that bring our entire church family together.' },
    { title: 'Counseling', desc: 'Biblical guidance for life\'s toughest challenges.' },
    { title: 'Benevolence', desc: 'Meeting practical needs within our local community.' }
  ]

  return (
    <div className="flex flex-col bg-white overflow-hidden">

      {/* 1. Deep Cinematic Hero */}
      <section className="relative w-full min-h-screen flex flex-col justify-center bg-stone-900 text-white isolate overflow-hidden">
        {/* Animated background image */}
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2600&auto=format&fit=crop"
          alt="Worship scene"
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen"
        />
        
        {/* Layered cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-transparent to-stone-900 pointer-events-none opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/40 to-transparent pointer-events-none" />
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary-500 to-transparent" />
        </motion.div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } }
            }}
            className="max-w-4xl flex flex-col items-center gap-6 mx-auto"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <div className="w-8 h-px bg-primary-500/50" />
              <p className="text-primary-500 tracking-[0.4em] text-[10px] font-black uppercase">
                Welcome to Seattle
              </p>
              <div className="w-8 h-px bg-primary-500/50" />
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="font-display font-black text-5xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter mb-4 text-center text-white drop-shadow-2xl">
              {siteContent.site.heroTitle}
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
              {siteContent.site.welcomeMessage}
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 w-full sm:w-auto">
              <Link to="/visit" className="px-10 py-4 bg-white text-stone-900 font-bold text-xs uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all duration-500 shadow-xl shadow-black/20 text-center">
                Plan Your Visit
              </Link>
              <Link to="/about" className="px-10 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all duration-500 backdrop-blur-sm text-center">
                Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Our Services Section - Scroll Animated */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-[1400px] mx-auto w-full px-6 md:px-16 py-24 md:py-40"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32">
          <div className="lg:col-span-12 mb-16 text-center max-w-3xl mx-auto">
             <p className="text-primary-500 text-[10px] font-black tracking-[0.4em] uppercase mb-6">Our Services</p>
             <h2 className="font-display text-5xl md:text-7xl font-black text-stone-900 mb-8 leading-[1.1] tracking-tighter">
               We Love Serving Our Local Community
             </h2>
             <div className="w-20 h-1 bg-primary-500 mx-auto" />
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-y-20 gap-x-12">
            {mappedServices.map((service, idx) => (
              <motion.article 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="flex flex-col group"
              >
                <div className="w-14 h-14 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center mb-8 text-stone-400 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary-500/20">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d={
                      idx === 0 ? "M4 6h16M4 12h16m-7 6h7" :
                        idx === 1 ? "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" :
                          idx === 2 ? "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" :
                            idx === 3 ? "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" :
                              idx === 4 ? "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" :
                                "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    } />
                  </svg>
                </div>
                <h3 className="text-stone-900 font-bold text-xl mb-4 group-hover:text-primary-500 transition-colors">{service.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed italic">{service.desc}</p>
              </motion.article>
            ))}
          </div>

          <div className="lg:col-span-4 bg-stone-900 p-12 md:p-16 flex flex-col items-start relative overflow-hidden group">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-3xl rounded-full" />
            
            <p className="text-primary-500 text-[10px] font-black tracking-[0.4em] uppercase mb-6">Ministries</p>
            <h3 className="font-display text-4xl font-bold text-white mb-8 leading-tight">
              Impactful ways to get involved
            </h3>
            <p className="text-white/40 text-sm leading-relaxed mb-12 italic">
              From local outreach to global missions, we believe every hand makes a difference in building a compassionate community.
            </p>
            <Link className="inline-block px-10 py-4 bg-white text-stone-900 font-bold text-xs uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all duration-500" to="/ministries">
              All Ministries
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 4. Current Series Section - Cinematic Card Grid */}
      <section className="bg-stone-50 py-32 md:py-48 isolate overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 text-center max-w-2xl"
          >
            <p className="text-primary-500 text-[10px] font-black tracking-[0.4em] uppercase mb-6">Current Series</p>
            <h2 className="font-display text-5xl md:text-7xl font-black text-stone-900 mb-8 tracking-tighter">Hope for Tomorrow</h2>
            <p className="text-stone-400 text-lg italic leading-relaxed">
              Discover how ancient truths bring living hope to our modern world. Join us for our latest message series.
            </p>
          </motion.div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredSermons.map((sermon, idx) => (
              <motion.article 
                key={sermon.slug} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                className="flex flex-col group cursor-pointer"
              >
                <div className="w-full aspect-[16/10] bg-stone-900 overflow-hidden mb-10 relative shadow-2xl group-hover:shadow-primary-500/20 transition-all duration-500">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1 }}
                    src={
                      idx === 0 ? "https://images.unsplash.com/photo-1529070538774-1843cb1665e8?q=80&w=800&auto=format&fit=crop" :
                        idx === 1 ? "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=800&auto=format&fit=crop" :
                          "https://images.unsplash.com/photo-1533227268428-f9ed0900f953?q=80&w=800&auto=format&fit=crop"
                    }
                    alt="Sermon Thumbnail"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest italic">{sermon.series}</span>
                  </div>
                </div>
                
                <h3 className="font-display text-2xl font-bold text-stone-900 mb-2 group-hover:text-primary-500 transition-colors uppercase tracking-tight">{sermon.title}</h3>
                <p className="text-stone-400 text-xs italic mb-8 font-medium">Recorded on {formatDate(sermon.date)} • {sermon.speaker}</p>
                
                <Link to={`/sermons`} className="w-fit text-stone-900 text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 border-b-2 border-stone-100 pb-2 group-hover:border-primary-500 group-hover:text-primary-500">
                  Watch Message <span>→</span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
