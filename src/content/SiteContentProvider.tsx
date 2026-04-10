import {
  useEffect,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from 'react'

import {
  cmsReducer,
  createSiteContentContextValue,
  loadInitialCmsState,
  persistCmsState,
  SiteContentContext,
} from './siteContentStore'

export function SiteContentProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(cmsReducer, undefined, loadInitialCmsState)

  useEffect(() => {
    // Fetch initial content from Neon Database (Option B)
    async function fetchDatabaseContent() {
      try {
        const response = await fetch('http://localhost:3001/api/content')
        if (response.ok) {
          const content = await response.json()
          dispatch({ type: 'replace', nextContent: content })
        }
      } catch (error) {
        console.error('Failed to sync with Neon database:', error)
      }
    }
    
    fetchDatabaseContent()
  }, [])

  useEffect(() => {
    persistCmsState(state)
  }, [state])

  const value = useMemo(
    () => createSiteContentContextValue(state, dispatch),
    [state, dispatch],
  )

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  )
}
