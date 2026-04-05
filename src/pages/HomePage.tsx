import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'

import { useSiteContent } from '../content/siteContentStore'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { formatDate } from '../lib/formatters'

// Helper for animations
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

export function HomePage() {
  const siteContent = useSiteContent()
  useDocumentMeta(
    'Welcome',
    'Join our community. A place to worship, grow, and belong.'
  )


  const featuredSermons = siteContent.sermons.slice(0, 3)

  // A manual mapping over services section to replicate the design grid.
  // Using generic terms inspired by the layout picture combined with ministry data.
  const mappedServices = [
    { title: 'Weekly Services', desc: 'Join us every Saturday for powerful worship.' },
    { title: 'Youth', desc: 'A vibrant community for middle and high school students.' },
    { title: 'Kids', desc: 'Safe, fun environments for children to learn about faith.' },
    { title: 'Special Events', desc: 'Gatherings that bring our entire church family together.' },
    { title: 'Counseling', desc: 'Biblical guidance for life\'s toughest challenges.' },
    { title: 'Benevolence', desc: 'Meeting practical needs within our local community.' }
  ]

  return (
    <div className="flex flex-col bg-white overflow-hidden pb-12">

      {/* 1. Deep Blue Hero */}
      <section className="relative w-full pt-48 pb-64 flex flex-col justify-center min-h-[60vh] md:min-h-[80vh] bg-[#0b162c] text-white isolate">
        <img
          src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2600&auto=format&fit=crop"
          alt="Worship scene"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
        />
        {/* Gradient overlay to match dark blue base */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b162c]/90 via-[#0b162c]/60 to-transparent pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.15 }}
            className="max-w-3xl flex flex-col items-center gap-4 mx-auto"
          >
            <motion.p variants={fadeInUp} className="text-white/60 tracking-[0.2em] text-xs font-bold uppercase mb-2">
              WELCOME TO OUR CHURCH
            </motion.p>
            <motion.h1 variants={fadeInUp} className="font-display font-bold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-4 text-center">
              {siteContent.site.heroTitle}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mb-8 text-center">
              {siteContent.site.welcomeMessage}
            </motion.p>
          </motion.div>
        </div>
      </section>


      {/* 3. Our Services Section */}
      <section className="max-w-[1400px] mx-auto w-full px-6 md:px-16 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-8">
            <p className="text-stone-400 text-xs font-bold tracking-[0.2em] uppercase mb-4">Our Services</p>
            <h2 className="font-display text-4xl font-bold text-stone-900 mb-6 leading-tight">
              We Love Serving Our Local Community
            </h2>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <Link className="inline-block px-8 py-3.5 bg-[#f97316] text-white font-medium text-sm hover:bg-[#ea580c] transition-colors" to="/ministries">
              Learn More
            </Link>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8 mt-12 lg:mt-0">
            {mappedServices.map((service, idx) => (
              <article key={idx} className="flex flex-col">
                {/* Generic minimal icon blocks mapping */}
                <div className="w-10 h-10 border border-stone-200 bg-stone-50 flex items-center justify-center mb-4 text-stone-700">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d={
                      idx === 0 ? "M4 6h16M4 12h16m-7 6h7" :
                        idx === 1 ? "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" :
                          idx === 2 ? "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" :
                            idx === 3 ? "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" :
                              idx === 4 ? "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" :
                                "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    } />
                  </svg>
                </div>
                <strong className="text-stone-900 font-bold mb-2 block">{service.title}</strong>
                <p className="text-stone-500 text-xs leading-relaxed max-w-[15rem] italic">{service.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Current Series Section */}
      <section className="max-w-[1400px] mx-auto w-full px-6 md:px-16 pt-16 pb-24 border-t border-stone-100 flex flex-col items-center">
        <p className="text-stone-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 text-center">Current Series</p>
        <h2 className="font-display text-4xl font-bold text-stone-900 mb-6 text-center">Hope for Tomorrow</h2>
        <p className="text-stone-500 text-sm text-center max-w-lg mb-16 leading-relaxed">
          Get caught up with the current message series! Turpis massa sed elementum tempus egestas sed sed risus pretium.
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredSermons.map((sermon, idx) => (
            <article key={sermon.slug} className="flex flex-col group cursor-pointer w-full">
              <div className="w-full aspect-[4/3] bg-stone-100 overflow-hidden mb-6 relative">
                <img
                  src={
                    idx === 0 ? "https://images.unsplash.com/photo-1529070538774-1843cb1665e8?q=80&w=800&auto=format&fit=crop" :
                      idx === 1 ? "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=800&auto=format&fit=crop" :
                        "https://images.unsplash.com/photo-1533227268428-f9ed0900f953?q=80&w=800&auto=format&fit=crop"
                  }
                  alt="Sermon Thumbnail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-[#f97316] text-[10px] font-bold tracking-widest uppercase mb-2">HOPE FOR TOMORROW | PAST MESSAGES</p>
              <h3 className="font-display text-xl font-bold text-stone-900 mb-2">{sermon.title}</h3>
              <p className="text-stone-400 text-xs italic mb-6">Posted on {formatDate(sermon.date)}</p>
              <Link to={window.location.origin + `/sermons`} className="text-stone-900 text-xs font-bold uppercase tracking-wider group-hover:text-[#f97316] transition-colors flex items-center gap-2">
                Listen to the message <span className="text-[10px]">→</span >
              </Link>
            </article>
          ))}
        </div>
      </section>

    </div>
  )
}
