import { useDeferredValue, useMemo, useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatDate, normalizeSearchValue } from '../lib/formatters'

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
    <div className="flex flex-col gap-12 sm:gap-20 pb-20">
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full bg-stone-900 text-white rounded-[3rem] p-10 md:p-20 relative overflow-hidden flex flex-col items-center text-center mt-2 shadow-xl shadow-stone-900/10"
      >
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-primary-500/20 rounded-full blur-[100px]" />
        
        <p className="text-primary-400 font-bold uppercase tracking-widest text-sm mb-4 relative z-10">Sermons</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl relative z-10">
          Teaching that stays accessible and easy to revisit
        </h1>
        <p className="text-xl text-stone-300 max-w-2xl font-medium relative z-10">
          Search the archive, filter by speaker, and keep recent messages close at
          hand throughout the week.
        </p>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Featured Message */}
        <motion.section 
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2, duration: 0.8 }}
           className="lg:col-span-8 flex flex-col"
        >
          <article className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-stone-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-full">
            <p className="text-primary-500 font-bold uppercase tracking-widest text-sm mb-4">Featured Message</p>
            <h2 className="font-display text-4xl mb-2 font-bold text-stone-900">{featuredSermon.title}</h2>
            <p className="text-stone-500 font-medium mb-8 flex items-center gap-2 flex-wrap">
              <strong className="text-stone-800">{featuredSermon.speaker}</strong> • {featuredSermon.series} • {formatDate(featuredSermon.date)}
            </p>

            <div className="flex-1 w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 mb-8 relative aspect-video md:aspect-auto min-h-[300px]">
              {featuredSermon.embedUrl ? (
                <iframe
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  src={featuredSermon.embedUrl}
                  title={featuredSermon.title}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <strong className="text-stone-800 font-medium">Embed ready for upload</strong>
                  <p className="text-sm text-stone-500">Add a sermon embed URL in the content layer to show the player here.</p>
                </div>
              )}
            </div>

            <p className="text-stone-600 leading-relaxed mb-8 text-lg">{featuredSermon.summary}</p>
            <div className="flex flex-wrap gap-4 mt-auto">
              <a className="px-8 py-4 rounded-full bg-stone-900 text-white font-bold hover:bg-stone-800 transition-colors" href={featuredSermon.watchUrl} rel="noreferrer" target="_blank">
                Watch online
              </a>
              {featuredSermon.notesUrl ? (
                <a className="px-8 py-4 rounded-full bg-stone-100 text-stone-900 border border-stone-200 font-bold hover:bg-stone-200 transition-colors" href={featuredSermon.notesUrl} rel="noreferrer" target="_blank">
                  Scripture notes
                </a>
              ) : null}
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
          <article className="bg-primary-50 rounded-[2.5rem] p-8 md:p-10 border border-primary-100 flex flex-col h-full">
            <p className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-2">Filter archive</p>
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-8">Find a message quickly</h2>

            <div className="flex flex-col gap-6 flex-1">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-stone-700">Search title, series, or scripture</span>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-stone-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </span>
                  <input
                    className="w-full bg-white border border-stone-200 focus:bg-white focus:border-stone-300 focus:ring-2 focus:ring-stone-200 text-stone-800 rounded-xl pl-11 pr-4 py-3 outline-none transition-all placeholder:text-stone-400"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Example: hope, Matthew..."
                    value={query}
                  />
                </div>
              </label>
              
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-stone-700">Speaker</span>
                <div className="relative">
                  <select 
                    className="w-full bg-white border border-stone-200 focus:border-stone-300 focus:ring-2 focus:ring-stone-200 text-stone-800 rounded-xl px-4 py-3 outline-none transition-all appearance-none cursor-pointer"
                    onChange={(event) => setSpeaker(event.target.value)} 
                    value={speaker}
                  >
                    {speakers.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                  <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-stone-400">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </div>
              </label>
            </div>

            <div className="mt-8 pt-8 border-t border-primary-200 flex flex-col gap-4 text-sm font-medium text-stone-600">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                {filteredSermons.length} sermons match your filters
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-stone-400"></div>
                Latest sermon featured at top
              </span>
            </div>
          </article>
        </motion.section>
      </div>

      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="w-full"
      >
        <div className="flex items-center justify-between mb-8 border-b border-stone-200 pb-4">
           <h3 className="font-display text-2xl font-bold text-stone-900">Archive Insights</h3>
        </div>

        {filteredSermons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
               {filteredSermons.map((sermon) => (
                <motion.article 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-3xl p-8 border border-stone-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all flex flex-col group" 
                  id={`sermon-${sermon.slug}`} 
                  key={sermon.slug}
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-500 mb-2">{sermon.series}</p>
                  <h3 className="font-display text-2xl font-bold text-stone-900 mb-3 group-hover:text-primary-600 transition-colors">{sermon.title}</h3>
                  <p className="text-stone-600 leading-relaxed mb-6 flex-1 text-sm">{sermon.summary}</p>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-stone-500 bg-stone-50 rounded-2xl p-4 border border-stone-100 mb-6 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> {sermon.speaker}</span>
                    <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> {formatDate(sermon.date)}</span>
                    <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> {sermon.scripture}</span>
                  </div>
                  
                  <div className="flex gap-4">
                    <a className="flex-1 text-center py-3 rounded-full bg-stone-900 text-white font-bold text-sm hover:bg-stone-800 transition-colors" href={sermon.watchUrl} rel="noreferrer" target="_blank">
                      Open sermon
                    </a>
                    {sermon.notesUrl ? (
                      <a className="flex-1 text-center py-3 rounded-full bg-white border border-stone-200 text-stone-700 font-bold text-sm hover:bg-stone-50 transition-colors" href={sermon.notesUrl} rel="noreferrer" target="_blank">
                        Notes
                      </a>
                    ) : null}
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
              <svg className="w-8 h-8 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-stone-900 mb-2">No sermons match that search yet</h3>
            <p className="text-stone-500">Try a different speaker, series, or Scripture reference.</p>
            <button onClick={() => { setQuery(''); setSpeaker('All speakers'); }} className="mt-6 font-bold text-stone-900 underline underline-offset-4 hover:text-primary-600 transition-colors">Clear all filters</button>
          </motion.article>
        )}
      </motion.section>
    </div>
  )
}
