import { useMemo, useState, useTransition, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

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

const adminTabs: { id: AdminTab; label: string; icon: ReactNode }[] = [
  { id: 'overview', label: 'Command Center', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
  { id: 'general', label: 'Site Identity', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { id: 'about', label: 'Story & Leaders', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
  { id: 'ministries', label: 'Ministries', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
  { id: 'sermons', label: 'Sermons', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { id: 'events', label: 'Events', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  { id: 'giving', label: 'Giving flow', icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
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
    <section className="bg-white border border-stone-200 shadow-sm mb-8 overflow-hidden">
      <div className="px-8 py-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
        <div>
          <h2 className="font-display font-bold text-stone-900 text-lg uppercase tracking-tight">{title}</h2>
          {description ? <p className="text-xs text-stone-400 mt-1 italic leading-relaxed">{description}</p> : null}
        </div>
        {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
      </div>
      <div className="p-8">
        {children}
      </div>
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
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pl-1">{label}</label>
      <input
        className="w-full bg-stone-50 border border-stone-100 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 text-sm rounded-sm px-4 py-2.5 outline-none transition-all placeholder:text-stone-300 italic"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
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
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pl-1">{label}</label>
      <textarea
        className="w-full bg-stone-50 border border-stone-100 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 text-sm rounded-sm px-4 py-2.5 outline-none transition-all placeholder:text-stone-300 italic"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        value={value}
      />
    </div>
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
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pl-1">{label}</label>
      <div className="relative">
        <select 
          className="w-full bg-stone-50 border border-stone-100 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 text-sm rounded-sm px-4 py-2.5 outline-none transition-all appearance-none italic text-stone-600"
          onChange={(event) => onChange(event.target.value)} 
          value={value}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-stone-300">
           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </span>
      </div>
    </div>
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
    <div className="flex flex-col gap-4 border border-stone-100 p-6 bg-stone-50/50">
      <div className="flex items-center justify-between px-1">
        <strong className="text-[10px] font-extrabold text-stone-900 uppercase tracking-[0.2em]">{label}</strong>
        <button
          className="text-[10px] font-bold text-primary-500 hover:text-stone-900 uppercase tracking-widest transition-colors flex items-center gap-1"
          onClick={() => onChange([...items, ''])}
          type="button"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          {addLabel}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div className="group flex gap-2" key={`${label}-${index}`}>
            <textarea
              className="flex-1 bg-white border border-stone-100 focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 text-xs rounded-sm px-3 py-2 outline-none transition-all placeholder:text-stone-300 italic"
              onChange={(event) =>
                onChange(updateArrayItem(items, index, event.target.value))
              }
              rows={2}
              value={item}
            />
            <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="p-1 text-stone-300 hover:text-stone-900 transition-colors disabled:opacity-30" disabled={index === 0} onClick={() => onChange(moveArrayItem(items, index, index - 1))} type="button">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
               </button>
               <button className="p-1 text-stone-300 hover:text-stone-900 transition-colors disabled:opacity-30" disabled={index === items.length - 1} onClick={() => onChange(moveArrayItem(items, index, index + 1))} type="button">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
               </button>
               <button className="p-1 text-red-300 hover:text-red-600 transition-colors" onClick={() => onChange(removeArrayItem(items, index))} type="button">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
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
    <div className="flex gap-1">
      <button className="p-1.5 bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition-colors disabled:opacity-30 rounded-sm" disabled={index === 0} onClick={onMoveUp} type="button">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
      </button>
      <button className="p-1.5 bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition-colors disabled:opacity-30 rounded-sm" disabled={index === total - 1} onClick={onMoveDown} type="button">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      <button className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 transition-colors rounded-sm ml-2" onClick={onRemove} type="button">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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
    'Changes save automatically. Export JSON when you want a portable snapshot.',
  )
  const [isPending, startTransition] = useTransition()

  useDocumentMeta(
    'Admin CMS',
    'Manage church pages, events, sermons, ministries, and site identity from your dashboard.',
  )

  const stats = useMemo(
    () => [
      { label: 'Sermons', value: String(content.sermons.length), color: 'text-blue-500' },
      { label: 'Events', value: String(content.events.length), color: 'text-orange-500' },
      { label: 'Ministries', value: String(content.ministries.length), color: 'text-emerald-500' },
      { label: 'Leaders', value: String(content.leaders.length), color: 'text-purple-500' },
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


  function handleDownloadExport() {
    const blob = new Blob([exportContent()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'seattle-int-content-snap.json'
    anchor.click()
    URL.revokeObjectURL(url)
    setStatusMessage('CMS export downloaded.')
  }

  function handleImport() {
    startTransition(() => {
      const result = importContent(importText)
      setStatusMessage(result.message)
      if (result.ok) setImportText('')
    })
  }

  async function publishToDatabase() {
    setStatusMessage('Syncing with Neon database...')
    try {
      const response = await fetch('http://localhost:3001/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      })

      const data = await response.json()
      if (response.ok) {
        setStatusMessage(`✅ ${data.message || 'Published successfully.'}`)
      } else {
        setStatusMessage(`❌ Error: ${data.error || 'Failed to sync'}`)
      }
    } catch {
      setStatusMessage('❌ Network error: Is the backend server running?')
    }
  }

  return (
    <div className="min-h-screen flex bg-stone-50 font-sans text-stone-800">
      
      {/* Sidebar - Command Center Theme */}
      <aside className="w-72 bg-[#0b162c] text-white flex flex-col fixed inset-y-0 z-30">
        <div className="p-8 pb-4">
           <p className="text-primary-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">Phase 2</p>
           <h1 className="font-display font-extrabold text-2xl tracking-tighter uppercase underline decoration-primary-500 decoration-2 underline-offset-8">Command Center</h1>
        </div>

        <div className="px-8 mt-12 flex-1">
           <nav className="flex flex-col gap-2">
              {adminTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 text-xs font-bold uppercase tracking-widest transition-all rounded-sm ${activeTab === tab.id ? 'bg-primary-500 text-white shadow-xl shadow-primary-500/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
           </nav>
        </div>

        <div className="p-8 border-t border-white/5 space-y-4">
           <Link className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 hover:bg-white/20 text-[10px] font-bold uppercase tracking-widest transition-colors rounded-sm" to="/">
             <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
             View live site
           </Link>
           <button onClick={() => { if(window.confirm('Restore default phase 1 state?')) restoreDefaults() }} className="w-full text-center text-[10px] text-red-400/50 hover:text-red-400 underline uppercase tracking-widest font-bold transition-colors">
              Restore Defaults
           </button>
        </div>
      </aside>

      <main className="flex-1 ml-72">
        {/* Header Bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-stone-200 px-10 py-6 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                 System: <span className="text-stone-900">Auto-saved</span> 
                 <span className="mx-3 opacity-20">|</span> 
                 Last sync: <span className="text-stone-900">{lastSavedAt ? new Date(lastSavedAt).toLocaleTimeString() : 'Ready'}</span>
              </p>
           </div>
           <div className="flex gap-4">
              <button 
                onClick={publishToDatabase}
                className="px-4 py-2 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-700 transition-colors rounded-sm shadow-lg shadow-emerald-500/10"
              >
                Publish Live
              </button>
              <button 
                onClick={handleDownloadExport}
                className="px-4 py-2 bg-primary-500 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-600 transition-colors rounded-sm shadow-lg shadow-primary-500/10"
              >
                Download JSON
              </button>
           </div>
        </header>

        <div className="p-10 max-w-6xl mx-auto">
          {/* Active Status Alert */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-medium mb-10 flex items-center gap-3 rounded-sm italic"
          >
             <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             {statusMessage}
          </motion.div>

          <AnimatePresence mode="wait">
             {activeTab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="overview">
                   <header className="mb-12">
                      <p className="text-primary-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-2 pl-1">Command Center</p>
                      <h2 className="font-display font-bold text-4xl text-stone-900 mb-4">Hello, Seattle International Church.</h2>
                      <p className="text-stone-500 text-sm italic font-medium">Site content is current and running on production.</p>
                   </header>

                   <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                      {stats.map((stat) => (
                        <article key={stat.label} className="bg-white p-8 border border-stone-100 shadow-sm flex flex-col items-center group">
                           <strong className={`text-4xl font-extrabold mb-2 ${stat.color} group-hover:scale-110 transition-transform`}>{stat.value}</strong>
                           <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{stat.label}</span>
                        </article>
                      ))}
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                      <div className="bg-[#0b162c] p-10 text-white rounded-sm overflow-hidden relative isolate">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 translate-x-12 translate-y-[-12px] rotate-45 pointer-events-none" />
                         <p className="text-primary-500 font-bold text-[10px] uppercase tracking-widest mb-2">Live Preview</p>
                         <h3 className="font-display text-2xl font-bold mb-6">Current Hero Focus</h3>
                         <div className="p-6 bg-white/5 border border-white/10 rounded-sm mb-8 italic">
                            <p className="text-white/80">"{content.site.heroTitle}"</p>
                         </div>
                         <button onClick={() => setActiveTab('general')} className="px-6 py-3 bg-white text-stone-900 font-bold text-[10px] uppercase tracking-widest hover:bg-stone-100 transition-colors">Edit Home Hero</button>
                      </div>

                      <div className="bg-white border border-stone-200 p-10 flex flex-col justify-center gap-8">
                          <div>
                             <h3 className="font-display text-2xl font-bold text-stone-900 mb-2 uppercase tracking-tight">Import State</h3>
                             <p className="text-stone-400 text-xs italic">Paste a portable content snapshot to override current state.</p>
                          </div>
                          <textarea 
                            onChange={(e) => setImportText(e.target.value)} 
                            value={importText}
                            placeholder="Paste JSON content here..."
                            className="bg-stone-50 border border-stone-100 p-4 text-xs italic outline-none focus:ring-1 focus:ring-primary-500/20"
                            rows={3}
                          />
                          <button 
                            onClick={handleImport}
                            disabled={!importText.trim() || isPending}
                            className="w-full py-4 bg-stone-900 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-stone-800 transition-colors disabled:opacity-30"
                          >
                             {isPending ? 'Syncing...' : 'Sync Snapshot'}
                          </button>
                      </div>
                   </div>

                   <AdminSection title="Latest Sermon Preview" description="How the latest message appears on the homepage and archive.">
                      <div className="flex gap-8 items-center bg-stone-50 p-6 rounded-sm border border-stone-100">
                         <div className="w-32 h-32 bg-stone-900 shrink-0 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                         </div>
                         <div>
                            <h4 className="font-display text-xl font-bold text-stone-900 mb-1">{content.sermons[0]?.title}</h4>
                            <p className="text-stone-400 text-xs font-medium uppercase tracking-widest mb-4">{content.sermons[0]?.speaker} • {content.sermons[0]?.series}</p>
                            <button onClick={() => setActiveTab('sermons')} className="text-primary-500 text-[10px] font-extrabold uppercase tracking-widest hover:text-stone-900 transition-colors border-b border-primary-500/20 pb-1">Edit all sermons →</button>
                         </div>
                      </div>
                   </AdminSection>
                </motion.div>
             )}

             {activeTab === 'general' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="general">
                   <AdminSection 
                     title="Global Site Identity" 
                     description="Manage branding, hero content, and core contact information."
                   >
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <AdminField label="Church name" onChange={(v) => patchContent(d => { d.site.name = v })} value={content.site.name} />
                       <AdminField label="Short name" onChange={(v) => patchContent(d => { d.site.shortName = v })} value={content.site.shortName} />
                       <AdminField label="Hero title" onChange={(v) => patchContent(d => { d.site.heroTitle = v })} value={content.site.heroTitle} />
                       <AdminField label="Tagline" onChange={(v) => patchContent(d => { d.site.tagline = v })} value={content.site.tagline} />
                       <AdminField label="Phone" onChange={(v) => patchContent(d => { d.site.phone = v })} value={content.site.phone} />
                       <AdminField label="Email" onChange={(v) => patchContent(d => { d.site.email = v })} value={content.site.email} />
                       <AdminField label="Address" onChange={(v) => patchContent(d => { d.site.address = v })} value={content.site.address} />
                       <AdminField label="Directions URL" onChange={(v) => patchContent(d => { d.site.directionsUrl = v })} value={content.site.directionsUrl} />
                       <AdminField label="Map embed URL" onChange={(v) => patchContent(d => { d.site.mapEmbedUrl = v })} value={content.site.mapEmbedUrl} />
                       <AdminField label="Watch online URL" onChange={(v) => patchContent(d => { d.site.watchOnlineUrl = v })} value={content.site.watchOnlineUrl} />
                       <AdminField label="Giving portal URL" onChange={(v) => patchContent(d => { d.site.givingPortalUrl = v })} value={content.site.givingPortalUrl} />
                       <AdminTextarea label="Welcome message" onChange={(v) => patchContent(d => { d.site.welcomeMessage = v })} rows={5} value={content.site.welcomeMessage} />
                     </div>
                   </AdminSection>

                   <AdminSection title="Service Schedule">
                      <div className="flex flex-col gap-6">
                         {content.site.serviceTimes.map((time, index) => (
                           <div key={index} className="flex gap-8 group bg-stone-50 p-8 border border-stone-100">
                             <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <AdminField label="Label" onChange={v => patchContent(d => { d.site.serviceTimes[index].label = v })} value={time.label} />
                                <AdminField label="Time" onChange={v => patchContent(d => { d.site.serviceTimes[index].time = v })} value={time.time} />
                                <AdminField label="Note" onChange={v => patchContent(d => { d.site.serviceTimes[index].note = v ?? '' })} value={time.note ?? ''} />
                             </div>
                             <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center pt-4">
                                <RepeaterControls 
                                  index={index} 
                                  total={content.site.serviceTimes.length}
                                  onMoveUp={() => patchContent(d => { d.site.serviceTimes = moveArrayItem(d.site.serviceTimes, index, index - 1) })}
                                  onMoveDown={() => patchContent(d => { d.site.serviceTimes = moveArrayItem(d.site.serviceTimes, index, index + 1) })}
                                  onRemove={() => patchContent(d => { d.site.serviceTimes = removeArrayItem(d.site.serviceTimes, index) })}
                                />
                             </div>
                           </div>
                         ))}
                         <button onClick={() => patchContent(d => { d.site.serviceTimes.push({ label: '', time: '', note: '' }) })} className="py-4 border border-dashed border-stone-300 text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:border-primary-500 hover:text-primary-500 transition-all">Add Service Time</button>
                      </div>
                   </AdminSection>

                   <AdminSection title="Quick Link Lists">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <StringListEditor addLabel="Add hour" items={content.site.officeHours} label="Office Hours" onChange={v => patchContent(d => { d.site.officeHours = v })} />
                         <StringListEditor addLabel="Add social" items={content.site.socials.map(s => `${s.label}|${s.url}`)} label="Social List (Label|URL)" onChange={v => patchContent(d => { d.site.socials = v.map(str => { const [label, url] = str.split('|'); return { label, url, handle: '' } }) })} />
                      </div>
                   </AdminSection>

                   <AdminSection title="What to Expect Highlights" description="These highlights appear on the 'Plan Your Visit' page.">
                      <div className="flex flex-col gap-6">
                         {content.visitHighlights.map((high, index) => (
                           <div key={index} className="flex gap-8 group bg-stone-50 p-8 border border-stone-100">
                             <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AdminField label="Title" onChange={v => patchContent(d => { d.visitHighlights[index].title = v })} value={high.title} />
                                <AdminField label="Summary" onChange={v => patchContent(d => { d.visitHighlights[index].description = v })} value={high.description} />
                             </div>
                             <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center pt-4">
                                <RepeaterControls 
                                  index={index} 
                                  total={content.visitHighlights.length}
                                  onMoveUp={() => patchContent(d => { d.visitHighlights = moveArrayItem(d.visitHighlights, index, index - 1) })}
                                  onMoveDown={() => patchContent(d => { d.visitHighlights = moveArrayItem(d.visitHighlights, index, index + 1) })}
                                  onRemove={() => patchContent(d => { d.visitHighlights = removeArrayItem(d.visitHighlights, index) })}
                                />
                             </div>
                           </div>
                         ))}
                         <button onClick={() => patchContent(d => { d.visitHighlights.push({ title: '', description: '' }) })} className="py-4 border border-dashed border-stone-300 text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:border-primary-500 hover:text-primary-500 transition-all">Add Highlight</button>
                      </div>
                   </AdminSection>
                </motion.div>
             )}

             {activeTab === 'about' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="about">
                    <AdminSection title="Editorial Story" description="Manage the church's mission, vision, and core theological beliefs.">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <AdminTextarea label="Mission Statement" onChange={v => patchContent(d => { d.about.mission = v })} rows={5} value={content.about.mission} />
                          <AdminTextarea label="Vision Statement" onChange={v => patchContent(d => { d.about.vision = v })} rows={5} value={content.about.vision} />
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <StringListEditor addLabel="Add value" items={content.about.values} label="Core Values" onChange={v => patchContent(d => { d.about.values = v })} />
                          <StringListEditor addLabel="Add belief" items={content.about.statementOfFaith} label="Statement of Faith" onChange={v => patchContent(d => { d.about.statementOfFaith = v })} />
                          <StringListEditor addLabel="Add event" items={content.about.history} label="Church History Timeline" onChange={v => patchContent(d => { d.about.history = v })} />
                       </div>
                    </AdminSection>

                    <AdminSection title="Leadership Directory">
                        <div className="flex flex-col gap-6">
                           {content.leaders.map((leader, index) => (
                             <div key={index} className="flex flex-col group bg-stone-50 p-8 border border-stone-100 relative">
                                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <RepeaterControls 
                                      index={index} 
                                      total={content.leaders.length}
                                      onMoveUp={() => patchContent(d => { d.leaders = moveArrayItem(d.leaders, index, index - 1) })}
                                      onMoveDown={() => patchContent(d => { d.leaders = moveArrayItem(d.leaders, index, index + 1) })}
                                      onRemove={() => patchContent(d => { d.leaders = removeArrayItem(d.leaders, index) })}
                                   />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                                   <AdminField label="Full Name" onChange={v => patchContent(d => { d.leaders[index].name = v })} value={leader.name} />
                                   <AdminField label="Official Role" onChange={v => patchContent(d => { d.leaders[index].role = v })} value={leader.role} />
                                   <AdminField label="Primary Focus" onChange={v => patchContent(d => { d.leaders[index].focus = v })} value={leader.focus} />
                                   <AdminField label="Contact Email" onChange={v => patchContent(d => { d.leaders[index].email = v })} value={leader.email} />
                                </div>
                                <AdminTextarea label="Professional Bio" onChange={v => patchContent(d => { d.leaders[index].bio = v })} rows={3} value={leader.bio} />
                             </div>
                           ))}
                           <button onClick={() => patchContent(d => { d.leaders.push({ name: '', role: '', bio: '', focus: '', email: '' }) })} className="py-4 border border-dashed border-stone-300 text-[10px] font-bold text-stone-400 uppercase tracking-widest hover:border-primary-500 hover:text-primary-500 transition-all">Add Staff Member</button>
                        </div>
                    </AdminSection>
                </motion.div>
             )}

             {activeTab === 'sermons' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="sermons">
                   <AdminSection 
                     title="Sermon Repository" 
                     description="Archive of all teaching series. Latest added sermon appears as featured on the site."
                     actions={
                        <button onClick={() => patchContent(d => { d.sermons.unshift({ slug: '', title: '', speaker: '', date: '', series: '', scripture: '', summary: '', watchUrl: '', embedUrl: '', notesUrl: '' }) })} className="px-6 py-2.5 bg-primary-500 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-600 transition-colors rounded-sm shadow-lg shadow-primary-500/10">Add Sermon</button>
                     }
                   >
                      <div className="flex flex-col gap-6">
                        {content.sermons.map((sermon, index) => (
                           <div key={index} className="flex flex-col group bg-stone-50 border border-stone-100 relative">
                               <div className="flex items-center justify-between px-8 py-4 border-b border-stone-100 bg-stone-100/30">
                                  <div className="flex items-center gap-3">
                                     <span className="w-1.5 h-1.5 bg-primary-500"></span>
                                     <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest">{sermon.title || 'Untitled Message'}</h4>
                                  </div>
                                  <RepeaterControls 
                                      index={index} 
                                      total={content.sermons.length}
                                      onMoveUp={() => patchContent(d => { d.sermons = moveArrayItem(d.sermons, index, index - 1) })}
                                      onMoveDown={() => patchContent(d => { d.sermons = moveArrayItem(d.sermons, index, index + 1) })}
                                      onRemove={() => patchContent(d => { d.sermons = removeArrayItem(d.sermons, index) })}
                                   />
                               </div>
                               <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                                     <AdminField label="Message Title" onChange={v => patchContent(d => { d.sermons[index].title = v; if(!d.sermons[index].slug) d.sermons[index].slug = slugify(v) })} value={sermon.title} />
                                     <AdminField label="URL Slug" onChange={v => patchContent(d => { d.sermons[index].slug = slugify(v) })} value={sermon.slug} />
                                     <AdminField label="Speaker" onChange={v => patchContent(d => { d.sermons[index].speaker = v })} value={sermon.speaker} />
                                     <AdminField label="Series Name" onChange={v => patchContent(d => { d.sermons[index].series = v })} value={sermon.series} />
                                     <AdminField label="Published Date" onChange={v => patchContent(d => { d.sermons[index].date = v })} type="date" value={sermon.date} />
                                     <AdminField label="Scripture Ref" onChange={v => patchContent(d => { d.sermons[index].scripture = v })} value={sermon.scripture} />
                                  </div>
                                  <div className="space-y-4">
                                     <AdminField label="Watch URL (YouTube)" onChange={v => patchContent(d => { d.sermons[index].watchUrl = v })} value={sermon.watchUrl} />
                                     <AdminField label="Embed URL" onChange={v => patchContent(d => { d.sermons[index].embedUrl = v })} value={sermon.embedUrl ?? ''} />
                                     <AdminField label="PDF Notes URL" onChange={v => patchContent(d => { d.sermons[index].notesUrl = v })} value={sermon.notesUrl ?? ''} />
                                  </div>
                                  <div className="md:col-span-3">
                                     <AdminTextarea label="Executive Summary / Blurb" onChange={v => patchContent(d => { d.sermons[index].summary = v })} rows={3} value={sermon.summary} />
                                  </div>
                               </div>
                           </div>
                        ))}
                      </div>
                   </AdminSection>
                </motion.div>
             )}

             {activeTab === 'events' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="events">
                    <AdminSection 
                      title="Event Calendar" 
                      description="Manage conferences, outreach, and local church gatherings."
                      actions={
                        <button onClick={() => patchContent(d => { d.events.push({ slug: '', title: '', category: 'Conference', start: '', end: '', location: '', summary: '', details: [''], actionLabel: 'Register', actionUrl: '', contactEmail: '' }) })} className="px-6 py-2.5 bg-primary-500 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-600 transition-colors rounded-sm shadow-lg shadow-primary-500/10">Create Event</button>
                      }
                    >
                      <div className="flex flex-col gap-6">
                        {content.events.map((event, index) => (
                           <div key={index} className="flex flex-col group bg-stone-50 border border-stone-100 relative">
                               <div className="flex items-center justify-between px-8 py-4 border-b border-stone-100 bg-stone-100/30">
                                  <div className="flex items-center gap-3">
                                     <span className="px-2 py-0.5 bg-stone-900 text-white text-[8px] font-bold uppercase tracking-widest">{event.category}</span>
                                     <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest">{event.title || 'Untitled Event'}</h4>
                                  </div>
                                  <RepeaterControls 
                                      index={index} 
                                      total={content.events.length}
                                      onMoveUp={() => patchContent(d => { d.events = moveArrayItem(d.events, index, index - 1) })}
                                      onMoveDown={() => patchContent(d => { d.events = moveArrayItem(d.events, index, index + 1) })}
                                      onRemove={() => patchContent(d => { d.events = removeArrayItem(d.events, index) })}
                                   />
                               </div>
                               <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                                     <AdminField label="Event Title" onChange={v => patchContent(d => { d.events[index].title = v; if(!d.events[index].slug) d.events[index].slug = slugify(v) })} value={event.title} />
                                     <AdminSelectField label="Category" onChange={v => patchContent(d => { d.events[index].category = v as Exclude<EventCategory, 'All'> })} options={['Conference', 'Kids', 'Men', 'Women', 'Youth', 'Outreach']} value={event.category} />
                                     <AdminField label="Start Time (ISO)" onChange={v => patchContent(d => { d.events[index].start = v })} type="datetime-local" value={event.start} />
                                     <AdminField label="End Time (ISO)" onChange={v => patchContent(d => { d.events[index].end = v })} type="datetime-local" value={event.end ?? ''} />
                                     <AdminField label="Location" onChange={v => patchContent(d => { d.events[index].location = v })} value={event.location} />
                                     <AdminField label="Action URL" onChange={v => patchContent(d => { d.events[index].actionUrl = v })} value={event.actionUrl} />
                                     <AdminField label="Action Label" onChange={v => patchContent(d => { d.events[index].actionLabel = v })} value={event.actionLabel} />
                                     <AdminField label="Contact Email" onChange={v => patchContent(d => { d.events[index].contactEmail = v })} value={event.contactEmail} />
                                  </div>
                                  <div className="md:col-span-3 grid grid-cols-1 gap-8 pt-4">
                                     <AdminTextarea label="Short Summary" onChange={v => patchContent(d => { d.events[index].summary = v })} rows={2} value={event.summary} />
                                     <StringListEditor addLabel="Add detail line" items={event.details} label="Event Details / Features" onChange={v => patchContent(d => { d.events[index].details = v })} />
                                  </div>
                               </div>
                           </div>
                        ))}
                      </div>
                    </AdminSection>
                </motion.div>
             )}

             {activeTab === 'ministries' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="ministries">
                    <AdminSection 
                      title="Ministry Directory" 
                      description="Edit active ministries, leaders, and meeting rhythms."
                      actions={
                        <button onClick={() => patchContent(d => { d.ministries.push({ slug: '', name: '', audience: '', summary: '', description: '', meetingTime: '', leader: '', email: '', rhythm: [''], opportunities: [''] }) })} className="px-6 py-2.5 bg-primary-500 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-primary-600 transition-colors rounded-sm shadow-lg shadow-primary-500/10">Add Ministry</button>
                      }
                    >
                      <div className="flex flex-col gap-8">
                        {content.ministries.map((min, index) => (
                           <div key={index} className="flex flex-col group bg-stone-50 border border-stone-100 relative">
                               <div className="flex items-center justify-between px-8 py-4 border-b border-stone-100 bg-stone-100/30">
                                  <div className="flex items-center gap-3">
                                     <span className="w-1.5 h-1.5 bg-[#0b162c]"></span>
                                     <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest">{min.name || 'New Ministry'}</h4>
                                  </div>
                                  <RepeaterControls 
                                      index={index} 
                                      total={content.ministries.length}
                                      onMoveUp={() => patchContent(d => { d.ministries = moveArrayItem(d.ministries, index, index - 1) })}
                                      onMoveDown={() => patchContent(d => { d.ministries = moveArrayItem(d.ministries, index, index + 1) })}
                                      onRemove={() => patchContent(d => { d.ministries = removeArrayItem(d.ministries, index) })}
                                   />
                               </div>
                               <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                  <AdminField label="Ministry Name" onChange={v => patchContent(d => { d.ministries[index].name = v; if(!d.ministries[index].slug) d.ministries[index].slug = slugify(v) })} value={min.name} />
                                  <AdminField label="Audience/Scope" onChange={v => patchContent(d => { d.ministries[index].audience = v })} value={min.audience} />
                                  <AdminField label="Leader Name" onChange={v => patchContent(d => { d.ministries[index].leader = v })} value={min.leader} />
                                  <AdminField label="Leader Email" onChange={v => patchContent(d => { d.ministries[index].email = v })} value={min.email} />
                                  <AdminField label="Meeting Schedule" onChange={v => patchContent(d => { d.ministries[index].meetingTime = v })} value={min.meetingTime} />
                                  <AdminField label="URL Slug" onChange={v => patchContent(d => { d.ministries[index].slug = slugify(v) })} value={min.slug} />
                                  <div className="md:col-span-2">
                                     <AdminTextarea label="Core Summary" onChange={v => patchContent(d => { d.ministries[index].summary = v })} rows={2} value={min.summary} />
                                     <div className="mt-8"/>
                                     <AdminTextarea label="Deep Description" onChange={v => patchContent(d => { d.ministries[index].description = v })} rows={5} value={min.description} />
                                  </div>
                                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 mt-4 border-t border-stone-200 pt-8">
                                     <StringListEditor addLabel="Add activity" items={min.rhythm} label="Ministry Rhythm" onChange={v => patchContent(d => { d.ministries[index].rhythm = v })} />
                                     <StringListEditor addLabel="Add role" items={min.opportunities} label="Serving Needs" onChange={v => patchContent(d => { d.ministries[index].opportunities = v })} />
                                  </div>
                               </div>
                           </div>
                        ))}
                      </div>
                    </AdminSection>
                </motion.div>
             )}

             {activeTab === 'giving' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key="giving">
                    <AdminSection title="Giving & Financial flow" description="Control giving endpoints and trust messaging.">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-8">
                             <AdminField label="Giving Portal (Global Link)" onChange={v => patchContent(d => { d.site.givingPortalUrl = v })} value={content.site.givingPortalUrl} />
                             <StringListEditor addLabel="Add trust pillar" items={content.site.trustSignals} label="Financial Trust Signals" onChange={v => patchContent(d => { d.site.trustSignals = v })} />
                          </div>
                          <div className="p-8 bg-stone-900 text-white flex flex-col items-center justify-center text-center">
                             <div className="w-12 h-12 bg-primary-500 rounded-full mb-6 flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                             </div>
                             <h4 className="font-display text-xl font-bold mb-2">Giving Strategy</h4>
                             <p className="text-white/40 text-[10px] leading-relaxed italic">Changes here update the 'Give Online' buttons across the entire platform instantly.</p>
                          </div>
                       </div>
                    </AdminSection>

                    <AdminSection title="Page Metadata Overview" description="Manage SEO titles and descriptions for navigation routes.">
                        <div className="grid grid-cols-1 gap-6">
                           {content.pageSummaries.map((page, index) => (
                             <div key={page.path} className="p-8 border border-stone-100 bg-white">
                                <div className="flex items-baseline gap-4 mb-6 italic">
                                   <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-none">Route</span>
                                   <span className="text-stone-900 font-bold text-sm leading-none">{page.path}</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                   <AdminField label="Meta Title" onChange={v => patchContent(d => { d.pageSummaries[index].title = v })} value={page.title} />
                                   <AdminTextarea label="Meta Description" onChange={v => patchContent(d => { d.pageSummaries[index].description = v })} rows={2} value={page.description} />
                                </div>
                             </div>
                           ))}
                        </div>
                    </AdminSection>
                </motion.div>
             )}
          </AnimatePresence>
        </div>

        <footer className="p-10 border-t border-stone-200 mt-24 text-center">
           <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest italic">
              Seattle International Church Management System • Powered by Bravos Hub
           </p>
        </footer>
      </main>
    </div>
  )
}
