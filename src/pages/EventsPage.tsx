import { useDeferredValue, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatDateTimeRange, normalizeSearchValue } from '../lib/formatters'
import type { EventCategory } from '../types'

const eventCategories: EventCategory[] = [
  'All',
  'Youth',
  'Women',
  'Men',
  'Kids',
  'Conference',
  'Outreach',
]



export function EventsPage() {
  const siteContent = useSiteContent()
  useDocumentMeta(
    'Events',
    'Browse upcoming church events by category, view event details, and find the right next step for registration or contact.',
  )

  const [category, setCategory] = useState<EventCategory>('All')
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)

  const filteredEvents = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(deferredQuery)

    return siteContent.events.filter((event) => {
      const matchesCategory = category === 'All' || event.category === category
      const matchesQuery =
        !normalizedQuery ||
        `${event.title} ${event.summary} ${event.location} ${event.category}`
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [category, deferredQuery, siteContent.events])

  const spotlightEvent = filteredEvents[0] ?? siteContent.events[0]

  return (
    <div className="flex flex-col gap-12 sm:gap-20 pb-20">
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-primary-50 rounded-[3rem] p-10 md:p-20 relative overflow-hidden flex flex-col items-center text-center mt-2 border border-primary-100"
      >
        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-primary-200/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-stone-300/30 rounded-full blur-[80px]" />
        
        <p className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-4 relative z-10">Events</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-stone-900 leading-tight mb-6 max-w-3xl relative z-10">
          Stay close to the current life of the church
        </h1>
        <p className="text-xl text-stone-600 max-w-2xl font-medium relative z-10">
          Upcoming gatherings, ministry moments, and outreach rhythms should always
          be easy to find and easy to act on.
        </p>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Spotlight */}
        <motion.section 
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="lg:col-span-8 flex flex-col"
        >
          <article className="bg-stone-900 text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col h-full relative overflow-hidden group border border-stone-800">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=1200&auto=format&fit=crop" alt="gathering" className="w-full h-full object-cover opacity-[0.15] mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/80 to-transparent" />
            </div>
            
            <div className="relative z-10 flex-1 flex flex-col">
              <p className="text-primary-400 font-bold uppercase tracking-widest text-sm mb-4">Upcoming Spotlight</p>
              <h2 className="font-display text-4xl font-bold mb-4">{spotlightEvent.title}</h2>
              <p className="text-stone-300 text-lg mb-8 leading-relaxed max-w-2xl">{spotlightEvent.summary}</p>
              
              <div className="flex flex-wrap gap-4 text-sm font-medium mb-10 text-stone-400 mt-auto">
                <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                   <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   {formatDateTimeRange(spotlightEvent.start, spotlightEvent.end)}
                </span>
                <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                  <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {spotlightEvent.location}
                </span>
                <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md text-white">
                  {spotlightEvent.category}
                </span>
              </div>
              
              <Link className="self-start px-8 py-4 rounded-full bg-white text-stone-900 font-bold hover:bg-stone-100 transition-colors" to={`/events/${spotlightEvent.slug}`}>
                View event details
              </Link>
            </div>
          </article>
        </motion.section>

        {/* Filter */}
        <motion.section 
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.3, duration: 0.8 }}
           className="lg:col-span-4 flex flex-col"
        >
          <article className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-stone-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col">
            <p className="text-stone-400 font-bold uppercase tracking-widest text-sm mb-2">Filter events</p>
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-8">Search by type or title</h2>

            <div className="flex flex-col gap-6 flex-1">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-stone-700">Search keyword</span>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </span>
                  <input
                    className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-stone-300 focus:ring-2 focus:ring-stone-200 text-stone-800 rounded-xl pl-11 pr-4 py-3 outline-none transition-all placeholder:text-stone-400"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="E.g. breakfast, youth..."
                    value={query}
                  />
                </div>
              </label>

              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold text-stone-700">Category</span>
                <div className="flex flex-wrap gap-2">
                  {eventCategories.map((item) => (
                    <button
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        category === item 
                          ? 'bg-stone-900 text-white shadow-md' 
                          : 'bg-stone-50 text-stone-600 border border-stone-200 hover:bg-stone-100'
                      }`}
                      key={item}
                      onClick={() => setCategory(item)}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </motion.section>
      </div>

      <motion.section 
        initial="hidden"
        animate="show"
        className="w-full"
      >
        <div className="flex items-center justify-between mb-8 border-b border-stone-200 pb-4">
           <h3 className="font-display text-2xl font-bold text-stone-900">All Events</h3>
           <p className="text-sm font-medium text-stone-500">{filteredEvents.length} result{filteredEvents.length !== 1 ? 's' : ''}</p>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => (
                <motion.article 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl p-8 border border-stone-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all flex flex-col group" 
                  key={event.slug}
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-500 mb-3">{event.category}</p>
                  <h3 className="font-display text-xl font-bold text-stone-900 mb-3 group-hover:text-primary-600 transition-colors">{event.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">{event.summary}</p>
                  
                  <div className="flex flex-col gap-2 text-xs font-medium text-stone-500 bg-stone-50 rounded-2xl p-4 border border-stone-100 mb-6">
                    <span className="flex items-center gap-2">
                       <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                       {formatDateTimeRange(event.start, event.end)}
                    </span>
                    <span className="flex items-center gap-2">
                       <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                       {event.location}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link className="flex-1 text-center py-3 rounded-full bg-stone-900 text-white text-sm font-bold hover:bg-stone-800 transition-colors" to={`/events/${event.slug}`}>
                      Details
                    </Link>
                    <a
                      className="flex-1 text-center py-3 rounded-full bg-white border border-stone-200 text-stone-700 text-sm font-bold hover:bg-stone-50 transition-colors"
                      href={event.actionUrl}
                      rel="noreferrer"
                      target={event.actionUrl.startsWith('/') ? undefined : '_blank'}
                    >
                      {event.actionLabel}
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.article 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="bg-stone-50 border border-stone-200 border-dashed rounded-3xl p-12 text-center flex flex-col items-center max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-stone-100 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">No events match that filter right now</h3>
            <p className="text-stone-500">Try another category or search phrase to see more upcoming gatherings.</p>
            <button onClick={() => { setQuery(''); setCategory('All'); }} className="mt-6 font-bold text-stone-900 underline underline-offset-4 hover:text-primary-600 transition-colors">Clear all filters</button>
          </motion.article>
        )}
      </motion.section>
    </div>
  )
}
