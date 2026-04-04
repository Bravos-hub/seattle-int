import { ExternalForm, type FormField } from '../components/ExternalForm'
import { siteContent } from '../content/siteContent'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const visitorFields: FormField[] = [
  { name: 'name', label: 'Full name', type: 'text', required: true },
  { name: 'email', label: 'Email address', type: 'email', required: true },
  { name: 'phone', label: 'Phone number', type: 'tel' },
  {
    name: 'visit_date',
    label: 'When do you hope to visit?',
    type: 'text',
    placeholder: 'Example: Sunday, April 12',
  },
  {
    name: 'household',
    label: 'Who is coming with you?',
    type: 'text',
    placeholder: 'Just me, family with kids, a friend, and so on',
  },
  {
    name: 'questions',
    label: 'Anything you would like us to know?',
    type: 'textarea',
    placeholder: 'Questions about kids check-in, accessibility, parking, or anything else.',
  },
]

export function VisitPage() {
  useDocumentMeta(
    'Plan Your Visit',
    'Get service times, directions, parking details, kids information, what to expect, and a simple visitor form before attending.',
  )

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Plan your visit</p>
        <h1>A first Sunday should feel clear, not complicated</h1>
        <p>
          We want you to know exactly where to go, what the service is like, and
          who can help when you arrive.
        </p>
      </section>

      <section className="content-section card-grid four-up">
        {siteContent.visitHighlights.map((highlight) => (
          <article className="surface-card" key={highlight.title}>
            <h3>{highlight.title}</h3>
            <p>{highlight.description}</p>
          </article>
        ))}
      </section>

      <section className="content-section spotlight-grid">
        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Service times</p>
            <h2>Join us this week</h2>
          </div>
          <ul className="feature-list">
            {siteContent.site.serviceTimes.map((item) => (
              <li key={item.label}>
                <strong>{item.label}</strong> — {item.time}
                {item.note ? ` (${item.note})` : ''}
              </li>
            ))}
          </ul>
          <div className="detail-card">
            <div>
              <strong>Location</strong>
              <p>{siteContent.site.address}</p>
            </div>
            <a
              className="text-link"
              href={siteContent.site.directionsUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open directions
            </a>
          </div>
        </article>

        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Service flow</p>
            <h2>What to expect on a Sunday</h2>
          </div>
          <ul className="feature-list">
            <li>Welcome and worship with a band-led set focused on congregational singing.</li>
            <li>Prayer, Scripture reading, and a practical sermon rooted in the Bible.</li>
            <li>Optional ministry time after the service for prayer and conversation.</li>
            <li>Friendly team members outside and in the foyer to help with directions.</li>
          </ul>
        </article>
      </section>

      <section className="content-section spotlight-grid">
        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Find us</p>
            <h2>Map and directions</h2>
          </div>
          <div className="embed-shell map-shell">
            <iframe src={siteContent.site.mapEmbedUrl} title="Church location map" />
          </div>
        </article>

        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Helpful details</p>
            <h2>Before you arrive</h2>
          </div>
          <ul className="feature-list">
            <li>Parking is available on-site and nearby, with welcome signs at the entrance.</li>
            <li>Kids check-in opens 15 minutes before service begins.</li>
            <li>Smart casual or relaxed dress is completely normal here.</li>
            <li>Questions on the day? Call {siteContent.site.phone} and we will help.</li>
          </ul>
        </article>
      </section>

      <section className="content-section">
        <ExternalForm
          description="Let us know you are coming so the welcome team can be ready to greet you well."
          fields={visitorFields}
          integration={siteContent.forms.visitor}
          submitLabel="Send visitor form"
          title="Tell us about your visit"
        />
      </section>
    </>
  )
}
