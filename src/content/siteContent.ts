import type { SearchEntry, SiteContent } from '../types'

export const defaultSiteContent: SiteContent = {
  site: {
    name: 'Seattle International Church',
    shortName: 'Seattle International',
    heroTitle: 'SEATTLE INTERNATIONAL CHURCH',
    tagline: 'A place to worship, grow, and belong.',
    welcomeMessage:
      'A Christ-centered family serving the city with worship, prayer, biblical teaching, and compassionate community.',
    description:
      'A warm, mobile-first church website for first-time visitors, members, and ministry leaders.',
    address: '2410 Rainier Avenue South, Seattle, WA 98144',
    phone: '(206) 555-0146',
    email: 'hello@seattleinternational.church',
    officeHours: [
      'Tuesday to Thursday, 10:00 AM to 4:00 PM',
      'Friday, 10:00 AM to 2:00 PM',
    ],
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=2410+Rainier+Avenue+South,+Seattle,+WA+98144',
    mapEmbedUrl:
      'https://www.google.com/maps?q=2410+Rainier+Avenue+South,+Seattle,+WA+98144&output=embed',
    watchOnlineUrl: 'https://www.youtube.com/@seattleinternationalchurch',
    givingPortalUrl: 'https://secure.tithe.ly/give?c=0000000',
    socials: [
      {
        label: 'YouTube',
        url: 'https://www.youtube.com/@seattleinternationalchurch',
        handle: '@seattleinternationalchurch',
      },
      {
        label: 'Facebook',
        url: 'https://www.facebook.com/seattleinternationalchurch',
        handle: 'Seattle International Church',
      },
      {
        label: 'Instagram',
        url: 'https://www.instagram.com/seattleinternationalchurch',
        handle: '@seattleinternationalchurch',
      },
      {
        label: 'WhatsApp',
        url: 'https://wa.me/12065550146',
        handle: 'Prayer and care line',
      },
    ],
    serviceTimes: [
      {
        label: 'Sunday Worship',
        time: '9:00 AM',
        note: 'In person and online',
      },
      {
        label: 'Midweek Prayer',
        time: 'Wednesday 6:00 PM',
      },
      {
        label: 'Youth Gathering',
        time: 'Friday 7:00 PM',
      },
    ],
    trustSignals: [
      'Family friendly services with kids ministry check-in.',
      'Accessible venue with clear parking and welcome team support.',
      'Real people, clear contact details, and current weekly updates.',
    ],
  },
  pageSummaries: [
    {
      title: 'Home',
      description: 'The digital front door with service times and next steps.',
      path: '/',
    },
    {
      title: 'About',
      description: 'Mission, vision, values, statement of faith, and leadership.',
      path: '/about',
    },
    {
      title: 'Plan Your Visit',
      description: 'Everything a first-time guest needs before arriving.',
      path: '/plan-your-visit',
    },
    {
      title: 'Sermons',
      description: 'Recent teaching with series, speaker, scripture, and watch links.',
      path: '/sermons',
    },
    {
      title: 'Events',
      description: 'Upcoming church events with categories and action links.',
      path: '/events',
    },
    {
      title: 'Ministries',
      description: 'Ways to belong, serve, and grow across the church family.',
      path: '/ministries',
    },
    {
      title: 'Give',
      description: 'Secure giving options and stewardship information.',
      path: '/give',
    },
    {
      title: 'Contact',
      description: 'Call, email, visit, or send a general inquiry.',
      path: '/contact',
    },
    {
      title: 'Prayer Request',
      description: 'Share a prayer need privately and request follow-up.',
      path: '/prayer-request',
    },
  ],
  about: {
    mission:
      'To lead people into the presence of Jesus, build rooted disciples, and serve our city with practical love.',
    vision:
      'To be a welcoming, Spirit-filled church where every generation finds belonging, biblical formation, and purpose.',
    values: [
      'Jesus-centered worship that is heartfelt, reverent, and hope-filled.',
      'Biblical teaching that is practical, courageous, and life-giving.',
      'Hospitality that helps new people feel expected, not overlooked.',
      'Prayer that is consistent, compassionate, and full of faith.',
      'Service that equips every believer to use their gifts for others.',
    ],
    statementOfFaith: [
      'We believe the Bible is God-breathed, trustworthy, and the foundation for faith and life.',
      'We believe salvation is by grace through faith in Jesus Christ alone.',
      'We believe the Holy Spirit empowers holy living, bold witness, and loving service.',
      'We believe the church is a diverse family called to worship, disciple, and make disciples.',
    ],
    history: [
      'Seattle International Church began as a home prayer fellowship committed to worship, Bible teaching, and community care.',
      'As the church grew, it developed ministry spaces for children, youth, families, and outreach in the wider city.',
      'Today the church continues to pursue a simple vision: create a place where people can meet Jesus, grow strong in faith, and serve with joy.',
    ],
  },
  visitHighlights: [
    {
      title: 'What Sunday feels like',
      description:
        'Expect about 90 minutes of worship, prayer, Scripture reading, and a practical sermon with space to respond.',
    },
    {
      title: 'Kids are welcome',
      description:
        'Our children’s ministry team provides safe, joyful spaces for babies, children, and early teens during the main service.',
    },
    {
      title: 'Dress is relaxed',
      description:
        'Come as you are. Some people dress up, others keep it casual, and you will be warmly received either way.',
    },
    {
      title: 'Parking and arrival',
      description:
        'Free parking is available on-site and nearby, with welcome team members outside to guide first-time guests.',
    },
  ],
  leaders: [
    {
      name: 'Pastor Daniel Mbeki',
      role: 'Lead Pastor',
      bio: 'Daniel leads the preaching and discipleship life of the church with a strong emphasis on prayer, biblical clarity, and pastoral care.',
      focus: 'Sunday teaching, leadership development, and pastoral care',
      email: 'daniel@seattleinternational.church',
    },
    {
      name: 'Pastor Grace Mbeki',
      role: 'Executive Pastor',
      bio: 'Grace oversees ministries, volunteers, and the guest experience, helping the church feel organized, warm, and ready to receive people well.',
      focus: 'Operations, volunteer culture, and care ministries',
      email: 'grace@seattleinternational.church',
    },
    {
      name: 'Elder Samuel Reed',
      role: 'Community and Outreach Lead',
      bio: 'Samuel coordinates neighborhood outreach, small groups, and partnership initiatives that connect the church to the city in practical ways.',
      focus: 'Outreach strategy, groups, and member connection',
      email: 'samuel@seattleinternational.church',
    },
  ],
  ministries: [
    {
      slug: 'childrens-ministry',
      name: 'Children’s Ministry',
      audience: 'Infants to preteens',
      summary:
        'Safe, joyful, Bible-rich environments where children can meet Jesus and feel known.',
      description:
        'Our children’s ministry partners with parents to disciple children through worship, Scripture, small groups, and caring team leaders every Sunday.',
      meetingTime: 'Sundays during the 9:00 AM worship service',
      leader: 'Grace Mbeki',
      email: 'kids@seattleinternational.church',
      rhythm: [
        'Age-based classes and check-in support every Sunday',
        'Family dedication and parenting support moments during the year',
        'Volunteer screening and child safety standards for every team member',
      ],
      opportunities: [
        'Classroom support',
        'Check-in hospitality',
        'Family follow-up',
      ],
    },
    {
      slug: 'youth-ministry',
      name: 'Youth Ministry',
      audience: 'Middle school to college-age students',
      summary:
        'A place for young people to ask real questions, build friendships, and grow in bold faith.',
      description:
        'Youth nights blend worship, conversation, Bible teaching, mentorship, and service opportunities designed to help students belong and lead.',
      meetingTime: 'Fridays at 7:00 PM',
      leader: 'Samuel Reed',
      email: 'youth@seattleinternational.church',
      rhythm: [
        'Weekly youth gatherings on Friday evenings',
        'Monthly worship and testimony nights',
        'Quarterly service projects around the city',
      ],
      opportunities: ['Mentoring', 'Event support', 'Music and media'],
    },
    {
      slug: 'worship-ministry',
      name: 'Worship Ministry',
      audience: 'Singers, musicians, and production volunteers',
      summary:
        'A reverent and skillful team that helps the church respond to God with joy and unity.',
      description:
        'The worship ministry serves through music, prayer, media, and production, preparing spaces where the congregation can engage deeply with God.',
      meetingTime: 'Rehearsals on Thursdays, service call on Sundays',
      leader: 'Pastor Daniel Mbeki',
      email: 'worship@seattleinternational.church',
      rhythm: [
        'Thursday rehearsals for all serving teams',
        'Sunday morning prayer before service',
        'Creative planning for seasonal gatherings and conferences',
      ],
      opportunities: ['Vocals', 'Instruments', 'Audio', 'Projection'],
    },
    {
      slug: 'hospitality-ministry',
      name: 'Hospitality and Ushers',
      audience: 'Anyone with a heart for welcome and practical service',
      summary:
        'The first smiles people meet at the door and the steady support behind a smooth Sunday.',
      description:
        'This ministry creates calm, clear, and kind guest experiences from parking and seating to follow-up with newcomers after services.',
      meetingTime: 'Sundays from 8:00 AM',
      leader: 'Grace Mbeki',
      email: 'welcome@seattleinternational.church',
      rhythm: [
        'Sunday hosting teams for entrance, seating, and guest follow-up',
        'Monthly training huddles on hospitality and safety',
        'Guest care support for special services and conferences',
      ],
      opportunities: ['Greeters', 'Ushers', 'Welcome desk', 'Parking team'],
    },
    {
      slug: 'prayer-ministry',
      name: 'Prayer Ministry',
      audience: 'Members passionate about intercession and care',
      summary:
        'A steady prayer culture that covers the church, ministers to people, and responds with compassion.',
      description:
        'The prayer ministry leads weekly gatherings, altar response teams, and follow-up care for people carrying spiritual, emotional, or practical needs.',
      meetingTime: 'Wednesdays at 6:00 PM and after Sunday service',
      leader: 'Pastor Daniel Mbeki',
      email: 'prayer@seattleinternational.church',
      rhythm: [
        'Midweek prayer every Wednesday evening',
        'Prayer response team after Sunday worship',
        'Confidential follow-up for submitted requests',
      ],
      opportunities: ['Intercession', 'Care follow-up', 'Prayer room hosting'],
    },
    {
      slug: 'outreach-and-missions',
      name: 'Outreach and Missions',
      audience: 'Members who want to serve the neighborhood and beyond',
      summary:
        'Local compassion and gospel witness expressed through partnerships, service, and mission.',
      description:
        'This ministry coordinates community care drives, neighborhood prayer walks, and partnerships that help the church serve with consistency and humility.',
      meetingTime: 'Second Saturday of each month',
      leader: 'Samuel Reed',
      email: 'outreach@seattleinternational.church',
      rhythm: [
        'Monthly outreach Saturdays with prayer and service teams',
        'Partnership support for local shelters and schools',
        'Seasonal mission emphasis and generosity campaigns',
      ],
      opportunities: ['Prayer walks', 'Food distribution', 'Partnership care'],
    },
  ],
  sermons: [
    {
      slug: 'anchored-in-hope',
      title: 'Anchored in Hope',
      speaker: 'Pastor Daniel Mbeki',
      date: '2026-03-29',
      series: 'House of Hope',
      scripture: 'Hebrews 6:19-20',
      summary:
        'A call to hold fast to Christ when life feels uncertain and let hope reshape our witness in the city.',
      watchUrl: 'https://www.youtube.com/@seattleinternationalchurch',
      embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UC4R8DWoMoI7CAwX8_LjQHig',
      notesUrl: 'https://www.bible.com/bible/111/HEB.6.NIV',
    },
    {
      slug: 'grace-for-the-weary',
      title: 'Grace for the Weary',
      speaker: 'Pastor Grace Mbeki',
      date: '2026-03-22',
      series: 'House of Hope',
      scripture: 'Matthew 11:28-30',
      summary:
        'Jesus meets tired people with rest, mercy, and a better yoke than the pressure we carry alone.',
      watchUrl: 'https://www.youtube.com/@seattleinternationalchurch',
      notesUrl: 'https://www.bible.com/bible/111/MAT.11.NIV',
    },
    {
      slug: 'a-church-that-prays',
      title: 'A Church That Prays',
      speaker: 'Pastor Daniel Mbeki',
      date: '2026-03-15',
      series: 'House of Hope',
      scripture: 'Acts 4:23-31',
      summary:
        'Prayer is not a backup plan for the church. It is where courage, unity, and mission are born.',
      watchUrl: 'https://www.youtube.com/@seattleinternationalchurch',
      notesUrl: 'https://www.bible.com/bible/111/ACT.4.NIV',
    },
    {
      slug: 'formed-by-the-word',
      title: 'Formed by the Word',
      speaker: 'Elder Samuel Reed',
      date: '2026-03-08',
      series: 'Rooted',
      scripture: '2 Timothy 3:16-17',
      summary:
        'How Scripture shapes our convictions, our character, and our everyday decisions.',
      watchUrl: 'https://www.youtube.com/@seattleinternationalchurch',
      notesUrl: 'https://www.bible.com/bible/111/2TI.3.NIV',
    },
    {
      slug: 'people-of-hospitality',
      title: 'People of Hospitality',
      speaker: 'Pastor Grace Mbeki',
      date: '2026-03-01',
      series: 'Rooted',
      scripture: 'Romans 12:9-13',
      summary:
        'The gospel creates a people who make room for others with sincerity, generosity, and joy.',
      watchUrl: 'https://www.youtube.com/@seattleinternationalchurch',
      notesUrl: 'https://www.bible.com/bible/111/ROM.12.NIV',
    },
  ],
  events: [
    {
      slug: 'resurrection-sunday-celebration',
      title: 'Resurrection Sunday Celebration',
      category: 'Conference',
      start: '2026-04-12T09:00:00',
      end: '2026-04-12T12:00:00',
      location: 'Main Sanctuary',
      summary:
        'A joyful Easter gathering with worship, baptisms, family photo moments, and a welcome lunch for guests.',
      details: [
        'Main service at 9:00 AM with kids ministry open from check-in.',
        'Baptism celebration during the service for those publicly declaring faith.',
        'Guest lunch immediately after service in the fellowship hall.',
      ],
      actionLabel: 'Plan Your Visit',
      actionUrl: '/plan-your-visit',
      contactEmail: 'hello@seattleinternational.church',
    },
    {
      slug: 'city-prayer-night',
      title: 'City Prayer Night',
      category: 'Outreach',
      start: '2026-04-17T18:30:00',
      end: '2026-04-17T20:00:00',
      location: 'Prayer Chapel',
      summary:
        'An evening of worship and intercession for families, schools, neighborhoods, and city leaders.',
      details: [
        'Open to all ages with guided prayer points and space for personal ministry.',
        'Prayer team available for one-on-one support after the gathering.',
        'Light refreshments served in the foyer afterward.',
      ],
      actionLabel: 'Email the Prayer Team',
      actionUrl: 'mailto:prayer@seattleinternational.church',
      contactEmail: 'prayer@seattleinternational.church',
    },
    {
      slug: 'youth-worship-night',
      title: 'Youth Worship Night',
      category: 'Youth',
      start: '2026-04-24T19:00:00',
      end: '2026-04-24T21:00:00',
      location: 'Youth Hall',
      summary:
        'A Friday night designed for students with worship, testimonies, and a message about identity in Christ.',
      details: [
        'Bring a friend and arrive early for games and pizza.',
        'Parent pickup is at 9:00 PM from the front entrance.',
        'Youth leaders will share upcoming camp details during the night.',
      ],
      actionLabel: 'Contact Youth Ministry',
      actionUrl: 'mailto:youth@seattleinternational.church',
      contactEmail: 'youth@seattleinternational.church',
    },
    {
      slug: 'womens-breakfast',
      title: 'Women’s Breakfast and Prayer',
      category: 'Women',
      start: '2026-05-02T09:00:00',
      end: '2026-05-02T11:00:00',
      location: 'Community Room',
      summary:
        'A morning of conversation, encouragement, and prayer for women across every season of life.',
      details: [
        'Breakfast begins at 9:00 AM followed by testimonies and guided table prayer.',
        'Childcare is available with advance notice.',
        'Guests are welcome and registration helps us plan seating.',
      ],
      actionLabel: 'Register by Email',
      actionUrl: 'mailto:hello@seattleinternational.church?subject=Women%27s%20Breakfast%20Registration',
      contactEmail: 'hello@seattleinternational.church',
    },
    {
      slug: 'mens-breakfast-roundtable',
      title: 'Men’s Breakfast Roundtable',
      category: 'Men',
      start: '2026-05-09T08:00:00',
      end: '2026-05-09T10:00:00',
      location: 'Fellowship Hall',
      summary:
        'A practical conversation on discipleship, work, family, and spiritual leadership over breakfast.',
      details: [
        'Open to men of all ages with table discussions led by ministry leaders.',
        'Come ready for prayer, honest conversation, and next steps for serving.',
        'Friends and first-time guests are encouraged to attend.',
      ],
      actionLabel: 'Reserve a Seat',
      actionUrl: 'mailto:hello@seattleinternational.church?subject=Men%27s%20Breakfast%20Registration',
      contactEmail: 'hello@seattleinternational.church',
    },
    {
      slug: 'family-fun-day',
      title: 'Family Fun Day',
      category: 'Kids',
      start: '2026-05-16T11:00:00',
      end: '2026-05-16T14:00:00',
      location: 'Church Courtyard',
      summary:
        'Games, food, music, and simple moments for families to build friendships beyond Sunday morning.',
      details: [
        'Outdoor activities for children and relaxed seating for parents.',
        'Volunteer teams will host check-in, food service, and activity stations.',
        'This is a great first event for new families exploring the church.',
      ],
      actionLabel: 'Contact the Welcome Team',
      actionUrl: 'mailto:welcome@seattleinternational.church',
      contactEmail: 'welcome@seattleinternational.church',
    },
  ],
  giving: {
    intro:
      'Giving helps sustain worship, discipleship, care ministry, community outreach, and the practical needs of the church family.',
    options: [
      {
        title: 'Tithes and Offerings',
        summary:
          'Use the secure online giving portal for consistent weekly or monthly giving.',
        actionLabel: 'Give Securely',
        actionUrl: 'https://secure.tithe.ly/give?c=0000000',
        note: 'Replace this placeholder portal link with the church’s live giving account before launch.',
      },
      {
        title: 'Special Projects',
        summary:
          'Support missions, facility improvements, compassion outreaches, and seasonal ministry initiatives.',
        actionLabel: 'Support a Project',
        actionUrl: 'https://secure.tithe.ly/give?c=0000000',
        note: 'Project-specific funds can be configured in the hosted giving portal.',
      },
      {
        title: 'Bank or Mobile Giving',
        summary:
          'For members who prefer direct transfer or mobile giving, contact the finance team for secure details.',
        actionLabel: 'Email Finance Team',
        actionUrl: 'mailto:finance@seattleinternational.church',
        note: 'Use this option when card or portal giving is not the best fit.',
      },
    ],
    faqs: [
      {
        question: 'Is online giving secure?',
        answer:
          'Yes. Giving should route through a hosted provider with industry-standard payment security and a confirmation receipt.',
      },
      {
        question: 'Can I designate my gift?',
        answer:
          'Yes. The giving portal can be configured for general giving, missions, building projects, or other approved initiatives.',
      },
      {
        question: 'Will I receive a response if I have questions?',
        answer:
          'Yes. Use the finance contact path on this page and the church can respond with next steps or additional support.',
      },
    ],
  },
  forms: {
    visitor: {
      endpoint: 'https://formsubmit.co/ajax/hello@seattleinternational.church',
      subject: 'New Plan Your Visit submission',
      successMessage:
        'Thank you for planning your visit. A welcome team member will reach out shortly.',
    },
    contact: {
      endpoint: 'https://formsubmit.co/ajax/hello@seattleinternational.church',
      subject: 'General contact form submission',
      successMessage:
        'Your message has been sent. Someone from the church office will follow up soon.',
    },
    prayer: {
      endpoint: 'https://formsubmit.co/ajax/prayer@seattleinternational.church',
      subject: 'Confidential prayer request submission',
      successMessage:
        'Your prayer request has been received with care. Our prayer team will stand with you.',
    },
    ministryJoin: {
      endpoint: 'https://formsubmit.co/ajax/hello@seattleinternational.church',
      subject: 'Ministry interest form submission',
      successMessage:
        'Thanks for your interest in serving. A ministry leader will reach out with next steps.',
    },
  },
}

export function buildSearchIndex(siteContent: SiteContent): SearchEntry[] {
  return [
    ...siteContent.pageSummaries.map((page) => ({
      id: `page-${page.path === '/' ? 'home' : page.path.slice(1)}`,
      category: 'Page' as const,
      label: page.title,
      description: page.description,
      path: page.path,
    })),
    ...siteContent.sermons.map((sermon) => ({
      id: `sermon-${sermon.slug}`,
      category: 'Sermon' as const,
      label: sermon.title,
      description: `${sermon.series} • ${sermon.speaker} • ${sermon.scripture}`,
      path: `/sermons#sermon-${sermon.slug}`,
    })),
    ...siteContent.events.map((event) => ({
      id: `event-${event.slug}`,
      category: 'Event' as const,
      label: event.title,
      description: `${event.category} • ${event.location}`,
      path: `/events/${event.slug}`,
    })),
  ]
}
