import { Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { EventDetailPage } from './pages/EventDetailPage'
import { EventsPage } from './pages/EventsPage'
import { GivePage } from './pages/GivePage'
import { HomePage } from './pages/HomePage'
import { MinistriesPage } from './pages/MinistriesPage'
import { MinistryDetailPage } from './pages/MinistryDetailPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PrayerRequestPage } from './pages/PrayerRequestPage'
import { SermonsPage } from './pages/SermonsPage'
import { VisitPage } from './pages/VisitPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route index element={<HomePage />} />
        <Route element={<AboutPage />} path="about" />
        <Route element={<VisitPage />} path="plan-your-visit" />
        <Route element={<SermonsPage />} path="sermons" />
        <Route element={<EventsPage />} path="events" />
        <Route element={<EventDetailPage />} path="events/:slug" />
        <Route element={<MinistriesPage />} path="ministries" />
        <Route element={<MinistryDetailPage />} path="ministries/:slug" />
        <Route element={<GivePage />} path="give" />
        <Route element={<ContactPage />} path="contact" />
        <Route element={<PrayerRequestPage />} path="prayer-request" />
        <Route element={<Navigate replace to="/" />} path="home" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  )
}

export default App
