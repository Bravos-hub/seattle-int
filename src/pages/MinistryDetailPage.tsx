import { Link, useParams } from 'react-router-dom'

import { ExternalForm, type FormField } from '../components/ExternalForm'
import { siteContent } from '../content/siteContent'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { NotFoundPage } from './NotFoundPage'

export function MinistryDetailPage() {
  const { slug } = useParams()
  const ministry = siteContent.ministries.find((item) => item.slug === slug)

  useDocumentMeta(
    ministry?.name ?? 'Ministry not found',
    ministry?.summary ?? 'The requested ministry page could not be found.',
  )

  if (!ministry) {
    return <NotFoundPage />
  }

  const fields: FormField[] = [
    { name: 'name', label: 'Full name', type: 'text', required: true },
    { name: 'email', label: 'Email address', type: 'email', required: true },
    { name: 'phone', label: 'Phone number', type: 'tel' },
    {
      name: 'message',
      label: 'Why are you interested?',
      type: 'textarea',
      placeholder: 'Tell the ministry leader a little about your interest and availability.',
    },
  ]

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">{ministry.audience}</p>
        <h1>{ministry.name}</h1>
        <p>{ministry.description}</p>
      </section>

      <section className="content-section spotlight-grid">
        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">Overview</p>
            <h2>What this ministry does</h2>
          </div>
          <p>{ministry.summary}</p>
          <div className="meta-stack">
            <span>{ministry.meetingTime}</span>
            <span>{ministry.leader}</span>
            <a href={`mailto:${ministry.email}`}>{ministry.email}</a>
          </div>
        </article>

        <article className="surface-card">
          <div className="section-heading">
            <p className="eyebrow">How it works</p>
            <h2>Rhythms and opportunities</h2>
          </div>
          <ul className="feature-list">
            {ministry.rhythm.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="pill-row">
            {ministry.opportunities.map((opportunity) => (
              <span className="pill static-pill" key={opportunity}>
                {opportunity}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="content-section">
        <ExternalForm
          description="Tell us you are interested and we will connect you directly to the ministry leader."
          fields={fields}
          hiddenValues={{ ministry: ministry.name }}
          integration={siteContent.forms.ministryJoin}
          submitLabel={`Join ${ministry.name}`}
          title="Serve with this ministry"
        />
      </section>

      <section className="content-section">
        <Link className="button button-ghost" to="/ministries">
          Back to all ministries
        </Link>
      </section>
    </>
  )
}
