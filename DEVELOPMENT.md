# Gone Offline — Development Quick Reference

## Preview locally
```bash
cd "/Users/zoelai/Claude Code/GO Website"
npm run dev
```
Then open http://localhost:3000 in Chrome.
Run this every time you open a new Terminal session. Close with Ctrl+C.

## Deploy to goneoffline.com.au
```bash
cd "/Users/zoelai/Claude Code/GO Website"
git add .
git commit -m "describe what you changed"
git push
```
GitHub Actions builds and deploys automatically (~2 min). No need to run npm run dev first.

## Add photos to the site
1. Drop resized images into the correct folder under `public/images/`
2. Add an entry in `src/data/media.ts` (travel/hotels) or `src/data/projects.ts` (featured projects)
3. Filenames in the data file must match exactly what's in the folder

## Folder reference
| Page | Image folder |
|---|---|
| Travel (home) | public/images/travel/ |
| Hotels | public/images/hotels/ |
| Featured Projects | public/images/projects/ |
| About | public/images/about/ |
| Contact | public/images/contact/ |
