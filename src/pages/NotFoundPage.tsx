import { Link } from 'react-router-dom'

import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function NotFoundPage() {
  useDocumentMeta(
    'Page not found',
    'The page you requested could not be found. Return to the homepage or browse the main church pages.',
  )

  return (
    <section className="page-hero">
      <p className="eyebrow">404</p>
      <h1>We could not find that page</h1>
      <p>The link may have moved. Use the homepage or the main navigation to continue.</p>
      <div className="button-row">
        <Link className="button button-primary" to="/">
          Back home
        </Link>
        <Link className="button button-ghost" to="/contact">
          Contact the church
        </Link>
      </div>
    </section>
  )
}
