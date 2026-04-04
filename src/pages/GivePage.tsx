import { siteContent } from '../content/siteContent'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function GivePage() {
  useDocumentMeta(
    'Give',
    'Understand why the church gives, explore secure giving options, and review common giving questions before donating.',
  )

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Give</p>
        <h1>Generosity should feel trusted, clear, and simple</h1>
        <p>{siteContent.giving.intro}</p>
      </section>

      <section className="content-section">
        <div className="card-grid three-up">
          {siteContent.giving.options.map((option) => (
            <article className="surface-card" key={option.title}>
              <h3>{option.title}</h3>
              <p>{option.summary}</p>
              <a
                className="button button-primary"
                href={option.actionUrl}
                rel="noreferrer"
                target="_blank"
              >
                {option.actionLabel}
              </a>
              <p className="small-note">{option.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section spotlight-grid">
        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Why we give</p>
            <h2>Stewardship supports ministry in real ways</h2>
          </div>
          <ul className="feature-list">
            <li>Sunday worship, discipleship, prayer, and pastoral care.</li>
            <li>Children, youth, and ministry spaces that help people belong.</li>
            <li>City outreach, compassion initiatives, and mission partnerships.</li>
          </ul>
        </article>

        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Frequently asked</p>
            <h2>Giving FAQ</h2>
          </div>
          <div className="stack-list">
            {siteContent.giving.faqs.map((faq) => (
              <div className="detail-card" key={faq.question}>
                <div>
                  <strong>{faq.question}</strong>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </>
  )
}
