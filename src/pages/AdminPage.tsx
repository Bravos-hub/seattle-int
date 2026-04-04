import { useMemo, useState, useTransition, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { useCmsController } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import type { EventCategory, SiteContent } from '../types'

type AdminTab =
  | 'overview'
  | 'general'
  | 'about'
  | 'ministries'
  | 'sermons'
  | 'events'
  | 'giving'

const adminTabs: { id: AdminTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'general', label: 'General' },
  { id: 'about', label: 'About + Leaders' },
  { id: 'ministries', label: 'Ministries' },
  { id: 'sermons', label: 'Sermons' },
  { id: 'events', label: 'Events' },
  { id: 'giving', label: 'Giving + Forms' },
]

const eventCategories: Exclude<EventCategory, 'All'>[] = [
  'Youth',
  'Women',
  'Men',
  'Kids',
  'Conference',
  'Outreach',
]

function updateArrayItem<T>(items: T[], index: number, nextItem: T) {
  return items.map((item, itemIndex) => (itemIndex === index ? nextItem : item))
}

function removeArrayItem<T>(items: T[], index: number) {
  return items.filter((_, itemIndex) => itemIndex !== index)
}

function moveArrayItem<T>(items: T[], fromIndex: number, toIndex: number) {
  if (toIndex < 0 || toIndex >= items.length) {
    return items
  }

  const next = [...items]
  const [item] = next.splice(fromIndex, 1)
  next.splice(toIndex, 0, item)
  return next
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function formatSavedAt(value: string | null) {
  if (!value) {
    return 'Not saved yet'
  }

  return new Date(value).toLocaleString()
}

function downloadJson(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

function AdminSection({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {actions ? <div className="admin-inline-actions">{actions}</div> : null}
      </div>
      {children}
    </section>
  )
}

function AdminField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <input
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  )
}

function AdminTextarea({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  rows?: number
  placeholder?: string
}) {
  return (
    <label className="admin-field admin-field-full">
      <span>{label}</span>
      <textarea
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        value={value}
      />
    </label>
  )
}

function AdminSelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <select onChange={(event) => onChange(event.target.value)} value={value}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function StringListEditor({
  label,
  items,
  onChange,
  addLabel,
}: {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  addLabel: string
}) {
  return (
    <div className="admin-list-editor">
      <div className="admin-list-header">
        <strong>{label}</strong>
        <button
          className="button button-ghost"
          onClick={() => onChange([...items, ''])}
          type="button"
        >
          {addLabel}
        </button>
      </div>

      <div className="admin-list-stack">
        {items.map((item, index) => (
          <div className="admin-list-row" key={`${label}-${index}`}>
            <textarea
              onChange={(event) =>
                onChange(updateArrayItem(items, index, event.target.value))
              }
              rows={3}
              value={item}
            />
            <div className="admin-item-controls">
              <button
                className="button button-ghost"
                disabled={index === 0}
                onClick={() => onChange(moveArrayItem(items, index, index - 1))}
                type="button"
              >
                Up
              </button>
              <button
                className="button button-ghost"
                disabled={index === items.length - 1}
                onClick={() => onChange(moveArrayItem(items, index, index + 1))}
                type="button"
              >
                Down
              </button>
              <button
                className="button button-ghost danger-button"
                onClick={() => onChange(removeArrayItem(items, index))}
                type="button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RepeaterControls({
  index,
  total,
  onMoveUp,
  onMoveDown,
  onRemove,
}: {
  index: number
  total: number
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
}) {
  return (
    <div className="admin-item-controls">
      <button className="button button-ghost" disabled={index === 0} onClick={onMoveUp} type="button">
        Up
      </button>
      <button
        className="button button-ghost"
        disabled={index === total - 1}
        onClick={onMoveDown}
        type="button"
      >
        Down
      </button>
      <button className="button button-ghost danger-button" onClick={onRemove} type="button">
        Remove
      </button>
    </div>
  )
}

export function AdminPage() {
  const {
    content,
    exportContent,
    importContent,
    lastSavedAt,
    restoreDefaults,
    updateContent,
  } = useCmsController()
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')
  const [importText, setImportText] = useState('')
  const [statusMessage, setStatusMessage] = useState(
    'Changes save automatically in this browser. Export JSON when you want a shareable snapshot.',
  )
  const [isPending, startTransition] = useTransition()

  useDocumentMeta(
    'Admin CMS',
    'Manage church pages, events, sermons, ministries, leaders, giving, and form integrations from one dashboard.',
  )

  const stats = useMemo(
    () => [
      { label: 'Pages', value: String(content.pageSummaries.length) },
      { label: 'Sermons', value: String(content.sermons.length) },
      { label: 'Events', value: String(content.events.length) },
      { label: 'Ministries', value: String(content.ministries.length) },
      { label: 'Leaders', value: String(content.leaders.length) },
    ],
    [content],
  )

  function patchContent(mutator: (draft: SiteContent) => void) {
    updateContent((current) => {
      const draft = structuredClone(current)
      mutator(draft)
      return draft
    })
  }

  async function handleCopyExport() {
    try {
      await navigator.clipboard.writeText(exportContent())
      setStatusMessage('CMS export copied to clipboard.')
    } catch {
      setStatusMessage('Clipboard copy failed. Use Download JSON instead.')
    }
  }

  function handleDownloadExport() {
    downloadJson('seattle-international-site-content.json', exportContent())
    setStatusMessage('CMS export downloaded as JSON.')
  }

  function handleImport() {
    startTransition(() => {
      const result = importContent(importText)
      setStatusMessage(result.message)

      if (result.ok) {
        setImportText('')
      }
    })
  }

  function handleRestoreDefaults() {
    if (
      !window.confirm(
        'Restore the default Phase 1 content? This will replace the current browser-saved CMS data.',
      )
    ) {
      return
    }

    startTransition(() => {
      restoreDefaults()
      setStatusMessage('Default Phase 1 content restored successfully.')
    })
  }

  return (
    <div className="admin-page">
      <div className="admin-layout">
        <aside className="admin-sidebar surface-card">
          <div className="admin-brand">
            <p className="eyebrow">Phase 2</p>
            <h1>Admin CMS</h1>
            <p>Manage the public website from one workspace and see updates on the live frontend immediately.</p>
          </div>

          <div className="admin-status">
            <span className="admin-badge">Auto-saved</span>
            <span>Last saved: {formatSavedAt(lastSavedAt)}</span>
          </div>

          <nav className="admin-tab-list">
            {adminTabs.map((tab) => (
              <button
                className={`admin-tab${activeTab === tab.id ? ' is-active' : ''}`}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="admin-sidebar-actions">
            <Link className="button button-secondary" to="/">
              View live site
            </Link>
            <button className="button button-ghost" onClick={handleCopyExport} type="button">
              Copy JSON
            </button>
            <button className="button button-ghost" onClick={handleDownloadExport} type="button">
              Download JSON
            </button>
            <button className="button button-ghost danger-button" onClick={handleRestoreDefaults} type="button">
              Restore defaults
            </button>
          </div>
        </aside>

        <main className="admin-main">
          <section className="admin-hero surface-card">
            <div>
              <p className="eyebrow">CMS foundation</p>
              <h2>All public content is editable from here</h2>
              <p>{statusMessage}</p>
            </div>
            <div className="admin-stats">
              {stats.map((stat) => (
                <article className="admin-stat-card" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </section>

          {activeTab === 'overview' ? (
            <>
              <AdminSection
                description="Paste a previously exported content snapshot to replace the current browser-saved CMS state."
                title="Import content"
              >
                <div className="admin-grid">
                  <AdminTextarea
                    label="Imported JSON"
                    onChange={setImportText}
                    placeholder="Paste exported site content JSON here"
                    rows={10}
                    value={importText}
                  />
                </div>
                <div className="admin-inline-actions">
                  <button
                    className="button button-primary"
                    disabled={!importText.trim() || isPending}
                    onClick={handleImport}
                    type="button"
                  >
                    {isPending ? 'Importing...' : 'Import JSON'}
                  </button>
                </div>
              </AdminSection>

              <AdminSection
                description="This CMS is local-browser powered. For production multi-user editing, connect this layer to real auth and a backend CMS or database."
                title="How this admin works"
              >
                <div className="admin-grid three-column">
                  <article className="surface-card admin-note-card">
                    <h3>Live preview</h3>
                    <p>Changes here update the public routes immediately in the same browser session.</p>
                  </article>
                  <article className="surface-card admin-note-card">
                    <h3>Persistence</h3>
                    <p>Content is auto-saved into browser local storage and survives reloads on this device.</p>
                  </article>
                  <article className="surface-card admin-note-card">
                    <h3>Portability</h3>
                    <p>Use export/import JSON to move content snapshots between environments or preserve approved versions.</p>
                  </article>
                </div>
              </AdminSection>
            </>
          ) : null}

          {activeTab === 'general' ? (
            <>
              <AdminSection
                description="These settings control global branding, homepage identity, address, and core church contact information."
                title="Site identity and contact"
              >
                <div className="admin-grid">
                  <AdminField label="Church name" onChange={(value) => patchContent((draft) => { draft.site.name = value })} value={content.site.name} />
                  <AdminField label="Short name" onChange={(value) => patchContent((draft) => { draft.site.shortName = value })} value={content.site.shortName} />
                  <AdminField label="Hero title" onChange={(value) => patchContent((draft) => { draft.site.heroTitle = value })} value={content.site.heroTitle} />
                  <AdminField label="Tagline" onChange={(value) => patchContent((draft) => { draft.site.tagline = value })} value={content.site.tagline} />
                  <AdminField label="Phone" onChange={(value) => patchContent((draft) => { draft.site.phone = value })} value={content.site.phone} />
                  <AdminField label="Email" onChange={(value) => patchContent((draft) => { draft.site.email = value })} value={content.site.email} />
                  <AdminField label="Address" onChange={(value) => patchContent((draft) => { draft.site.address = value })} value={content.site.address} />
                  <AdminField label="Directions URL" onChange={(value) => patchContent((draft) => { draft.site.directionsUrl = value })} value={content.site.directionsUrl} />
                  <AdminField label="Map embed URL" onChange={(value) => patchContent((draft) => { draft.site.mapEmbedUrl = value })} value={content.site.mapEmbedUrl} />
                  <AdminField label="Watch online URL" onChange={(value) => patchContent((draft) => { draft.site.watchOnlineUrl = value })} value={content.site.watchOnlineUrl} />
                  <AdminField label="Giving portal URL" onChange={(value) => patchContent((draft) => { draft.site.givingPortalUrl = value })} value={content.site.givingPortalUrl} />
                  <AdminTextarea label="Welcome message" onChange={(value) => patchContent((draft) => { draft.site.welcomeMessage = value })} rows={5} value={content.site.welcomeMessage} />
                  <AdminTextarea label="Site description" onChange={(value) => patchContent((draft) => { draft.site.description = value })} rows={4} value={content.site.description} />
                </div>
              </AdminSection>

              <AdminSection title="Lists and quick links">
                <div className="admin-grid two-column">
                  <StringListEditor
                    addLabel="Add office hour"
                    items={content.site.officeHours}
                    label="Office hours"
                    onChange={(items) => patchContent((draft) => { draft.site.officeHours = items })}
                  />
                  <StringListEditor
                    addLabel="Add trust signal"
                    items={content.site.trustSignals}
                    label="Trust signals"
                    onChange={(items) => patchContent((draft) => { draft.site.trustSignals = items })}
                  />
                </div>
              </AdminSection>

              <AdminSection
                actions={
                  <button className="button button-ghost" onClick={() => patchContent((draft) => {
                    draft.site.serviceTimes.push({ label: '', time: '', note: '' })
                  })} type="button">
                    Add service time
                  </button>
                }
                title="Service times"
              >
                <div className="admin-repeater">
                  {content.site.serviceTimes.map((time, index) => (
                    <article className="surface-card admin-card" key={`${time.label}-${index}`}>
                      <RepeaterControls
                        index={index}
                        onMoveDown={() => patchContent((draft) => {
                          draft.site.serviceTimes = moveArrayItem(draft.site.serviceTimes, index, index + 1)
                        })}
                        onMoveUp={() => patchContent((draft) => {
                          draft.site.serviceTimes = moveArrayItem(draft.site.serviceTimes, index, index - 1)
                        })}
                        onRemove={() => patchContent((draft) => {
                          draft.site.serviceTimes = removeArrayItem(draft.site.serviceTimes, index)
                        })}
                        total={content.site.serviceTimes.length}
                      />
                      <div className="admin-grid">
                        <AdminField label="Label" onChange={(value) => patchContent((draft) => { draft.site.serviceTimes[index].label = value })} value={time.label} />
                        <AdminField label="Time" onChange={(value) => patchContent((draft) => { draft.site.serviceTimes[index].time = value })} value={time.time} />
                        <AdminField label="Note" onChange={(value) => patchContent((draft) => { draft.site.serviceTimes[index].note = value })} value={time.note ?? ''} />
                      </div>
                    </article>
                  ))}
                </div>
              </AdminSection>

              <AdminSection
                actions={
                  <button className="button button-ghost" onClick={() => patchContent((draft) => {
                    draft.site.socials.push({ label: '', handle: '', url: '' })
                  })} type="button">
                    Add social link
                  </button>
                }
                title="Social links"
              >
                <div className="admin-repeater">
                  {content.site.socials.map((social, index) => (
                    <article className="surface-card admin-card" key={`${social.label}-${index}`}>
                      <RepeaterControls
                        index={index}
                        onMoveDown={() => patchContent((draft) => {
                          draft.site.socials = moveArrayItem(draft.site.socials, index, index + 1)
                        })}
                        onMoveUp={() => patchContent((draft) => {
                          draft.site.socials = moveArrayItem(draft.site.socials, index, index - 1)
                        })}
                        onRemove={() => patchContent((draft) => {
                          draft.site.socials = removeArrayItem(draft.site.socials, index)
                        })}
                        total={content.site.socials.length}
                      />
                      <div className="admin-grid">
                        <AdminField label="Label" onChange={(value) => patchContent((draft) => { draft.site.socials[index].label = value })} value={social.label} />
                        <AdminField label="Handle or subtitle" onChange={(value) => patchContent((draft) => { draft.site.socials[index].handle = value })} value={social.handle} />
                        <AdminField label="URL" onChange={(value) => patchContent((draft) => { draft.site.socials[index].url = value })} value={social.url} />
                      </div>
                    </article>
                  ))}
                </div>
              </AdminSection>

              <AdminSection title="Homepage visit highlights">
                <div className="admin-repeater">
                  {content.visitHighlights.map((highlight, index) => (
                    <article className="surface-card admin-card" key={`${highlight.title}-${index}`}>
                      <RepeaterControls
                        index={index}
                        onMoveDown={() => patchContent((draft) => {
                          draft.visitHighlights = moveArrayItem(draft.visitHighlights, index, index + 1)
                        })}
                        onMoveUp={() => patchContent((draft) => {
                          draft.visitHighlights = moveArrayItem(draft.visitHighlights, index, index - 1)
                        })}
                        onRemove={() => patchContent((draft) => {
                          draft.visitHighlights = removeArrayItem(draft.visitHighlights, index)
                        })}
                        total={content.visitHighlights.length}
                      />
                      <div className="admin-grid">
                        <AdminField label="Title" onChange={(value) => patchContent((draft) => { draft.visitHighlights[index].title = value })} value={highlight.title} />
                        <AdminTextarea label="Description" onChange={(value) => patchContent((draft) => { draft.visitHighlights[index].description = value })} rows={4} value={highlight.description} />
                      </div>
                    </article>
                  ))}
                </div>
                <button className="button button-ghost" onClick={() => patchContent((draft) => {
                  draft.visitHighlights.push({ title: '', description: '' })
                })} type="button">
                  Add visit highlight
                </button>
              </AdminSection>

              <AdminSection title="Page labels and descriptions">
                <div className="admin-repeater">
                  {content.pageSummaries.map((page, index) => (
                    <article className="surface-card admin-card" key={page.path}>
                      <p className="admin-static-label">Route path</p>
                      <p className="admin-static-value">{page.path}</p>
                      <div className="admin-grid">
                        <AdminField label="Navigation label" onChange={(value) => patchContent((draft) => { draft.pageSummaries[index].title = value })} value={page.title} />
                        <AdminTextarea label="Description" onChange={(value) => patchContent((draft) => { draft.pageSummaries[index].description = value })} rows={3} value={page.description} />
                      </div>
                    </article>
                  ))}
                </div>
              </AdminSection>
            </>
          ) : null}

          {activeTab === 'about' ? (
            <>
              <AdminSection title="About page copy">
                <div className="admin-grid">
                  <AdminTextarea label="Mission" onChange={(value) => patchContent((draft) => { draft.about.mission = value })} rows={4} value={content.about.mission} />
                  <AdminTextarea label="Vision" onChange={(value) => patchContent((draft) => { draft.about.vision = value })} rows={4} value={content.about.vision} />
                </div>
                <div className="admin-grid two-column">
                  <StringListEditor addLabel="Add core value" items={content.about.values} label="Core values" onChange={(items) => patchContent((draft) => { draft.about.values = items })} />
                  <StringListEditor addLabel="Add belief statement" items={content.about.statementOfFaith} label="Statement of faith" onChange={(items) => patchContent((draft) => { draft.about.statementOfFaith = items })} />
                </div>
                <StringListEditor addLabel="Add history entry" items={content.about.history} label="History timeline" onChange={(items) => patchContent((draft) => { draft.about.history = items })} />
              </AdminSection>

              <AdminSection
                actions={
                  <button className="button button-ghost" onClick={() => patchContent((draft) => {
                    draft.leaders.push({ name: '', role: '', bio: '', focus: '', email: '' })
                  })} type="button">
                    Add leader
                  </button>
                }
                title="Leadership team"
              >
                <div className="admin-repeater">
                  {content.leaders.map((leader, index) => (
                    <article className="surface-card admin-card" key={`${leader.email}-${index}`}>
                      <RepeaterControls
                        index={index}
                        onMoveDown={() => patchContent((draft) => {
                          draft.leaders = moveArrayItem(draft.leaders, index, index + 1)
                        })}
                        onMoveUp={() => patchContent((draft) => {
                          draft.leaders = moveArrayItem(draft.leaders, index, index - 1)
                        })}
                        onRemove={() => patchContent((draft) => {
                          draft.leaders = removeArrayItem(draft.leaders, index)
                        })}
                        total={content.leaders.length}
                      />
                      <div className="admin-grid">
                        <AdminField label="Name" onChange={(value) => patchContent((draft) => { draft.leaders[index].name = value })} value={leader.name} />
                        <AdminField label="Role" onChange={(value) => patchContent((draft) => { draft.leaders[index].role = value })} value={leader.role} />
                        <AdminField label="Email" onChange={(value) => patchContent((draft) => { draft.leaders[index].email = value })} value={leader.email} />
                        <AdminField label="Primary focus" onChange={(value) => patchContent((draft) => { draft.leaders[index].focus = value })} value={leader.focus} />
                        <AdminTextarea label="Bio" onChange={(value) => patchContent((draft) => { draft.leaders[index].bio = value })} rows={5} value={leader.bio} />
                      </div>
                    </article>
                  ))}
                </div>
              </AdminSection>
            </>
          ) : null}

          {activeTab === 'ministries' ? (
            <AdminSection
              actions={
                <button className="button button-ghost" onClick={() => patchContent((draft) => {
                  draft.ministries.push({
                    slug: '',
                    name: '',
                    audience: '',
                    summary: '',
                    description: '',
                    meetingTime: '',
                    leader: '',
                    email: '',
                    rhythm: [''],
                    opportunities: [''],
                  })
                })} type="button">
                  Add ministry
                </button>
              }
              title="Ministries CMS"
            >
              <div className="admin-repeater">
                {content.ministries.map((ministry, index) => (
                  <article className="surface-card admin-card" key={`${ministry.slug}-${index}`}>
                    <RepeaterControls
                      index={index}
                      onMoveDown={() => patchContent((draft) => {
                        draft.ministries = moveArrayItem(draft.ministries, index, index + 1)
                      })}
                      onMoveUp={() => patchContent((draft) => {
                        draft.ministries = moveArrayItem(draft.ministries, index, index - 1)
                      })}
                      onRemove={() => patchContent((draft) => {
                        draft.ministries = removeArrayItem(draft.ministries, index)
                      })}
                      total={content.ministries.length}
                    />
                    <div className="admin-grid">
                      <AdminField
                        label="Name"
                        onChange={(value) =>
                          patchContent((draft) => {
                            draft.ministries[index].name = value
                            if (!draft.ministries[index].slug) {
                              draft.ministries[index].slug = slugify(value)
                            }
                          })
                        }
                        value={ministry.name}
                      />
                      <AdminField label="Slug" onChange={(value) => patchContent((draft) => { draft.ministries[index].slug = slugify(value) })} value={ministry.slug} />
                      <AdminField label="Audience" onChange={(value) => patchContent((draft) => { draft.ministries[index].audience = value })} value={ministry.audience} />
                      <AdminField label="Leader" onChange={(value) => patchContent((draft) => { draft.ministries[index].leader = value })} value={ministry.leader} />
                      <AdminField label="Leader email" onChange={(value) => patchContent((draft) => { draft.ministries[index].email = value })} value={ministry.email} />
                      <AdminField label="Meeting time" onChange={(value) => patchContent((draft) => { draft.ministries[index].meetingTime = value })} value={ministry.meetingTime} />
                      <AdminTextarea label="Summary" onChange={(value) => patchContent((draft) => { draft.ministries[index].summary = value })} rows={4} value={ministry.summary} />
                      <AdminTextarea label="Description" onChange={(value) => patchContent((draft) => { draft.ministries[index].description = value })} rows={5} value={ministry.description} />
                    </div>
                    <div className="admin-grid two-column">
                      <StringListEditor addLabel="Add rhythm" items={ministry.rhythm} label="Rhythm and activities" onChange={(items) => patchContent((draft) => { draft.ministries[index].rhythm = items })} />
                      <StringListEditor addLabel="Add opportunity" items={ministry.opportunities} label="Serving opportunities" onChange={(items) => patchContent((draft) => { draft.ministries[index].opportunities = items })} />
                    </div>
                  </article>
                ))}
              </div>
            </AdminSection>
          ) : null}

          {activeTab === 'sermons' ? (
            <AdminSection
              actions={
                <button className="button button-ghost" onClick={() => patchContent((draft) => {
                  draft.sermons.unshift({
                    slug: '',
                    title: '',
                    speaker: '',
                    date: '',
                    series: '',
                    scripture: '',
                    summary: '',
                    watchUrl: '',
                    embedUrl: '',
                    notesUrl: '',
                  })
                })} type="button">
                  Add sermon
                </button>
              }
              title="Sermons CMS"
            >
              <div className="admin-repeater">
                {content.sermons.map((sermon, index) => (
                  <article className="surface-card admin-card" key={`${sermon.slug}-${index}`}>
                    <RepeaterControls
                      index={index}
                      onMoveDown={() => patchContent((draft) => {
                        draft.sermons = moveArrayItem(draft.sermons, index, index + 1)
                      })}
                      onMoveUp={() => patchContent((draft) => {
                        draft.sermons = moveArrayItem(draft.sermons, index, index - 1)
                      })}
                      onRemove={() => patchContent((draft) => {
                        draft.sermons = removeArrayItem(draft.sermons, index)
                      })}
                      total={content.sermons.length}
                    />
                    <div className="admin-grid">
                      <AdminField label="Title" onChange={(value) => patchContent((draft) => { draft.sermons[index].title = value })} value={sermon.title} />
                      <AdminField label="Slug" onChange={(value) => patchContent((draft) => { draft.sermons[index].slug = slugify(value) })} value={sermon.slug} />
                      <AdminField label="Speaker" onChange={(value) => patchContent((draft) => { draft.sermons[index].speaker = value })} value={sermon.speaker} />
                      <AdminField label="Series" onChange={(value) => patchContent((draft) => { draft.sermons[index].series = value })} value={sermon.series} />
                      <AdminField label="Date" onChange={(value) => patchContent((draft) => { draft.sermons[index].date = value })} type="date" value={sermon.date} />
                      <AdminField label="Scripture" onChange={(value) => patchContent((draft) => { draft.sermons[index].scripture = value })} value={sermon.scripture} />
                      <AdminField label="Watch URL" onChange={(value) => patchContent((draft) => { draft.sermons[index].watchUrl = value })} value={sermon.watchUrl} />
                      <AdminField label="Embed URL" onChange={(value) => patchContent((draft) => { draft.sermons[index].embedUrl = value })} value={sermon.embedUrl ?? ''} />
                      <AdminField label="Notes URL" onChange={(value) => patchContent((draft) => { draft.sermons[index].notesUrl = value })} value={sermon.notesUrl ?? ''} />
                      <AdminTextarea label="Summary" onChange={(value) => patchContent((draft) => { draft.sermons[index].summary = value })} rows={4} value={sermon.summary} />
                    </div>
                  </article>
                ))}
              </div>
            </AdminSection>
          ) : null}

          {activeTab === 'events' ? (
            <AdminSection
              actions={
                <button className="button button-ghost" onClick={() => patchContent((draft) => {
                  draft.events.push({
                    slug: '',
                    title: '',
                    category: 'Conference',
                    start: '',
                    end: '',
                    location: '',
                    summary: '',
                    details: [''],
                    actionLabel: '',
                    actionUrl: '',
                    contactEmail: '',
                  })
                })} type="button">
                  Add event
                </button>
              }
              title="Events CMS"
            >
              <div className="admin-repeater">
                {content.events.map((event, index) => (
                  <article className="surface-card admin-card" key={`${event.slug}-${index}`}>
                    <RepeaterControls
                      index={index}
                      onMoveDown={() => patchContent((draft) => {
                        draft.events = moveArrayItem(draft.events, index, index + 1)
                      })}
                      onMoveUp={() => patchContent((draft) => {
                        draft.events = moveArrayItem(draft.events, index, index - 1)
                      })}
                      onRemove={() => patchContent((draft) => {
                        draft.events = removeArrayItem(draft.events, index)
                      })}
                      total={content.events.length}
                    />
                    <div className="admin-grid">
                      <AdminField label="Title" onChange={(value) => patchContent((draft) => { draft.events[index].title = value })} value={event.title} />
                      <AdminField label="Slug" onChange={(value) => patchContent((draft) => { draft.events[index].slug = slugify(value) })} value={event.slug} />
                      <AdminSelectField label="Category" onChange={(value) => patchContent((draft) => { draft.events[index].category = value as Exclude<EventCategory, 'All'> })} options={eventCategories} value={event.category} />
                      <AdminField label="Start" onChange={(value) => patchContent((draft) => { draft.events[index].start = value })} placeholder="2026-04-12T09:00:00" value={event.start} />
                      <AdminField label="End" onChange={(value) => patchContent((draft) => { draft.events[index].end = value })} placeholder="2026-04-12T12:00:00" value={event.end ?? ''} />
                      <AdminField label="Location" onChange={(value) => patchContent((draft) => { draft.events[index].location = value })} value={event.location} />
                      <AdminField label="Action label" onChange={(value) => patchContent((draft) => { draft.events[index].actionLabel = value })} value={event.actionLabel} />
                      <AdminField label="Action URL" onChange={(value) => patchContent((draft) => { draft.events[index].actionUrl = value })} value={event.actionUrl} />
                      <AdminField label="Contact email" onChange={(value) => patchContent((draft) => { draft.events[index].contactEmail = value })} value={event.contactEmail} />
                      <AdminTextarea label="Summary" onChange={(value) => patchContent((draft) => { draft.events[index].summary = value })} rows={4} value={event.summary} />
                    </div>
                    <StringListEditor addLabel="Add event detail" items={event.details} label="Detail bullets" onChange={(items) => patchContent((draft) => { draft.events[index].details = items })} />
                  </article>
                ))}
              </div>
            </AdminSection>
          ) : null}

          {activeTab === 'giving' ? (
            <>
              <AdminSection title="Giving page">
                <AdminTextarea label="Giving intro" onChange={(value) => patchContent((draft) => { draft.giving.intro = value })} rows={5} value={content.giving.intro} />
                <div className="admin-repeater">
                  {content.giving.options.map((option, index) => (
                    <article className="surface-card admin-card" key={`${option.title}-${index}`}>
                      <RepeaterControls
                        index={index}
                        onMoveDown={() => patchContent((draft) => {
                          draft.giving.options = moveArrayItem(draft.giving.options, index, index + 1)
                        })}
                        onMoveUp={() => patchContent((draft) => {
                          draft.giving.options = moveArrayItem(draft.giving.options, index, index - 1)
                        })}
                        onRemove={() => patchContent((draft) => {
                          draft.giving.options = removeArrayItem(draft.giving.options, index)
                        })}
                        total={content.giving.options.length}
                      />
                      <div className="admin-grid">
                        <AdminField label="Title" onChange={(value) => patchContent((draft) => { draft.giving.options[index].title = value })} value={option.title} />
                        <AdminField label="Action label" onChange={(value) => patchContent((draft) => { draft.giving.options[index].actionLabel = value })} value={option.actionLabel} />
                        <AdminField label="Action URL" onChange={(value) => patchContent((draft) => { draft.giving.options[index].actionUrl = value })} value={option.actionUrl} />
                        <AdminTextarea label="Summary" onChange={(value) => patchContent((draft) => { draft.giving.options[index].summary = value })} rows={4} value={option.summary} />
                        <AdminTextarea label="Note" onChange={(value) => patchContent((draft) => { draft.giving.options[index].note = value })} rows={4} value={option.note} />
                      </div>
                    </article>
                  ))}
                </div>
                <button className="button button-ghost" onClick={() => patchContent((draft) => {
                  draft.giving.options.push({ title: '', summary: '', actionLabel: '', actionUrl: '', note: '' })
                })} type="button">
                  Add giving option
                </button>
              </AdminSection>

              <AdminSection title="Giving FAQ">
                <div className="admin-repeater">
                  {content.giving.faqs.map((faq, index) => (
                    <article className="surface-card admin-card" key={`${faq.question}-${index}`}>
                      <RepeaterControls
                        index={index}
                        onMoveDown={() => patchContent((draft) => {
                          draft.giving.faqs = moveArrayItem(draft.giving.faqs, index, index + 1)
                        })}
                        onMoveUp={() => patchContent((draft) => {
                          draft.giving.faqs = moveArrayItem(draft.giving.faqs, index, index - 1)
                        })}
                        onRemove={() => patchContent((draft) => {
                          draft.giving.faqs = removeArrayItem(draft.giving.faqs, index)
                        })}
                        total={content.giving.faqs.length}
                      />
                      <div className="admin-grid">
                        <AdminField label="Question" onChange={(value) => patchContent((draft) => { draft.giving.faqs[index].question = value })} value={faq.question} />
                        <AdminTextarea label="Answer" onChange={(value) => patchContent((draft) => { draft.giving.faqs[index].answer = value })} rows={4} value={faq.answer} />
                      </div>
                    </article>
                  ))}
                </div>
                <button className="button button-ghost" onClick={() => patchContent((draft) => {
                  draft.giving.faqs.push({ question: '', answer: '' })
                })} type="button">
                  Add FAQ item
                </button>
              </AdminSection>

              <AdminSection title="Form integrations">
                <div className="admin-repeater">
                  {Object.entries(content.forms).map(([key, form]) => (
                    <article className="surface-card admin-card" key={key}>
                      <p className="admin-static-label">Form</p>
                      <p className="admin-static-value">{key}</p>
                      <div className="admin-grid">
                        <AdminField label="Endpoint" onChange={(value) => patchContent((draft) => { draft.forms[key as keyof SiteContent['forms']].endpoint = value })} value={form.endpoint} />
                        <AdminField label="Email subject" onChange={(value) => patchContent((draft) => { draft.forms[key as keyof SiteContent['forms']].subject = value })} value={form.subject} />
                        <AdminTextarea label="Success message" onChange={(value) => patchContent((draft) => { draft.forms[key as keyof SiteContent['forms']].successMessage = value })} rows={4} value={form.successMessage} />
                      </div>
                    </article>
                  ))}
                </div>
              </AdminSection>
            </>
          ) : null}
        </main>
      </div>
    </div>
  )
}
