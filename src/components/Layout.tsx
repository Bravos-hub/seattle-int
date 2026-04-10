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
      <div className={`fixed top-0 w-full z-50 transition-all duration-500 ${isHome && !isScrolled ? 'bg-transparent' : 'glass-header shadow-2xl shadow-black/20'}`}>
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1400px] mx-auto px-6 py-4 md:py-6 flex items-center justify-between gap-4 md:gap-12"
        >
          <Link className="flex items-center gap-3 shrink-0 group text-white" onClick={closeNavigation} to="/">
            <div className="relative">
              <svg className="w-8 h-8 text-primary-500 group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="absolute inset-0 bg-primary-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-display font-bold text-lg md:text-xl tracking-tighter uppercase line-clamp-1">
              {siteContent.site.shortName || 'CHURCH'}
            </span>
          </Link>

          <button
            aria-controls="site-navigation"
            aria-expanded={menuOpen}
            className="xl:hidden p-2 text-white/70 hover:text-white focus:outline-none transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          <div className={`${menuOpen ? 'flex' : 'hidden'} xl:flex absolute xl:relative top-full left-0 right-0 p-8 xl:p-0 bg-stone-900/95 xl:bg-transparent backdrop-blur-2xl xl:backdrop-blur-none border-b border-white/5 xl:border-none flex-col xl:flex-row items-center gap-8 flex-1 justify-end`}>
            <nav className="flex flex-col xl:flex-row items-center gap-6 xl:gap-10 w-full xl:w-auto" id="site-navigation">
              <NavLink
                className={({ isActive }) => `group relative text-sm font-semibold tracking-wide transition-all ${isActive ? 'text-primary-500' : 'text-white/60 hover:text-white'}`}
                onClick={closeNavigation}
                to="/"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
              </NavLink>

              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    `group relative text-sm font-semibold tracking-wide transition-all w-full xl:w-auto text-center ${isActive ? 'text-primary-500' : 'text-white/60 hover:text-white'}`
                  }
                  key={item.path}
                  onClick={closeNavigation}
                  to={item.path}
                >
                  {item.title}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                </NavLink>
              ))}
            </nav>

            <div className="flex flex-col xl:flex-row items-center gap-6 w-full xl:w-auto mt-6 xl:mt-0 pt-6 xl:pt-0 border-t border-white/5 xl:border-none">
              <Link
                className="flex items-center gap-3 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-red-500 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-all w-full xl:w-auto justify-center rounded-full"
                onClick={closeNavigation}
                to="/sermons"
              >
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                Live
              </Link>

              <div className="flex w-full xl:w-auto">
                <a
                  className="px-8 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-primary-500 hover:bg-primary-600 transition-all text-center w-full shadow-lg shadow-primary-500/20 rounded-full"
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

      <main id="main-content" className={`flex-1 w-full ${isHome ? '' : 'mt-[80px] pb-20'}`}>
        <Outlet />
      </main>

      {/* Redesigned Premium Footer */}
      <footer className="bg-stone-900 border-t border-white/5 text-stone-400 px-6 py-20 md:py-32 isolate relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
            <div className="lg:col-span-4">
              <Link className="flex items-center gap-3 group text-white mb-8" to="/">
                <svg className="w-10 h-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-display font-extrabold text-2xl tracking-tighter uppercase leading-none">
                    SEATTLE
                  </span>
                  <span className="font-display font-medium text-xs tracking-[0.3em] text-white/40 leading-none mt-1">
                    INTERNATIONAL
                  </span>
                </div>
              </Link>
              <p className="text-white/40 mb-8 text-sm leading-relaxed max-w-sm italic font-medium">
                "{siteContent.site.welcomeMessage}"
              </p>
              <div className="flex items-center gap-4">
                {siteContent.site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:text-primary-500 hover:border-primary-500/50 transition-all duration-300"
                  >
                    <span className="sr-only">{social.label}</span>
                    <div className="text-sm font-bold">{social.label[0]}</div>
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-display text-white text-xs font-bold uppercase tracking-[0.2em] mb-10">Explore</h3>
              <ul className="flex flex-col gap-5">
                <li><Link className="text-sm hover:text-white transition-colors flex items-center gap-2 group" to="/"><span className="w-1.5 h-1.5 rounded-full bg-primary-500/0 group-hover:bg-primary-500 transition-all" />Home</Link></li>
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link className="text-sm hover:text-white transition-colors flex items-center gap-2 group" to={item.path}>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500/0 group-hover:bg-primary-500 transition-all" />
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h3 className="font-display text-white text-xs font-bold uppercase tracking-[0.2em] mb-10">Weekly Gatherings</h3>
              <ul className="flex flex-col gap-6">
                {siteContent.site.serviceTimes.map((time) => (
                  <li key={time.label} className="group">
                    <span className="block text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1 group-hover:text-primary-500 transition-colors">{time.label}</span>
                    <span className="text-white text-sm font-medium">{time.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h3 className="font-display text-white text-xs font-bold uppercase tracking-[0.2em] mb-10">Contact Us</h3>
              <div className="flex flex-col gap-6">
                <div>
                  <span className="block text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">Our Location</span>
                  <p className="text-white text-sm leading-relaxed mb-3">{siteContent.site.address}</p>
                  <a className="text-xs text-primary-500 font-bold hover:text-primary-400 transition-all flex items-center gap-2" href={siteContent.site.directionsUrl} target="_blank" rel="noreferrer">
                    Get Directions <span className="text-[10px]">→</span>
                  </a>
                </div>
                <div>
                  <span className="block text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">Get in Touch</span>
                  <p className="text-white text-sm">{siteContent.site.email}</p>
                  <p className="text-white text-sm mt-1">{siteContent.site.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-white/20 font-medium">
              &copy; {new Date().getFullYear()} Seattle International Church. All rights reserved.
            </p>
            <div className="flex items-center gap-8">
              <Link className="text-[10px] text-white/20 hover:text-white font-bold uppercase tracking-widest transition-colors" to="/admin">CMS Portal</Link>
              <Link className="text-[10px] text-white/20 hover:text-white font-bold uppercase tracking-widest transition-colors" to="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
