import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

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
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="topbar">
          <p>
            {siteContent.site.serviceTimes
              .slice(0, 2)
              .map((item) => `${item.label}: ${item.time}`)
              .join(' • ')}
          </p>
          <a href={siteContent.site.watchOnlineUrl} rel="noreferrer" target="_blank">
            Watch online
          </a>
        </div>

        <div className="nav-row">
          <Link className="brand" onClick={closeNavigation} to="/">
            <span className="brand-mark">SI</span>
            <span>
              <strong>{siteContent.site.shortName}</strong>
              <small>{siteContent.site.tagline}</small>
            </span>
          </Link>

          <button
            aria-controls="site-navigation"
            aria-expanded={menuOpen}
            className="menu-toggle"
            onClick={() => setMenuOpen((value) => !value)}
            type="button"
          >
            Menu
          </button>

          <div className={`header-panel ${menuOpen ? 'is-open' : ''}`}>
            <nav className="site-nav" id="site-navigation">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' is-active' : ''}`
                  }
                  key={item.path}
                  onClick={closeNavigation}
                  to={item.path}
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>

            <div className="header-actions">
              <form className="search-form" onSubmit={handleSearchSubmit} role="search">
                <label className="search-label" htmlFor="site-search">
                  Search the site
                </label>
                <input
                  id="site-search"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search pages, sermons, and events"
                  value={query}
                />
                <button className="button button-ghost" type="submit">
                  Find
                </button>

                {query ? (
                  <div className="search-results" role="listbox">
                    {results.length ? (
                      results.map((result) => (
                        <button
                          className="search-result"
                          key={result.id}
                          onClick={() => handleResultClick(result.path)}
                          type="button"
                        >
                          <strong>{result.label}</strong>
                          <span>{result.category}</span>
                          <small>{result.description}</small>
                        </button>
                      ))
                    ) : (
                      <p className="search-empty">
                        No match yet. Try a page title, speaker, series, or event name.
                      </p>
                    )}
                  </div>
                ) : null}
              </form>

              <Link className="button button-ghost" onClick={closeNavigation} to="/plan-your-visit">
                Plan Your Visit
              </Link>
              <a
                className="button button-primary"
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
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <h2>{siteContent.site.name}</h2>
            <p>{siteContent.site.welcomeMessage}</p>
            <div className="footer-stack">
              <a href={`tel:${siteContent.site.phone.replace(/[^+\d]/g, '')}`}>
                {siteContent.site.phone}
              </a>
              <a href={`mailto:${siteContent.site.email}`}>{siteContent.site.email}</a>
              <p>{siteContent.site.address}</p>
            </div>
          </div>

          <div>
            <h3>Service Times</h3>
            <ul className="footer-list">
              {siteContent.site.serviceTimes.map((time) => (
                <li key={time.label}>
                  <strong>{time.label}</strong>
                  <span>{time.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Quick Links</h3>
            <ul className="footer-list">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Connect</h3>
            <ul className="footer-list">
              {siteContent.site.socials.map((social) => (
                <li key={social.label}>
                  <a href={social.url} rel="noreferrer" target="_blank">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              className="button button-secondary footer-button"
              href={siteContent.site.directionsUrl}
              rel="noreferrer"
              target="_blank"
            >
              Get Directions
            </a>
            <Link className="footer-admin-link" to="/admin">
              Admin CMS
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
