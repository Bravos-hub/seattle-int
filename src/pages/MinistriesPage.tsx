import { Link } from 'react-router-dom'

import { ExternalForm, type FormField } from '../components/ExternalForm'
import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function MinistriesPage() {
  const siteContent = useSiteContent()
  const ministryJoinFields: FormField[] = [
    { name: 'name', label: 'Full name', type: 'text', required: true },
    { name: 'email', label: 'Email address', type: 'email', required: true },
    { name: 'phone', label: 'Phone number', type: 'tel' },
    {
      name: 'ministry_interest',
      label: 'Ministry area',
      type: 'select',
      required: true,
      options: siteContent.ministries.map((ministry) => ({
        label: ministry.name,
        value: ministry.name,
      })),
    },
    {
      name: 'serving_story',
      label: 'Tell us how you would like to serve',
      type: 'textarea',
      placeholder:
        'Share your skills, background, or the kind of team you are interested in joining.',
    },
  ]

  useDocumentMeta(
    'Ministries',
    'Explore church ministries, learn who each space serves, and submit interest in joining or serving.',
  )

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Ministries</p>
        <h1>Church life becomes personal when people find a place to belong</h1>
        <p>
          Each ministry exists to serve a real need, build community, and create
          practical ways for people to grow and contribute.
        </p>
      </section>

      <section className="content-section">
        <div className="card-grid three-up">
          {siteContent.ministries.map((ministry) => (
            <article className="surface-card" key={ministry.slug}>
              <p className="eyebrow">{ministry.audience}</p>
              <h3>{ministry.name}</h3>
              <p>{ministry.summary}</p>
              <div className="meta-stack">
                <span>{ministry.meetingTime}</span>
                <span>{ministry.leader}</span>
              </div>
              <Link className="text-link" to={`/ministries/${ministry.slug}`}>
                View ministry page
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section spotlight-grid">
        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Leadership connection</p>
            <h2>People who lead with care</h2>
          </div>
          <div className="stack-list">
            {siteContent.leaders.map((leader) => (
              <div className="detail-card" key={leader.email}>
                <div>
                  <strong>{leader.name}</strong>
                  <p>{leader.role}</p>
                </div>
                <a className="text-link" href={`mailto:${leader.email}`}>
                  Contact
                </a>
              </div>
            ))}
          </div>
        </article>

        <ExternalForm
          description="Let us know where you want to serve and a ministry leader will follow up with the best next step."
          fields={ministryJoinFields}
          integration={siteContent.forms.ministryJoin}
          submitLabel="Send ministry interest"
          title="Join a ministry"
        />
      </section>
    </>
  )
}
