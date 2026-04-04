import { Link } from 'react-router-dom'

import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatShortDate } from '../lib/formatters'

export function HomePage() {
  const siteContent = useSiteContent()
  useDocumentMeta(
    'Welcome Home',
    'Find service times, upcoming events, latest sermons, ministries, prayer support, and next steps for visiting Seattle International Church.',
  )

  const featuredSermon = siteContent.sermons[0]
  const upcomingEvents = siteContent.events.slice(0, 3)
  const featuredMinistries = siteContent.ministries.slice(0, 4)

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy surface-card">
          <p className="eyebrow">{siteContent.site.name}</p>
          <h1>{siteContent.site.heroTitle}</h1>
          <p className="hero-text">{siteContent.site.tagline}</p>
          <p>{siteContent.site.welcomeMessage}</p>

          <div className="button-row">
            <Link className="button button-primary" to="/plan-your-visit">
              Plan Your Visit
            </Link>
            <a
              className="button button-secondary"
              href={siteContent.site.watchOnlineUrl}
              rel="noreferrer"
              target="_blank"
            >
              Watch Sermons
            </a>
          </div>

          <div className="service-strip" role="list">
            {siteContent.site.serviceTimes.map((time) => (
              <article className="service-chip" key={time.label} role="listitem">
                <span>{time.label}</span>
                <strong>{time.time}</strong>
                {time.note ? <small>{time.note}</small> : null}
              </article>
            ))}
          </div>
        </div>

        <div className="hero-panel surface-card">
          <p className="eyebrow">Why people feel at home here</p>
          <div className="hero-panel-grid">
            {siteContent.site.trustSignals.map((signal) => (
              <article className="mini-card" key={signal}>
                <strong>Warm welcome</strong>
                <p>{signal}</p>
              </article>
            ))}
          </div>
          <div className="feature-band">
            <div>
              <span className="stat-value">First time?</span>
              <p>
                Our visitor guide answers what to expect, where to park, and how
                kids check-in works.
              </p>
            </div>
            <Link className="text-link" to="/plan-your-visit">
              Explore the visit guide
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">New here</p>
          <h2>A calm first visit starts with clarity</h2>
          <p>
            Everything below is designed to reduce uncertainty and help first-time
            guests feel expected before they ever walk through the doors.
          </p>
        </div>
        <div className="card-grid four-up">
          {siteContent.visitHighlights.map((highlight) => (
            <article className="surface-card" key={highlight.title}>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section spotlight-grid">
        <article className="surface-card media-card">
          <div className="section-heading">
            <p className="eyebrow">Latest sermon</p>
            <h2>{featuredSermon.title}</h2>
            <p>
              {featuredSermon.series} • {featuredSermon.speaker} •{' '}
              {formatShortDate(featuredSermon.date)}
            </p>
          </div>

          {featuredSermon.embedUrl ? (
            <div className="embed-shell">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                src={featuredSermon.embedUrl}
                title={featuredSermon.title}
              />
            </div>
          ) : (
            <div className="placeholder-media">
              <strong>Video slot ready</strong>
              <p>
                Add a YouTube or Vimeo embed URL in the structured content file to
                feature the latest sermon here.
              </p>
            </div>
          )}

          <p>{featuredSermon.summary}</p>
          <div className="button-row">
            <a
              className="button button-primary"
              href={featuredSermon.watchUrl}
              rel="noreferrer"
              target="_blank"
            >
              Watch now
            </a>
            <Link className="button button-ghost" to="/sermons">
              Browse sermons
            </Link>
          </div>
        </article>

        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Current rhythm</p>
            <h2>Upcoming events</h2>
            <p>Key moments coming up for worship, connection, discipleship, and care.</p>
          </div>

          <div className="stack-list">
            {upcomingEvents.map((event) => (
              <Link className="detail-card" key={event.slug} to={`/events/${event.slug}`}>
                <div>
                  <strong>{event.title}</strong>
                  <p>{event.summary}</p>
                </div>
                <span>
                  {formatShortDate(event.start)} • {event.category}
                </span>
              </Link>
            ))}
          </div>
        </article>
      </section>

      <section className="content-section">
        <div className="section-heading section-heading-inline">
          <div>
            <p className="eyebrow">Church life</p>
            <h2>Find a ministry where you can belong and serve</h2>
          </div>
          <Link className="button button-ghost" to="/ministries">
            View all ministries
          </Link>
        </div>
        <div className="card-grid four-up">
          {featuredMinistries.map((ministry) => (
            <article className="surface-card" key={ministry.slug}>
              <p className="eyebrow">{ministry.audience}</p>
              <h3>{ministry.name}</h3>
              <p>{ministry.summary}</p>
              <Link className="text-link" to={`/ministries/${ministry.slug}`}>
                Learn more
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section cta-band">
        <article className="surface-card accent-card">
          <p className="eyebrow">Need prayer?</p>
          <h2>Share your request privately</h2>
          <p>
            Our prayer team handles requests with care, confidentiality, and clear
            follow-up when you want it.
          </p>
          <Link className="button button-primary" to="/prayer-request">
            Submit a prayer request
          </Link>
        </article>

        <article className="surface-card accent-card accent-card-alt">
          <p className="eyebrow">Support the ministry</p>
          <h2>Give with clarity and confidence</h2>
          <p>
            Learn how giving supports worship, discipleship, community care, and
            outreach across the church family.
          </p>
          <Link className="button button-secondary" to="/give">
            Explore giving options
          </Link>
        </article>
      </section>
    </>
  )
}
