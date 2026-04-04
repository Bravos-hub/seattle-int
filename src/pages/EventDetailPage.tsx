import { Link, useParams } from 'react-router-dom'

import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatDateTimeRange } from '../lib/formatters'
import { NotFoundPage } from './NotFoundPage'

export function EventDetailPage() {
  const { slug } = useParams()
  const siteContent = useSiteContent()
  const event = siteContent.events.find((item) => item.slug === slug)

  useDocumentMeta(
    event?.title ?? 'Event not found',
    event?.summary ?? 'The requested event could not be found.',
  )

  if (!event) {
    return <NotFoundPage />
  }

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">{event.category} event</p>
        <h1>{event.title}</h1>
        <p>{event.summary}</p>
      </section>

      <section className="content-section spotlight-grid">
        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Event details</p>
            <h2>Everything you need to know</h2>
          </div>
          <div className="meta-stack">
            <span>{formatDateTimeRange(event.start, event.end)}</span>
            <span>{event.location}</span>
            <span>{event.contactEmail}</span>
          </div>
          <ul className="feature-list">
            {event.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <div className="button-row">
            <a
              className="button button-primary"
              href={event.actionUrl}
              rel="noreferrer"
              target={event.actionUrl.startsWith('/') ? undefined : '_blank'}
            >
              {event.actionLabel}
            </a>
            <Link className="button button-ghost" to="/events">
              Back to events
            </Link>
          </div>
        </article>

        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Need help?</p>
            <h2>Contact path</h2>
          </div>
          <p>
            If you have questions before this event, email{' '}
            <a href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a> and the
            team will help you with details.
          </p>
          <div className="detail-card">
            <div>
              <strong>Visiting for the first time?</strong>
              <p>Use the visit guide for directions, parking, and what to expect on arrival.</p>
            </div>
            <Link className="text-link" to="/plan-your-visit">
              Open the guide
            </Link>
          </div>
        </article>
      </section>
    </>
  )
}
