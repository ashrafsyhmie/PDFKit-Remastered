# PDFKit - Online PDF Tools Platform

PDFKit is a modern React + Vite starter for browser-based PDF workflows inspired by products like iLovePDF. It includes a polished homepage, reusable upload components, and working merge, split, compress, and conversion-ready flows.

## Stack

- React with JSX
- Vite
- Tailwind CSS
- React Router
- pdf-lib
- pdfjs-dist
- file-saver
- react-dropzone
- lucide-react

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Routes

- `/` - Homepage and tool directory
- `/merge` - Merge multiple PDFs into a single file
- `/compress` - Re-save a PDF with lighter object streams
- `/split` - Export a contiguous page range
- `/convert` - Mock frontend conversion flow

## Project structure

```text
src/
  components/
  hooks/
  pages/
  services/
  App.jsx
  index.css
  main.jsx
```

## Backend architecture suggestion

- Use direct uploads from the browser to object storage with signed URLs.
- Send large or expensive jobs to a queue so the UI can poll or subscribe to status updates.
- Keep lightweight tools like merge and split client-side when file sizes are reasonable.
- Move OCR, DOCX conversion, image rendering, and advanced compression to dedicated backend workers.
- Store processed outputs temporarily in object storage and return signed download links.

## Scaling strategy

- Frontend on Vercel for fast global delivery.
- API routes or a separate service for job submission.
- Queue and worker layer for CPU-heavy transformations.
- Object storage for source files and generated outputs.
- Analytics and rate limits to understand high-traffic tools and control costs.

## Vercel deployment

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Set the framework preset to `Vite`.
4. Keep the default build command `npm run build`.
5. Keep the output directory `dist`.
6. Add any future backend environment variables in the Vercel project settings.
7. Deploy and connect a custom domain when ready.
