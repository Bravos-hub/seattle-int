# Seattle International Church Website

This project implements the Phase 1 church website as a static-first React and Vite experience with client-side routing, structured content, live external integrations, and mobile-first layouts.

## What is included

- Multi-page routes for home, about, visit, sermons, events, ministries, giving, contact, and prayer requests
- Structured church content in one source file so page copy and key links are not buried inside components
- Search across pages, sermons, and events
- Event detail pages and ministry detail pages
- Live hosted form submission wiring for visitor, contact, prayer, and ministry-interest flows
- Route-based page titles and description metadata

## Main content file

Update most launch content in [src/content/siteContent.ts](D:/Dev/SeattleInt/src/content/siteContent.ts).

This file contains:

- church identity, service times, address, contacts, and social links
- leadership, ministries, sermons, and events
- giving links and FAQ content
- hosted form endpoints and success messages

## Integration notes

- Forms currently post to `formsubmit.co` endpoints defined in the content layer. Replace these email-based endpoints with the church's real verified destination before production use.
- The giving portal uses a placeholder `Tithe.ly` link and should be replaced with the church's live giving account.
- The YouTube and social URLs are placeholder church handles and should be updated to the real ministry accounts.
- BrowserRouter is used for clean URLs, so production hosting should include SPA fallback rewrites for deep links like `/events/city-prayer-night`.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Suggested content handoff checklist

- Replace the placeholder church name, address, phone numbers, and emails with real approved values.
- Replace giving, social, and sermon links with live ministry-owned destinations.
- Confirm every ministry leader name, schedule, and contact path with the church council.
- Verify hosted form endpoints submit successfully after email verification.
- Re-test mobile navigation, maps, and all external CTAs before launch.
