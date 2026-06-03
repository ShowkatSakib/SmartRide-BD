# 🚀 SmartRide BD — Full Deployment Guide

Deploy backend on **Render** (free) + frontend on **Vercel** (free).

---

## STEP 1 — Push to GitHub

Open your terminal in the `smartride-bd` folder and run:

```bash
echo "# SmartRide-BD" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ShowkatSakib/SmartRide-BD.git
git push -u origin main
```

> ✅ Your full project (frontend + backend + mobile HTML) is now on GitHub.

---

## STEP 2 — Deploy Backend on Render (Free)

### 2a. Create Render account
Go to → **https://render.com** → Sign up with GitHub

### 2b. Create a new Web Service
1. Click **"New"** → **"Web Service"**
2. Connect your GitHub → select **SmartRide-BD** repo
3. Fill in the settings:

| Field | Value |
|-------|-------|
| **Name** | `smartride-bd-api` |
| **Root Directory** | `backend` |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn app:app --bind 0.0.0.0:$PORT --workers 2` |
| **Instance Type** | `Free` |

4. Click **"Create Web Service"**
5. Wait ~3 minutes for it to build and deploy

### 2c. Get your backend URL
After deploy, Render gives you a URL like:
```
https://smartride-bd-api.onrender.com
```
**Copy this URL — you need it in Step 3.**

### 2d. Test your backend
Open in browser:
```
https://smartride-bd-api.onrender.com/api/health
```
You should see:
```json
{"status": "ok", "service": "SmartRide BD API", "version": "2.0.0"}
```

> ⚠️ **Free Render note:** The free tier sleeps after 15 minutes of inactivity.
> First request after sleep takes ~30 seconds. This is normal.

---

## STEP 3 — Deploy Frontend on Vercel (Free)

### 3a. Create Vercel account
Go to → **https://vercel.com** → Sign up with GitHub

### 3b. Import your project
1. Click **"Add New"** → **"Project"**
2. Click **"Import"** next to **SmartRide-BD**
3. Fill in the settings:

| Field | Value |
|-------|-------|
| **Root Directory** | `frontend` |
| **Framework Preset** | `Create React App` |
| **Build Command** | `npm run build` (auto-detected) |
| **Output Directory** | `build` (auto-detected) |

### 3c. Add Environment Variable
Before clicking Deploy, scroll down to **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `REACT_APP_API_URL` | `https://smartride-bd-api.onrender.com` |

> ⚠️ Replace with YOUR actual Render URL from Step 2c.
> No trailing slash at the end.

### 3d. Click Deploy
Wait ~2 minutes. Vercel gives you a live URL like:
```
https://smartride-bd.vercel.app
```

### 3e. Test your frontend
Open the Vercel URL in your phone browser. All 4 pages should work.

---

## STEP 4 — Verify Everything Works

Test these URLs in order:

```
✅ Backend health:
https://smartride-bd-api.onrender.com/api/health

✅ Backend fare compare:
https://smartride-bd-api.onrender.com/api/compare-rides
(POST with body: {"pickup":"Dhanmondi","destination":"Gulshan 2","weather":"clear","hour":10})

✅ Frontend live:
https://smartride-bd.vercel.app

✅ Mobile HTML (no server):
Open smartride-mobile/smartride-bd.html directly on your phone
```

---

## STEP 5 — Custom Domain (Optional)

### Vercel custom domain
1. Go to your project → **Settings** → **Domains**
2. Add your domain e.g. `smartridebd.com`
3. Update your DNS records as shown

### Free domain options
- **Freenom**: `.tk`, `.ml`, `.ga` domains (free)
- **js.org**: free subdomain for GitHub Pages projects

---

## Future Updates — How to Redeploy

Any time you push to GitHub, both Render and Vercel **auto-redeploy**:

```bash
# Make your changes, then:
git add .
git commit -m "update: describe what you changed"
git push
```

Both services detect the push and redeploy automatically within 2–3 minutes.

---

## Architecture Overview (Live)

```
Your Phone / Browser
       │
       ▼
┌─────────────────────────┐
│  Vercel (Frontend)       │  https://smartride-bd.vercel.app
│  React 18 + Tailwind    │
│  4 pages, mobile-first  │
└────────────┬────────────┘
             │ API calls (axios)
             ▼
┌─────────────────────────┐
│  Render (Backend)        │  https://smartride-bd-api.onrender.com
│  Flask + Gunicorn        │
│  7 REST endpoints        │
│  Real Dhaka fare engine  │
└─────────────────────────┘
```

---

## Troubleshooting

**"Network Error" on frontend**
→ Your `REACT_APP_API_URL` in Vercel is wrong or missing.
→ Go to Vercel → Project → Settings → Environment Variables → check the value.
→ After fixing, go to Deployments → Redeploy.

**Backend returns 500 error**
→ Go to Render → your service → Logs → read the error.
→ Most common: wrong start command. Make sure it is:
`gunicorn app:app --bind 0.0.0.0:$PORT --workers 2`

**Frontend shows blank page**
→ Go to Vercel → your project → Deployments → click latest → check build logs.
→ Make sure Root Directory is set to `frontend` not the repo root.

**Render sleeps and first load is slow**
→ This is normal on the free tier. You can use a free uptime monitor like
**UptimeRobot** (https://uptimerobot.com) to ping your backend every 14 minutes
and keep it awake.

---

## Summary — What You'll Have

| Service | URL | Cost |
|---------|-----|------|
| Backend API | `https://smartride-bd-api.onrender.com` | Free |
| Frontend App | `https://smartride-bd.vercel.app` | Free |
| Mobile HTML | Direct file open, no server needed | Free |
| GitHub Repo | `https://github.com/ShowkatSakib/SmartRide-BD` | Free |

**Total cost: ৳0**
