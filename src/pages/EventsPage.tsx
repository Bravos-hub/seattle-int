import { useDeferredValue, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

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
    <>
      <section className="page-hero">
        <p className="eyebrow">Events</p>
        <h1>Stay close to the current life of the church</h1>
        <p>
          Upcoming gatherings, ministry moments, and outreach rhythms should always
          be easy to find and easy to act on.
        </p>
      </section>

      <section className="content-section spotlight-grid">
        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Upcoming spotlight</p>
            <h2>{spotlightEvent.title}</h2>
            <p>{spotlightEvent.summary}</p>
          </div>
          <div className="meta-stack">
            <span>{formatDateTimeRange(spotlightEvent.start, spotlightEvent.end)}</span>
            <span>{spotlightEvent.location}</span>
            <span>{spotlightEvent.category}</span>
          </div>
          <Link className="button button-primary" to={`/events/${spotlightEvent.slug}`}>
            View event details
          </Link>
        </article>

        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Filter events</p>
            <h2>Search by type or title</h2>
          </div>

          <div className="filter-grid">
            <label className="field">
              <span>Search</span>
              <input
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Example: prayer, youth, breakfast"
                value={query}
              />
            </label>
            <div className="field">
              <span>Category</span>
              <div className="pill-row">
                {eventCategories.map((item) => (
                  <button
                    className={`pill${category === item ? ' is-active' : ''}`}
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
      </section>

      <section className="content-section">
        <div className="card-grid two-up">
          {filteredEvents.map((event) => (
            <article className="surface-card" key={event.slug}>
              <p className="eyebrow">{event.category}</p>
              <h3>{event.title}</h3>
              <p>{event.summary}</p>
              <div className="meta-stack">
                <span>{formatDateTimeRange(event.start, event.end)}</span>
                <span>{event.location}</span>
              </div>
              <div className="button-row">
                <Link className="button button-primary" to={`/events/${event.slug}`}>
                  Details
                </Link>
                <a
                  className="button button-ghost"
                  href={event.actionUrl}
                  rel="noreferrer"
                  target={event.actionUrl.startsWith('/') ? undefined : '_blank'}
                >
                  {event.actionLabel}
                </a>
              </div>
            </article>
          ))}
        </div>

        {!filteredEvents.length ? (
          <article className="surface-card empty-state">
            <h3>No events match that filter right now</h3>
            <p>Try another category or search phrase to see more upcoming gatherings.</p>
          </article>
        ) : null}
      </section>
    </>
  )
}
