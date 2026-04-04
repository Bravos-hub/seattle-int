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
    persistCmsState(state)
  }, [state])

  const value = useMemo(
    () => createSiteContentContextValue(state, dispatch),
    [state],
  )

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  )
}
