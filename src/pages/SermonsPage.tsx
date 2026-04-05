import { useDeferredValue, useMemo, useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatDate, normalizeSearchValue } from '../lib/formatters'

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

export function SermonsPage() {
  const siteContent = useSiteContent()
  useDocumentMeta(
    'Sermons',
    'Watch recent sermons, browse by speaker or series, and search teaching by topic, title, or Scripture reference.',
  )

  const [query, setQuery] = useState('')
  const [speaker, setSpeaker] = useState('All speakers')
  const deferredQuery = useDeferredValue(query)

  const speakers = useMemo(
    () => ['All speakers', ...new Set(siteContent.sermons.map((sermon) => sermon.speaker))],
    [siteContent.sermons],
  )

  const filteredSermons = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(deferredQuery)

    return siteContent.sermons.filter((sermon) => {
      const matchesSpeaker = speaker === 'All speakers' || sermon.speaker === speaker
      const matchesQuery =
        !normalizedQuery ||
        `${sermon.title} ${sermon.series} ${sermon.scripture} ${sermon.speaker}`
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesSpeaker && matchesQuery
    })
  }, [deferredQuery, siteContent.sermons, speaker])

  const featuredSermon = filteredSermons[0] ?? siteContent.sermons[0]

  return (
    <div className="flex flex-col bg-white">
      {/* Cinematic Hero */}
      <section className="relative w-full pt-48 pb-32 flex flex-col justify-center bg-stone-900 text-white isolate overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=2600&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" 
          alt="Worship scene" 
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
              Teachings
            </motion.p>
            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
              Messages that matter for everyday life
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl text-stone-300 font-medium max-w-2xl leading-relaxed">
               Search the archive, filter by speaker, and keep recent messages close at
               hand throughout the week.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured Sermon Card */}
      <section className="max-w-[1200px] mx-auto w-full px-6 -mt-16 relative z-20">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3, duration: 0.8 }}
           className="bg-white shadow-2xl shadow-stone-900/10 flex flex-col lg:flex-row overflow-hidden border border-stone-100 min-h-[500px]"
         >
            <div className="w-full lg:w-1/2 aspect-video lg:aspect-auto bg-stone-100 relative">
               {featuredSermon.embedUrl ? (
                 <iframe
                    className="absolute inset-0 w-full h-full"
                    src={featuredSermon.embedUrl}
                    title={featuredSermon.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                 />
               ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-stone-50">
                  <svg className="w-12 h-12 text-stone-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-stone-400 text-sm font-medium italic">Message ready for upload</p>
                </div>
               )}
            </div>
            <div className="w-full lg:w-1/2 p-10 md:p-14 flex flex-col justify-center items-start gap-6">
                <p className="text-primary-500 font-bold uppercase tracking-widest text-xs">Featured Message</p>
                <h2 className="font-display text-4xl font-bold text-stone-900">{featuredSermon.title}</h2>
                <div className="flex flex-col gap-2">
                   <p className="text-stone-500 font-medium flex items-center gap-2">
                      <strong className="text-stone-900">{featuredSermon.speaker}</strong> • {featuredSermon.series}
                   </p>
                   <p className="text-stone-400 text-sm italic">{formatDate(featuredSermon.date)} • {featuredSermon.scripture}</p>
                </div>
                <p className="text-stone-600 leading-relaxed text-sm md:text-base line-clamp-4 italic">
                   "{featuredSermon.summary}"
                </p>
                <div className="flex gap-4 pt-4">
                  <a href={featuredSermon.watchUrl} target="_blank" rel="noreferrer" className="px-8 py-3 bg-[#f97316] text-white font-medium text-sm hover:bg-[#ea580c] transition-colors">
                    Watch online
                  </a>
                  {featuredSermon.notesUrl && (
                    <a href={featuredSermon.notesUrl} target="_blank" rel="noreferrer" className="px-8 py-3 bg-stone-100 text-stone-900 font-medium text-sm hover:bg-stone-200 transition-colors">
                      Notes
                    </a>
                  )}
                </div>
            </div>
         </motion.div>
      </section>

      {/* Archive Header & Filters */}
      <section className="py-24 px-6 md:px-16 max-w-[1400px] mx-auto w-full">
         <div className="flex flex-col md:flex-row items-baseline justify-between gap-8 mb-12 border-b border-stone-100 pb-12">
            <div className="max-w-md">
               <p className="text-stone-400 font-bold uppercase tracking-[0.2em] text-xs mb-4">Archive</p>
               <h2 className="font-display text-4xl font-bold text-stone-900 mb-4">Past Messages</h2>
               <p className="text-stone-500 text-sm leading-relaxed italic">Explore our previous teaching series and standalone messages through the years.</p>
            </div>
            
            <div className="flex flex-col gap-4 w-full md:w-auto">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative min-w-[240px]">
                    <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </span>
                    <input
                      className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/20 text-sm rounded-sm pl-11 pr-4 py-2.5 outline-none transition-all placeholder:text-stone-400 italic"
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search title, series, or scripture"
                      value={query}
                    />
                  </div>
                  <div className="relative">
                    <select 
                      className="w-full bg-stone-50 border border-stone-200 focus:bg-white focus:border-[#f97316] focus:ring-1 focus:ring-[#f97316]/20 text-sm rounded-sm px-4 py-2.5 outline-none appearance-none cursor-pointer pr-10 italic text-stone-600"
                      onChange={(event) => setSpeaker(event.target.value)} 
                      value={speaker}
                    >
                      {speakers.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ) )}
                    </select>
                    <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-stone-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </div>
               </div>
               <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest text-right">
                  Showing {filteredSermons.length} results
               </p>
            </div>
         </div>

         {/* Sermon Archive Grid */}
         <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8"
         >
            <AnimatePresence mode="popLayout">
              {filteredSermons.map((sermon, idx) => (
                <motion.article 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={sermon.slug} 
                  className="flex flex-col group cursor-pointer w-full"
                >
                    <div className="w-full aspect-[4/3] bg-stone-100 overflow-hidden mb-6 relative">
                      <div className="absolute inset-0 bg-[#0b162c] opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10" />
                      <img 
                        src={`https://images.unsplash.com/photo-${1500000000000 + idx}?q=80&w=800&auto=format&fit=crop`} 
                        alt="Sermon Thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0" 
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1529070538774-1843cb1665e8?q=80&w=800&auto=format&fit=crop"
                        }}
                      />
                    </div>
                    <p className="text-[#f97316] text-[10px] font-bold tracking-widest uppercase mb-2">
                       {sermon.series} | {sermon.speaker}
                    </p>
                    <h3 className="font-display text-xl font-bold text-stone-900 mb-2 group-hover:text-[#f97316] transition-colors">{sermon.title}</h3>
                    <p className="text-stone-400 text-[11px] italic mb-6">Posted on {formatDate(sermon.date)} • {sermon.scripture}</p>
                    <a href={sermon.watchUrl} target="_blank" rel="noreferrer" className="text-stone-900 text-xs font-bold uppercase tracking-wider group-hover:text-[#f97316] transition-colors flex items-center gap-2">
                      Listen to the message <span className="text-[10px] group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </motion.article>
              ))}
            </AnimatePresence>
         </motion.div>

         {filteredSermons.length === 0 && (
            <div className="py-32 flex flex-col items-center text-center">
               <div className="w-16 h-16 bg-stone-50 border border-stone-100 text-stone-200 flex items-center justify-center mb-6">
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
               </div>
               <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">No messages found</h3>
               <p className="text-stone-400 italic text-sm">Try adjusting your filters or search query.</p>
               <button 
                 onClick={() => { setQuery(''); setSpeaker('All speakers'); }}
                 className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#f97316] hover:text-[#ea580c] transition-colors"
               >
                  Clear all filters
               </button>
            </div>
         )}
      </section>

      {/* Scripture CTA */}
      <section className="py-24 bg-stone-950 text-white relative isolate overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[#f97316]/5 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 text-center flex flex-col items-center">
            <p className="text-[#f97316] font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Weekly Teaching</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold max-w-3xl leading-tight mb-8">
               "For where two or three gather in my name, there am I with them."
            </h2>
            <p className="text-white/40 italic font-medium">— Matthew 18:20</p>
        </div>
      </section>
    </div>
  )
}
