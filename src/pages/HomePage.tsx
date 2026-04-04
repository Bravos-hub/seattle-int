import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'

import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatShortDate } from '../lib/formatters'

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
}

export function HomePage() {
  const siteContent = useSiteContent()
  useDocumentMeta(
    'Welcome Home',
    'Find service times, upcoming events, latest sermons, ministries, prayer support, and next steps for visiting Seattle International Church.',
  )

  const featuredSermon = siteContent.sermons[0]
  const upcomingEvents = siteContent.events.slice(0, 3)
  const featuredMinistries = siteContent.ministries.slice(0, 4)

  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section */}
      <section className="relative rounded-[2.5rem] overflow-hidden mt-2 bg-stone-900 text-white shadow-2xl min-h-[80vh] flex items-center isolate">
        <img 
          src="https://images.unsplash.com/photo-1548625361-ec859e92ebcc?q=80&w=2600&auto=format&fit=crop" 
          alt="Inspiring gathering"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent pointer-events-none" />
        
        <div className="relative z-10 w-full flex flex-col lg:flex-row items-end justify-between p-8 md:p-16 gap-12">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-3xl flex flex-col gap-6"
          >
            <motion.p variants={fadeUp} className="text-primary-500 font-bold tracking-widest uppercase text-sm">
              {siteContent.site.name}
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
              {siteContent.site.heroTitle}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-stone-300 font-medium max-w-2xl">
              {siteContent.site.tagline}
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-6">
              <Link className="px-8 py-4 rounded-full bg-white text-stone-900 font-bold hover:bg-stone-100 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]" to="/plan-your-visit">
                Plan Your Visit
              </Link>
              <a
                className="px-8 py-4 rounded-full bg-stone-800 border border-stone-600 text-white font-medium hover:bg-stone-700 transition-all font-sans"
                href={siteContent.site.watchOnlineUrl}
                rel="noreferrer"
                target="_blank"
              >
                Watch Sermons
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-full lg:w-96 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 flex flex-col gap-4"
          >
            <p className="text-sm font-bold text-stone-300 uppercase tracking-widest border-b border-white/10 pb-4">
              Gather With Us
            </p>
             {siteContent.site.serviceTimes.map((time) => (
              <div className="flex justify-between items-center" key={time.label}>
                <span className="text-stone-300 font-medium">{time.label}</span>
                <strong className="text-white font-display text-xl">{time.time}</strong>
                {time.note ? <span className="text-xs text-primary-400 absolute right-6 -mt-8">{time.note}</span> : null}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Signals & New Here */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <div className="lg:col-span-5 flex flex-col justify-center gap-6 pr-0 lg:pr-12">
          <motion.p variants={fadeUp} className="text-primary-500 font-bold uppercase tracking-widest text-sm">New Here</motion.p>
          <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-stone-900 leading-tight">
            A calm first visit starts with clarity
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-stone-600 leading-relaxed">
            Everything here is designed to reduce uncertainty and help first-time
            guests feel expected before they ever walk through the doors.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link className="inline-flex items-center gap-2 font-bold text-stone-900 border-b-2 border-primary-500 pb-1 hover:text-primary-600 transition-colors mt-4" to="/plan-your-visit">
              Explore the visit guide <span>→</span>
            </Link>
          </motion.div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          {siteContent.visitHighlights.map((highlight, idx) => (
            <motion.article 
              variants={fadeUp}
              className={`bg-white rounded-[2rem] p-8 border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-shadow ${idx === 1 || idx === 2 ? 'md:-translate-y-8' : ''}`} 
              key={highlight.title}
            >
              <div className="w-12 h-12 rounded-full bg-primary-500/10 text-primary-600 flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3">{highlight.title}</h3>
              <p className="text-stone-600 leading-relaxed">{highlight.description}</p>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* Spotlight: Sermon & Events */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <motion.article variants={fadeUp} className="bg-stone-900 rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col relative overflow-hidden isolate">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>
          
          <p className="text-primary-400 font-bold uppercase tracking-widest text-sm mb-4">Latest Sermon</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{featuredSermon.title}</h2>
          <p className="text-stone-400 mb-8 text-lg font-medium">
            {featuredSermon.series} • {featuredSermon.speaker} • {formatShortDate(featuredSermon.date)}
          </p>

          <div className="flex-1 w-full rounded-3xl overflow-hidden bg-stone-800/50 border border-white/10 mb-8 relative group cursor-pointer aspect-video md:aspect-auto">
            {featuredSermon.embedUrl ? (
              <iframe
                className="w-full h-full min-h-[300px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                src={featuredSermon.embedUrl}
                title={featuredSermon.title}
              />
            ) : (
                 <>
                  <img src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700" alt="Sermon placeholder" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:bg-primary-500 group-hover:border-primary-400 transition-colors">
                      <svg className="w-8 h-8 text-white ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                 </>
            )}
          </div>

          <p className="text-stone-300 leading-relaxed mb-8">{featuredSermon.summary}</p>
          <div className="flex flex-wrap gap-4 mt-auto">
            <a className="px-6 py-3 rounded-full bg-white text-stone-900 font-bold hover:bg-stone-100 transition-colors" href={featuredSermon.watchUrl} rel="noreferrer" target="_blank">
              Watch full message
            </a>
            <Link className="px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors border border-white/10" to="/sermons">
              Browse library
            </Link>
          </div>
        </motion.article>

        <motion.article variants={fadeUp} className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-stone-100 shadow-xl shadow-stone-200/20 flex flex-col">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-primary-500 font-bold uppercase tracking-widest text-sm mb-2">Current Rhythm</p>
              <h2 className="font-display text-4xl font-bold text-stone-900">Upcoming Events</h2>
            </div>
            <Link className="hidden md:inline-flex items-center gap-1 font-bold text-stone-900 hover:text-primary-600 transition-colors" to="/events">
              All events <span>→</span>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {upcomingEvents.map((event) => (
              <Link 
                className="group p-6 rounded-2xl bg-stone-50 border border-stone-100 hover:bg-white hover:shadow-xl hover:shadow-stone-200/50 hover:border-stone-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-6" 
                key={event.slug} 
                to={`/events/${event.slug}`}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-primary-100 text-primary-700 flex flex-col items-center justify-center font-display leading-tight shadow-inner">
                    <span className="text-xs font-bold uppercase">{new Date(event.start).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-2xl font-bold">{new Date(event.start).getDate()}</span>
                  </div>
                  <div>
                    <strong className="block text-xl font-display font-bold text-stone-900 mb-1 group-hover:text-primary-600 transition-colors">{event.title}</strong>
                    <p className="text-sm text-stone-500 line-clamp-1 mb-2">{event.summary}</p>
                    <div className="flex items-center gap-3 text-xs font-medium text-stone-400">
                      <span className="bg-white px-2 py-1 rounded-md border border-stone-200">{event.category}</span>
                      <span>{new Date(event.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 group-hover:text-white transition-colors shrink-0 hidden sm:flex">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </div>
              </Link>
            ))}
          </div>
          
          <Link className="md:hidden mt-8 text-center py-3 rounded-xl bg-stone-100 font-bold text-stone-900" to="/events">
            View all events
          </Link>
        </motion.article>
      </motion.section>

      {/* Ministries */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <motion.p variants={fadeUp} className="text-primary-500 font-bold uppercase tracking-widest text-sm mb-2">Church Life</motion.p>
            <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold text-stone-900 leading-tight">Find a ministry where you can belong and serve</motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link className="px-6 py-3 rounded-full border border-stone-300 font-bold text-stone-900 hover:bg-stone-900 hover:text-white transition-colors" to="/ministries">
              View all ministries
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMinistries.map((ministry) => (
            <motion.article 
              variants={fadeUp}
              className="group bg-white rounded-3xl p-8 border border-stone-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col" 
              key={ministry.slug}
            >
              <div className="mb-8 w-14 h-14 rounded-2xl bg-stone-50 border border-stone-100 group-hover:bg-primary-50 border group-hover:border-primary-100 flex items-center justify-center transition-colors">
                 <svg className="w-6 h-6 text-stone-400 group-hover:text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary-500 mb-2">{ministry.audience}</p>
              <h3 className="font-display text-2xl font-bold text-stone-900 mb-3">{ministry.name}</h3>
              <p className="text-stone-600 mb-8 leading-relaxed text-sm flex-1">{ministry.summary}</p>
              <Link className="inline-flex items-center gap-1 font-bold text-stone-500 group-hover:text-primary-600 transition-colors mt-auto" to={`/ministries/${ministry.slug}`}>
                Learn more <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* CTA Band */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <motion.article 
          variants={fadeUp}
          className="bg-primary-50 rounded-[2.5rem] p-10 md:p-14 border border-primary-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-300/20 rounded-full blur-[60px] pointer-events-none -mr-10 -mt-10"></div>
          <p className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-3">Need prayer?</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mb-4">Share your request privately</h2>
          <p className="text-stone-700 leading-relaxed mb-8 max-w-sm">
            Our prayer team handles requests with care, confidentiality, and clear
            follow-up when you want it.
          </p>
          <Link className="inline-flex px-8 py-4 rounded-full bg-stone-900 text-white font-bold hover:bg-stone-800 transition-colors" to="/prayer-request">
            Submit a prayer request
          </Link>
        </motion.article>

        <motion.article 
          variants={fadeUp}
          className="bg-stone-900 text-white rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[60px] pointer-events-none -ml-10 -mb-10"></div>
          <p className="text-primary-400 font-bold uppercase tracking-widest text-sm mb-3">Support the ministry</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Give with clarity and confidence</h2>
          <p className="text-stone-300 leading-relaxed mb-8 max-w-sm">
            Learn how giving supports worship, discipleship, community care, and
            outreach across the church family.
          </p>
          <Link className="inline-flex px-8 py-4 rounded-full bg-white text-stone-900 font-bold hover:bg-stone-100 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.15)]" to="/give">
            Explore giving options
          </Link>
        </motion.article>
      </motion.section>
    </div>
  )
}
