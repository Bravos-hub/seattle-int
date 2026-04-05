import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useSiteContent } from '../content/siteContentStore'

export function Layout() {
  const location = useLocation()
  const siteContent = useSiteContent()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navItems = siteContent.pageSummaries.filter((page) => page.title !== 'Home' && page.title !== 'Plan Your Visit')

  const isHome = location.pathname === '/'

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function closeNavigation() {
    setMenuOpen(false)
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans ${isHome ? 'bg-white' : 'bg-stone-50'} overflow-x-hidden text-stone-800`}>
      <a className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-stone-900 focus:text-white focus:z-50 focus:rounded-br-2xl" href="#main-content">
        Skip to content
      </a>

      {/* Edge-to-edge Header */}
      <div className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isHome && !isScrolled ? 'bg-transparent' : 'bg-[#0b162c] border-b border-white/5 shadow-2xl'}`}>
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1400px] mx-auto px-6 py-6 md:py-8 flex items-center justify-between gap-8 md:gap-12"
        >
          <Link className="flex items-center gap-2 shrink-0 group text-white" onClick={closeNavigation} to="/">
            <svg className="w-6 h-6 text-[#f97316] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="font-display font-bold text-lg tracking-widest uppercase">
              {siteContent.site.shortName || 'CHURCH'}
            </span>
          </Link>

          <button
            aria-controls="site-navigation"
            aria-expanded={menuOpen}
            className="xl:hidden p-2 text-white/70 hover:text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          <div className={`${menuOpen ? 'flex' : 'hidden'} xl:flex absolute xl:relative top-full left-0 right-0 p-6 xl:p-0 bg-[#0b162c]/95 xl:bg-transparent backdrop-blur-xl xl:backdrop-blur-none border-b border-white/10 xl:border-none flex-col xl:flex-row items-center gap-8 flex-1 justify-end`}>
            <nav className="flex flex-col xl:flex-row items-center gap-6 xl:gap-8 w-full xl:w-auto" id="site-navigation">
              {/* Home */}
              <NavLink className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-[#f97316]' : 'text-white/70 hover:text-white'}`} onClick={closeNavigation} to="/">Home</NavLink>
              
              {/* Iterating original nav logic but styling for dark mode */}
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors w-full xl:w-auto text-center ${isActive ? 'text-[#f97316]' : 'text-white/70 hover:text-white'}`
                  }
                  key={item.path}
                  onClick={closeNavigation}
                  to={item.path}
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>

            <div className="flex flex-col xl:flex-row items-center gap-6 w-full xl:w-auto mt-4 xl:mt-0 pt-4 xl:pt-0 border-t border-white/10 xl:border-none">
              <Link
                className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-red-500 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors w-full xl:w-auto justify-center"
                onClick={closeNavigation}
                to="/sermons"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                Live Stream
              </Link>

              <div className="flex w-full xl:w-auto">
                <a
                  className="px-6 py-2.5 text-sm font-medium text-white bg-[#f97316] hover:bg-[#ea580c] transition-colors text-center w-full shadow-lg shadow-[#f97316]/20"
                  href={siteContent.site.givingPortalUrl}
                  onClick={closeNavigation}
                  rel="noreferrer"
                  target="_blank"
                >
                  Donate
                </a>
              </div>
            </div>
          </div>
        </motion.header>
      </div>

      <main id="main-content" className={`flex-1 w-full ${isHome ? '' : 'mt-[100px] pb-20'}`}>
        <Outlet />
      </main>

      {/* Footer styled as simple dark box */}
      <footer className="bg-[#0b162c] text-stone-300 px-6 py-16 md:py-20 mt-auto">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div>
             <span className="font-display font-bold text-white tracking-widest uppercase mb-4 block">
              {siteContent.site.shortName || 'CHURCH'}
            </span>
             <p className="text-white/60 mb-6 text-sm leading-relaxed">{siteContent.site.welcomeMessage}</p>
             <Link className="text-xs text-white/40 hover:text-white uppercase tracking-widest transition-colors block" to="/admin">Admin Portal</Link>
          </div>
           <div>
            <h3 className="font-display text-white text-lg mb-6">Service Times</h3>
             <ul className="flex flex-col gap-4">
              {siteContent.site.serviceTimes.map((time) => (
                <li key={time.label} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <strong className="block text-white text-sm font-medium mb-1">{time.label}</strong>
                  <span className="text-white/60 text-sm">{time.time}</span>
                </li>
              ))}
            </ul>
           </div>
           <div>
             <h3 className="font-display text-white text-lg mb-6">Quick Links</h3>
             <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link className="text-sm text-white/60 hover:text-white transition-colors" to={item.path}>{item.title}</Link>
                </li>
              ))}
            </ul>
           </div>
           <div>
             <h3 className="font-display text-white text-lg mb-6">Connect</h3>
             <ul className="flex flex-col gap-3 mb-8">
              {siteContent.site.socials.map((social) => (
                <li key={social.label}>
                  <a className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2" href={social.url} rel="noreferrer" target="_blank">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              className="inline-block px-6 py-3 text-sm font-medium text-white bg-[#f97316] hover:bg-[#ea580c] transition-colors w-full text-center"
              href={siteContent.site.directionsUrl}
              rel="noreferrer"
              target="_blank"
            >
              Get Directions
            </a>
           </div>
        </div>
      </footer>
    </div>
  )
}
