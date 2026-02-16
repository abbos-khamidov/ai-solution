
  # AI Automation Agency Website

  This is a code bundle for AI Automation Agency Website. The original project is available at https://www.figma.com/design/F81Fhv2eHwwcFnlLYlFVxo/AI-Automation-Agency-Website.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Django backend (forms/telegram/security)

  A Django backend is available in `backend/`.

  - Frontend `app/api/lead` and `app/api/contact` now proxy to `DJANGO_API_BASE_URL`.
  - Set `DJANGO_API_BASE_URL` in your frontend environment.
  - Start backend with instructions in `backend/README.md`.

  ## Deploy on Vercel

  The project is set up for Vercel: `vercel.json` includes framework, security headers, and cache. Set `NEXT_PUBLIC_SITE_URL` in Vercel Environment Variables to your production URL. See [docs/DEPLOY_VERCEL.md](docs/DEPLOY_VERCEL.md) for steps and env vars.
  
