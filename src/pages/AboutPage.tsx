import { siteContent } from '../content/siteContent'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function AboutPage() {
  useDocumentMeta(
    'About',
    'Meet Seattle International Church through our mission, vision, values, statement of faith, story, and leadership team.',
  )

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">About us</p>
        <h1>Who we are and what shapes our church family</h1>
        <p>
          We want this church to feel spiritually grounded, practically welcoming,
          and transparent about what we believe.
        </p>
      </section>

      <section className="content-section two-column">
        <article className="surface-card">
          <p className="eyebrow">Mission</p>
          <h2>What we are committed to</h2>
          <p>{siteContent.about.mission}</p>
        </article>
        <article className="surface-card">
          <p className="eyebrow">Vision</p>
          <h2>Where we are headed</h2>
          <p>{siteContent.about.vision}</p>
        </article>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Core values</p>
          <h2>Practices that shape our culture</h2>
        </div>
        <div className="card-grid">
          {siteContent.about.values.map((value) => (
            <article className="surface-card" key={value}>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section spotlight-grid">
        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Statement of faith</p>
            <h2>What we believe</h2>
          </div>
          <ul className="feature-list">
            {siteContent.about.statementOfFaith.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Our story</p>
            <h2>How the church has grown</h2>
          </div>
          <ul className="feature-list">
            {siteContent.about.history.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Leadership</p>
          <h2>Meet the team serving the church</h2>
        </div>
        <div className="card-grid three-up">
          {siteContent.leaders.map((leader) => (
            <article className="surface-card leader-card" key={leader.email}>
              <div className="leader-avatar" aria-hidden="true">
                {leader.name
                  .split(' ')
                  .map((name) => name[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <p className="eyebrow">{leader.role}</p>
              <h3>{leader.name}</h3>
              <p>{leader.bio}</p>
              <div className="meta-stack">
                <span>{leader.focus}</span>
                <a href={`mailto:${leader.email}`}>{leader.email}</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
