import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import { useSearchIndex, useSiteContent } from '../content/siteContentStore'
import { normalizeSearchValue } from '../lib/formatters'

export function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const siteContent = useSiteContent()
  const searchIndex = useSearchIndex()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navItems = siteContent.pageSummaries.filter((page) => page.title !== 'Home')

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.hash, location.pathname])

  const results = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(query)

    if (!normalizedQuery) {
      return []
    }

    return searchIndex
      .filter((entry) =>
        `${entry.label} ${entry.description}`
          .toLowerCase()
          .includes(normalizedQuery),
      )
      .slice(0, 6)
  }, [query, searchIndex])

  function closeNavigation() {
    setMenuOpen(false)
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!results[0]) {
      return
    }

    navigate(results[0].path)
    closeNavigation()
    setQuery('')
  }

  function handleResultClick(path: string) {
    navigate(path)
    closeNavigation()
    setQuery('')
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50 overflow-x-hidden text-stone-800">
      <a className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-stone-900 focus:text-white focus:z-50 focus:rounded-br-2xl" href="#main-content">
        Skip to content
      </a>

      {/* Top Banner */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-stone-900 text-stone-300 text-sm py-2 px-4 md:px-8 flex flex-wrap justify-between items-center z-50 relative"
      >
        <p className="font-medium tracking-wide">
          {siteContent.site.serviceTimes
            .slice(0, 2)
            .map((item) => `${item.label}: ${item.time}`)
            .join(' • ')}
        </p>
        <a 
          href={siteContent.site.watchOnlineUrl} 
          rel="noreferrer" 
          target="_blank"
          className="hover:text-white transition-colors underline underline-offset-4"
        >
          Watch online
        </a>
      </motion.div>

      {/* Floating Header */}
      <div className="sticky top-4 z-40 mx-4 md:mx-8 mb-4">
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-4 py-3 md:px-6 flex items-center justify-between"
        >
          <Link className="flex items-center gap-3 shrink-0" onClick={closeNavigation} to="/">
            <div className="w-10 h-10 rounded-xl bg-primary-500 text-white flex items-center justify-center font-display font-bold text-lg tracking-wider shadow-sm">
              SI
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="font-display font-bold text-stone-900 leading-tight">
                {siteContent.site.shortName}
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {siteContent.site.tagline}
              </span>
            </div>
          </Link>

          <button
            aria-controls="site-navigation"
            aria-expanded={menuOpen}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full left-0 right-0 mt-4 md:mt-0 p-6 md:p-0 bg-white/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none rounded-3xl md:rounded-none shadow-xl md:shadow-none border border-stone-100 md:border-none flex-col md:flex-row items-center gap-6 flex-1 justify-end`}>
            <nav className="flex flex-col md:flex-row items-center gap-1 w-full md:w-auto" id="site-navigation">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-all w-full md:w-auto text-center ${isActive ? 'bg-stone-100 text-stone-900' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'}`
                  }
                  key={item.path}
                  onClick={closeNavigation}
                  to={item.path}
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>

            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-stone-100 md:border-none">
              <form className="relative w-full md:w-64" onSubmit={handleSearchSubmit} role="search">
                <input
                  id="site-search"
                  className="w-full bg-stone-100/80 border-transparent focus:bg-white focus:border-stone-300 focus:ring-2 focus:ring-stone-200 text-sm rounded-full px-4 py-2.5 outline-none transition-all placeholder:text-stone-400"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search..."
                  value={query}
                />
                
                <AnimatePresence>
                  {query && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute top-full right-0 left-0 md:left-auto mt-2 w-full md:w-80 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-stone-100 overflow-hidden p-2 z-50 text-left" 
                      role="listbox"
                    >
                      {results.length ? (
                        <div className="flex flex-col gap-1">
                          {results.map((result) => (
                            <button
                              className="text-left p-3 hover:bg-stone-50 rounded-xl transition-colors"
                              key={result.id}
                              onClick={() => handleResultClick(result.path)}
                              type="button"
                            >
                              <div className="font-semibold text-stone-900 text-sm">{result.label}</div>
                              <div className="text-xs text-primary-500 font-medium mb-1">{result.category}</div>
                              <div className="text-xs text-stone-500 line-clamp-1">{result.description}</div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-sm text-stone-500">
                          No match yet. Try a page title, speaker, series, or event name.
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              <div className="flex gap-2 w-full md:w-auto">
                <Link 
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors text-center flex-1 md:flex-none" 
                  onClick={closeNavigation} 
                  to="/plan-your-visit"
                >
                  Visit
                </Link>
                <a
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-white bg-stone-900 hover:bg-black transition-colors text-center flex-1 md:flex-none"
                  href={siteContent.site.givingPortalUrl}
                  onClick={closeNavigation}
                  rel="noreferrer"
                  target="_blank"
                >
                  Give
                </a>
              </div>
            </div>
          </div>
        </motion.header>
      </div>

      <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <Outlet />
      </main>

      <footer className="bg-stone-900 text-stone-300 mt-auto rounded-t-[3rem] mx-2 md:mx-4 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:pr-8">
            <h2 className="font-display text-3xl text-white font-bold tracking-tight mb-4">{siteContent.site.name}</h2>
            <p className="text-stone-400 mb-6 text-sm leading-relaxed">{siteContent.site.welcomeMessage}</p>
            <div className="flex flex-col gap-3 text-sm font-medium">
              <a className="hover:text-white transition-colors" href={`tel:${siteContent.site.phone.replace(/[^+\d]/g, '')}`}>
                {siteContent.site.phone}
              </a>
              <a className="hover:text-white transition-colors" href={`mailto:${siteContent.site.email}`}>{siteContent.site.email}</a>
              <p className="text-stone-500">{siteContent.site.address}</p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-white text-lg font-semibold mb-6">Service Times</h3>
            <ul className="flex flex-col gap-4">
              {siteContent.site.serviceTimes.map((time) => (
                <li key={time.label} className="border-b border-stone-800 pb-4 last:border-0 last:pb-0">
                  <strong className="block text-white text-sm font-medium mb-1">{time.label}</strong>
                  <span className="text-stone-400 text-sm">{time.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-white text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link className="text-sm font-medium hover:text-white transition-colors relative group inline-block" to={item.path}>
                    {item.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-500 transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-white text-lg font-semibold mb-6">Connect</h3>
            <ul className="flex flex-col gap-3 mb-8">
              {siteContent.site.socials.map((social) => (
                <li key={social.label}>
                  <a className="text-sm font-medium hover:text-white transition-colors flex items-center gap-2" href={social.url} rel="noreferrer" target="_blank">
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>
            <a
              className="inline-block px-6 py-3 rounded-full text-sm font-medium text-stone-900 bg-primary-500 hover:bg-primary-400 transition-colors w-full text-center mb-4 shadow-[0_0_20px_rgba(212,163,115,0.2)]"
              href={siteContent.site.directionsUrl}
              rel="noreferrer"
              target="_blank"
            >
              Get Directions
            </a>
            <Link className="block text-center text-xs text-stone-600 hover:text-stone-400 uppercase tracking-widest transition-colors" to="/admin">
              Admin Portal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
