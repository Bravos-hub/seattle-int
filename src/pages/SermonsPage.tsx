import { useDeferredValue, useMemo, useState } from 'react'

import { siteContent } from '../content/siteContent'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatDate, normalizeSearchValue } from '../lib/formatters'

export function SermonsPage() {
  useDocumentMeta(
    'Sermons',
    'Watch recent sermons, browse by speaker or series, and search teaching by topic, title, or Scripture reference.',
  )

  const [query, setQuery] = useState('')
  const [speaker, setSpeaker] = useState('All speakers')
  const deferredQuery = useDeferredValue(query)

  const speakers = useMemo(
    () => ['All speakers', ...new Set(siteContent.sermons.map((sermon) => sermon.speaker))],
    [],
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
  }, [deferredQuery, speaker])

  const featuredSermon = filteredSermons[0] ?? siteContent.sermons[0]

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Sermons</p>
        <h1>Teaching that stays accessible and easy to revisit</h1>
        <p>
          Search the archive, filter by speaker, and keep recent messages close at
          hand throughout the week.
        </p>
      </section>

      <section className="content-section spotlight-grid">
        <article className="surface-card media-card">
          <div className="section-heading">
            <p className="eyebrow">Featured message</p>
            <h2>{featuredSermon.title}</h2>
            <p>
              {featuredSermon.speaker} • {featuredSermon.series} •{' '}
              {formatDate(featuredSermon.date)}
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
              <strong>Embed ready for upload</strong>
              <p>Add a sermon embed URL in the content layer to show the player here.</p>
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
              Watch online
            </a>
            {featuredSermon.notesUrl ? (
              <a
                className="button button-ghost"
                href={featuredSermon.notesUrl}
                rel="noreferrer"
                target="_blank"
              >
                Scripture notes
              </a>
            ) : null}
          </div>
        </article>

        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Filter archive</p>
            <h2>Find a message quickly</h2>
          </div>

          <div className="filter-grid">
            <label className="field">
              <span>Search title, series, or scripture</span>
              <input
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Example: hope, Matthew, Grace"
                value={query}
              />
            </label>
            <label className="field">
              <span>Speaker</span>
              <select onChange={(event) => setSpeaker(event.target.value)} value={speaker}>
                {speakers.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="meta-stack">
            <span>{filteredSermons.length} sermons match your current filters.</span>
            <span>The latest sermon is always featured at the top of this page.</span>
          </div>
        </article>
      </section>

      <section className="content-section">
        <div className="card-grid two-up">
          {filteredSermons.map((sermon) => (
            <article className="surface-card sermon-card" id={`sermon-${sermon.slug}`} key={sermon.slug}>
              <p className="eyebrow">{sermon.series}</p>
              <h3>{sermon.title}</h3>
              <p>{sermon.summary}</p>
              <div className="meta-stack">
                <span>{sermon.speaker}</span>
                <span>{formatDate(sermon.date)}</span>
                <span>{sermon.scripture}</span>
              </div>
              <div className="button-row">
                <a
                  className="button button-primary"
                  href={sermon.watchUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open sermon
                </a>
                {sermon.notesUrl ? (
                  <a
                    className="button button-ghost"
                    href={sermon.notesUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Notes
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        {!filteredSermons.length ? (
          <article className="surface-card empty-state">
            <h3>No sermons match that search yet</h3>
            <p>Try a different speaker, series, or Scripture reference.</p>
          </article>
        ) : null}
      </section>
    </>
  )
}
