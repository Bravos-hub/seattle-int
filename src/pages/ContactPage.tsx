import { ExternalForm, type FormField } from '../components/ExternalForm'
import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const contactFields: FormField[] = [
  { name: 'name', label: 'Full name', type: 'text', required: true },
  { name: 'email', label: 'Email address', type: 'email', required: true },
  { name: 'phone', label: 'Phone number', type: 'tel' },
  {
    name: 'topic',
    label: 'How can we help?',
    type: 'select',
    required: true,
    options: [
      { label: 'General inquiry', value: 'General inquiry' },
      { label: 'Pastoral care', value: 'Pastoral care' },
      { label: 'Events', value: 'Events' },
      { label: 'Serving and ministries', value: 'Serving and ministries' },
    ],
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    required: true,
    placeholder: 'Share your question and the best way for us to reach you.',
  },
]

export function ContactPage() {
  const siteContent = useSiteContent()
  useDocumentMeta(
    'Contact',
    'Reach the church office, get map directions, browse social links, and send a general inquiry or care request.',
  )

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Reach the church in the way that feels easiest for you</h1>
        <p>
          Call, email, visit, or send a message through the site. We want support
          pathways to stay simple and visible.
        </p>
      </section>

      <section className="content-section card-grid four-up">
        <article className="surface-card">
          <h3>Phone</h3>
          <a className="text-link" href={`tel:${siteContent.site.phone.replace(/[^+\d]/g, '')}`}>
            {siteContent.site.phone}
          </a>
        </article>
        <article className="surface-card">
          <h3>Email</h3>
          <a className="text-link" href={`mailto:${siteContent.site.email}`}>
            {siteContent.site.email}
          </a>
        </article>
        <article className="surface-card">
          <h3>Office hours</h3>
          <p>{siteContent.site.officeHours[0]}</p>
          <p>{siteContent.site.officeHours[1]}</p>
        </article>
        <article className="surface-card">
          <h3>Address</h3>
          <p>{siteContent.site.address}</p>
        </article>
      </section>

      <section className="content-section spotlight-grid">
        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Map</p>
            <h2>Visit the church office</h2>
          </div>
          <div className="embed-shell map-shell">
            <iframe src={siteContent.site.mapEmbedUrl} title="Contact page map" />
          </div>
          <a
            className="button button-secondary"
            href={siteContent.site.directionsUrl}
            rel="noreferrer"
            target="_blank"
          >
            Open directions
          </a>
        </article>

        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Social</p>
            <h2>Stay connected through the week</h2>
          </div>
          <div className="stack-list">
            {siteContent.site.socials.map((social) => (
              <a
                className="detail-card"
                href={social.url}
                key={social.label}
                rel="noreferrer"
                target="_blank"
              >
                <div>
                  <strong>{social.label}</strong>
                  <p>{social.handle}</p>
                </div>
                <span>Open</span>
              </a>
            ))}
          </div>
        </article>
      </section>

      <section className="content-section">
        <ExternalForm
          description="Use this general contact form for questions, care requests, ministry interest, or event information."
          fields={contactFields}
          integration={siteContent.forms.contact}
          submitLabel="Send message"
          title="General contact form"
        />
      </section>
    </>
  )
}
