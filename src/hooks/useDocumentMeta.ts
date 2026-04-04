import { useEffect } from 'react'

import { useSiteContent } from '../content/siteContentStore'

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attrs).forEach(([key, value]) => {
    element?.setAttribute(key, value)
  })
}

export function useDocumentMeta(title: string, description: string) {
  const siteContent = useSiteContent()

  useEffect(() => {
    const fullTitle = `${title} | ${siteContent.site.name}`
    document.title = fullTitle

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: description,
    })

    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: fullTitle,
    })

    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    })
  }, [description, siteContent.site.name, title])
}
