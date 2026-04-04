export type EventCategory =
  | 'All'
  | 'Youth'
  | 'Women'
  | 'Men'
  | 'Kids'
  | 'Conference'
  | 'Outreach'

export type SearchCategory = 'Page' | 'Sermon' | 'Event'

export interface PageSummary {
  title: string
  description: string
  path: string
}

export interface ServiceTime {
  label: string
  time: string
  note?: string
}

export interface SocialLink {
  label: string
  url: string
  handle: string
}

export interface Leader {
  name: string
  role: string
  bio: string
  focus: string
  email: string
}

export interface Ministry {
  slug: string
  name: string
  audience: string
  summary: string
  description: string
  meetingTime: string
  leader: string
  email: string
  rhythm: string[]
  opportunities: string[]
}

export interface Sermon {
  slug: string
  title: string
  speaker: string
  date: string
  series: string
  scripture: string
  summary: string
  watchUrl: string
  embedUrl?: string
  notesUrl?: string
}

export interface EventItem {
  slug: string
  title: string
  category: Exclude<EventCategory, 'All'>
  start: string
  end?: string
  location: string
  summary: string
  details: string[]
  actionLabel: string
  actionUrl: string
  contactEmail: string
}

export interface GivingOption {
  title: string
  summary: string
  actionLabel: string
  actionUrl: string
  note: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface FormIntegration {
  endpoint: string
  subject: string
  successMessage: string
}

export interface SearchEntry {
  id: string
  category: SearchCategory
  label: string
  description: string
  path: string
}

export interface SiteContent {
  site: {
    name: string
    shortName: string
    heroTitle: string
    tagline: string
    welcomeMessage: string
    description: string
    address: string
    phone: string
    email: string
    officeHours: string[]
    directionsUrl: string
    mapEmbedUrl: string
    watchOnlineUrl: string
    givingPortalUrl: string
    socials: SocialLink[]
    serviceTimes: ServiceTime[]
    trustSignals: string[]
  }
  pageSummaries: PageSummary[]
  about: {
    mission: string
    vision: string
    values: string[]
    statementOfFaith: string[]
    history: string[]
  }
  visitHighlights: {
    title: string
    description: string
  }[]
  leaders: Leader[]
  ministries: Ministry[]
  sermons: Sermon[]
  events: EventItem[]
  giving: {
    intro: string
    options: GivingOption[]
    faqs: FaqItem[]
  }
  forms: {
    visitor: FormIntegration
    contact: FormIntegration
    prayer: FormIntegration
    ministryJoin: FormIntegration
  }
}
