# Firebase CMS setup

The existing E-Cell public design remains intact. Public blogs now read published documents from Firestore when Firebase is configured; the original hardcoded articles remain in `src/data/site-data.ts` as a safe fallback until the first Firebase content is confirmed.

## 1. Create the Firebase project

Create a Firebase project, register a Web app, and enable **Authentication → Email/Password** and **Cloud Firestore**. This CMS is designed to run on Firebase's Spark/no-cost plan and does not require Firebase Cloud Storage or a Blaze billing plan. Copy the browser configuration values into a local `.env` file based on `.env.example`. The app only uses public Web SDK configuration values; never put a service-account private key in the frontend.

Deploy the rules and index from the project root with the Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
firebase use YOUR_FIREBASE_PROJECT_ID
firebase deploy --only firestore:rules,firestore:indexes
```

## 2. Create the first administrator

In Firebase Authentication, create an Email/Password user and copy that user's UID. In Firestore, create a collection named `admins`, then create a document whose document ID is exactly that UID. The document can contain a display name or email for reference, but the application only relies on the UID. The client checks this document after login, and the security rules independently enforce the same authorization.

## 3. Blog schema

Each `blogs/{blogId}` document contains `id` (the document ID), `title`, `slug`, `excerpt`, `content` (editor HTML), `category`, `author`, `coverImageUrl`, `status` (`draft` or `published`), `publishedAt`, `createdAt`, and `updatedAt`. Dates are written as Firestore timestamps/server timestamps. Slugs are checked for uniqueness before create/update. Public queries only read `status == published` and order by `publishedAt` descending.

## 4. Admin workflow

Open `/admin/login`, sign in with the authorized Firebase user, and use **New Blog** to write an article. The editor supports headings, bold, italic, lists, and links through a small toolbar. Paste a publicly hosted image URL into the cover image URL field; the URL is stored in the existing `coverImageUrl` Firestore field. Save a draft or publish immediately. The dashboard supports edit, publish, unpublish, and delete.

Unauthenticated users are redirected away from `/admin`, `/admin/blogs`, `/admin/blogs/new`, and `/admin/blogs/edit/{id}`. Firestore rules provide the authoritative backend protection; normal visitors can only read published blogs and cannot create, modify, or delete content.

## 5. Local commands

```bash
cp .env.example .env
# fill in the six VITE_FIREBASE_* values
npm run dev
# validation used for this implementation
node node_modules/typescript/bin/tsc --noEmit
node node_modules/vite/bin/vite.js build
```

The original blog data remains available as a fallback and migration source. After Firebase is configured, create the equivalent published documents through the admin UI (or a trusted server-side import process) before removing the fallback in a later cleanup. This avoids losing the content that shipped with the original site.

## 6. Vercel

Add the six `VITE_FIREBASE_*` variables in the Vercel project settings for Production, Preview, and Development as appropriate. Build with `npm run build`; Vercel detects the existing TanStack Start/Vite setup. Deploy Firebase rules/indexes separately with the Firebase CLI. Do not commit `.env` or any service-account key.

## 7. Git handoff

```bash
git add .
git commit -m "Add Firebase blog CMS and admin publishing workflow"
git push origin YOUR_BRANCH
```

The only remaining setup requirement is entering the Firebase Web app values, enabling Authentication and Firestore, and creating the first `admins/{uid}` document. No Cloud Storage setup or Blaze billing plan is required.


## 8. Team and event management

The admin dashboard also includes `/admin/team` and `/admin/events`. Team members are stored in `team/{memberId}` with `name`, `role`, `group`, `imageUrl`, `linkedinUrl`, `instagramUrl`, `createdAt`, and `updatedAt`; Instagram is optional. Events are stored in `events/{eventId}` with `name`, `description`, `date`, `time`, `dateTba`, `timeTba`, `venue`, `imageUrl`, `registrationUrl`, `createdAt`, and `updatedAt`. Administrators can add, edit, and remove both types of content; public visitors can read them. When an event date or time is not fixed, use its independent **Yet to be announced** option.

Team profile photos and event posters use externally hosted image URLs. Firebase does not upload or store these images, so this workflow remains compatible with the Spark/no-cost plan. Use a stable public HTTPS URL from the organization's website, a trusted image host, or an image CDN.

## 9. Testimonials

The seeded placeholder testimonials have been removed. A good collection workflow is to use a short Google Form after each event with consent language, asking for the participant's name, course/year, role, a 1–2 sentence response, and permission to publish their name, quote, and photo. Review responses manually, confirm consent, then add approved testimonials to the site. For stronger authenticity, ask for a specific before/after result rather than a generic satisfaction rating.
