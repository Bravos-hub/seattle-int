import { ExternalForm, type FormField } from '../components/ExternalForm'
import { siteContent } from '../content/siteContent'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const prayerFields: FormField[] = [
  { name: 'name', label: 'Full name', type: 'text' },
  { name: 'email', label: 'Email address', type: 'email' },
  {
    name: 'category',
    label: 'Prayer category',
    type: 'select',
    required: true,
    options: [
      { label: 'Healing', value: 'Healing' },
      { label: 'Family', value: 'Family' },
      { label: 'Finances', value: 'Finances' },
      { label: 'Thanksgiving', value: 'Thanksgiving' },
      { label: 'Spiritual growth', value: 'Spiritual growth' },
    ],
  },
  {
    name: 'request',
    label: 'Prayer request',
    type: 'textarea',
    required: true,
    placeholder: 'Share as much or as little as you are comfortable sharing.',
  },
  {
    name: 'private_request',
    label: 'Keep this request private and only visible to the prayer team',
    type: 'checkbox',
  },
  {
    name: 'follow_up',
    label: 'I would appreciate follow-up from the church',
    type: 'checkbox',
  },
]

export function PrayerRequestPage() {
  useDocumentMeta(
    'Prayer Request',
    'Submit a prayer request with optional privacy and follow-up preferences so the church can pray with care.',
  )

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Prayer request</p>
        <h1>A safe place to ask for prayer and care</h1>
        <p>
          Some people come to the site needing hope before anything else. This page
          is built to feel personal, warm, and discreet.
        </p>
      </section>

      <section className="content-section spotlight-grid">
        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Our care promise</p>
            <h2>Handled with compassion</h2>
          </div>
          <ul className="feature-list">
            <li>Requests marked private are treated with extra care and limited visibility.</li>
            <li>Follow-up only happens when you ask for it.</li>
            <li>Our prayer team responds with sensitivity, not pressure.</li>
          </ul>
        </article>

        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Direct support</p>
            <h2>Need to speak with someone today?</h2>
          </div>
          <p>
            Call the church office at {siteContent.site.phone} or email{' '}
            <a href="mailto:prayer@seattleinternational.church">
              prayer@seattleinternational.church
            </a>{' '}
            for urgent pastoral follow-up.
          </p>
        </article>
      </section>

      <section className="content-section">
        <ExternalForm
          description="Share your request below. You can stay brief or include more detail if it would help the team pray specifically."
          fields={prayerFields}
          integration={siteContent.forms.prayer}
          submitLabel="Send prayer request"
          title="Prayer request form"
        />
      </section>
    </>
  )
}
