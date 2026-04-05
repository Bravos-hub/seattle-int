import { useDeferredValue, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatShortDate, normalizeSearchValue } from '../lib/formatters'
import type { EventCategory } from '../types'

const eventCategories: EventCategory[] = [
  'All',
  'Conference',
  'Kids',
  'Men',
  'Women',
  'Youth',
  'Outreach',
]

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

export function EventsPage() {
  const siteContent = useSiteContent()
  useDocumentMeta(
    'Events',
    'Explore upcoming gatherings, conferences, and community events at Seattle International Church.',
  )

  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<EventCategory>('All')
  const deferredQuery = useDeferredValue(query)

  const filteredEvents = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(deferredQuery)

    return siteContent.events.filter((event) => {
      const matchesCategory = activeCategory === 'All' || event.category === activeCategory
      const matchesQuery =
        !normalizedQuery ||
        `${event.title} ${event.summary} ${event.location}`.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [activeCategory, deferredQuery, siteContent.events])

  const nextEvent = filteredEvents[0] || siteContent.events[0]

  return (
    <div className="flex flex-col bg-white">
      {/* Cinematic Hero */}
      <section className="relative w-full pt-48 pb-32 flex flex-col justify-center bg-stone-900 text-white isolate overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2600&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" 
          alt="People gathering" 
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
              Gatherings
            </motion.p>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
               Life happens in community.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-stone-300 font-medium max-w-2xl leading-relaxed">
               Explore upcoming gatherings, conferences, and community events designed to help us grow together.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Spotlight Event Spotlight */}
      <section className="max-w-[1400px] mx-auto w-full px-6 -mt-16 relative z-20">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3, duration: 0.8 }}
           className="bg-white shadow-2xl shadow-stone-900/10 flex flex-col lg:flex-row overflow-hidden border border-stone-100 min-h-[450px]"
         >
            <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto bg-stone-100 relative">
               <img src={`https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop`} className="absolute inset-0 w-full h-full object-cover grayscale-[20%]" alt="Event" />
               <div className="absolute top-8 left-8 flex flex-col items-center justify-center bg-white p-4 shadow-xl border border-stone-100 border-t-4 border-t-primary-500">
                  <span className="font-display font-extrabold text-2xl text-stone-900 leading-none">{new Date(nextEvent.start).getDate()}</span>
                  <span className="font-bold text-[10px] text-stone-400 uppercase tracking-widest leading-none mt-1">{new Date(nextEvent.start).toLocaleString('default', { month: 'short' })}</span>
               </div>
            </div>
            <div className="w-full lg:w-1/2 p-10 md:p-14 flex flex-col justify-center items-start gap-6">
                <p className="text-primary-500 font-bold uppercase tracking-widest text-xs">Featured Event</p>
                <h2 className="font-display text-4xl font-bold text-stone-900">{nextEvent.title}</h2>
                <div className="flex flex-col gap-2">
                   <p className="text-stone-500 font-medium flex items-center gap-4">
                      <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {new Date(nextEvent.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> {nextEvent.location}</span>
                   </p>
                </div>
                <p className="text-stone-600 leading-relaxed text-sm md:text-base italic">
                   "{nextEvent.summary}"
                </p>
                <div className="pt-4">
                  <Link to={`/events/${nextEvent.slug}`} className="px-8 py-3 bg-[#f97316] text-white font-medium text-sm hover:bg-[#ea580c] transition-colors shadow-lg shadow-primary-500/10">
                    Learn more and RSVP →
                  </Link>
                </div>
            </div>
         </motion.div>
      </section>

      {/* Event Filters & Grid */}
      <section className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto w-full">
         <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 border-b border-stone-100 pb-12">
            <div>
               <p className="text-stone-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">Calendar</p>
               <h2 className="font-display text-4xl font-bold text-stone-900">Upcoming gatherings</h2>
            </div>
            
            <div className="flex flex-col gap-6 w-full md:w-auto items-center md:items-end">
               <div className="flex flex-wrap gap-2 justify-center">
                  {eventCategories.map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-all rounded-sm border ${activeCategory === cat ? 'bg-stone-900 text-white border-stone-900' : 'bg-transparent text-stone-400 border-stone-200 hover:border-stone-400'}`}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
               
               <div className="relative w-full max-w-xs">
                  <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </span>
                  <input
                    className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 text-sm rounded-sm pl-11 pr-4 py-2.5 outline-none transition-all placeholder:text-stone-400 italic"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search event name..."
                    value={query}
                  />
               </div>
            </div>
         </div>

         {/* Events Grid */}
         <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8"
         >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => (
                <motion.article 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={event.slug} 
                  className="flex flex-col group cursor-pointer w-full bg-white border border-stone-100 hover:border-stone-200 shadow-sm hover:shadow-xl hover:shadow-stone-900/5 hover:-translate-y-1 p-6 transition-all"
                >
                    <div className="flex justify-between items-start mb-6">
                       <p className="text-primary-500 text-[10px] font-bold tracking-widest uppercase py-1 px-2 bg-primary-50">
                          {event.category}
                       </p>
                       <div className="text-right">
                          <p className="font-display font-bold text-stone-900 text-lg leading-none">{formatShortDate(event.start)}</p>
                          <p className="text-stone-400 text-[10px] uppercase font-bold mt-1 tracking-wider">{new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                       </div>
                    </div>
                    
                    <h3 className="font-display text-xl font-bold text-stone-900 mb-4 group-hover:text-primary-500 transition-colors">{event.title}</h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-3 italic">"{event.summary}"</p>
                    
                    <div className="mt-auto flex flex-col gap-3">
                       <div className="flex items-center gap-2 text-stone-400 text-xs font-medium">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          <span>{event.location}</span>
                       </div>
                       <Link to={`/events/${event.slug}`} className="text-stone-900 text-xs font-bold uppercase tracking-widest group-hover:text-primary-500 transition-colors flex items-center gap-1.5 pt-4 border-t border-stone-50">
                          View details <span>→</span>
                       </Link>
                    </div>
                </motion.article>
              ))}
            </AnimatePresence>
         </motion.div>

         {filteredEvents.length === 0 && (
            <div className="py-32 flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-stone-50 border border-stone-100 text-stone-200 flex items-center justify-center mb-6">
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
               </div>
               <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">No events found</h3>
               <p className="text-stone-400 italic text-sm">There are currently no events matching your criteria.</p>
            </div>
         )}
      </section>

      {/* Community CTA */}
      <section className="py-24 bg-[#0b162c] text-white relative isolate overflow-hidden">
        <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-primary-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 text-center flex flex-col items-center">
            <p className="text-primary-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Get Connected</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold max-w-2xl leading-tight mb-8">
               Looking for a place to belong? Join a ministry that fits your season of life.
            </h2>
            <Link to="/ministries" className="px-10 py-4 bg-[#f97316] text-white font-bold text-sm tracking-widest hover:bg-[#ea580c] transition-colors shadow-2xl shadow-primary-500/20 uppercase">
               Explore Ministries
            </Link>
        </div>
      </section>
    </div>
  )
}
