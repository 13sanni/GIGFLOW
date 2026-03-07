# GigFlow

A full-stack freelance marketplace built with the MERN stack. Users can post gigs, place bids, and hire freelancers — with real-time notifications powered by Socket.io.

**Live Demo**
- Frontend:https://gigflow-azure.vercel.app
- Backend:https://gigflow-kua6.onrender.com

---

## Features

- **Authentication** — Register, login, and logout via JWT stored in HttpOnly cookies
- **Gig Management** — Create, browse (infinite scroll), and view gig details
- **Bidding System** — Place bids, prevent self-bidding, enforce one bid per freelancer per gig
- **Safe Hiring** — Accept one bid; all remaining bids auto-rejected and gig marked closed
- **Real-Time Notifications** — Socket.io events notify owners on new bids and freelancers on hire

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), Tailwind CSS, Redux Toolkit, Axios, Socket.io Client |
| Backend | Node.js, Express, TypeScript, Mongoose, Socket.io |
| Database | MongoDB Atlas |
| Deployment | Vercel (frontend) · Render (backend) |

---

## Project Structure

```
GIGFLOW/
├── backend/
│   └── src/
│       ├── config/        # DB connection
│       ├── controllers/   # Route handlers
│       ├── middlewares/   # Auth, validation, error handling
│       ├── models/        # Mongoose schemas
│       ├── routes/        # Express routers
│       ├── services/      # Business logic
│       ├── socket/        # Socket.io setup
│       ├── app.ts
│       └── server.ts
└── frontend/
    └── src/
        ├── components/    # Navbar, BidForm, NotificationDropdown
        ├── lib/           # Axios instance
        ├── pages/         # All page components
        ├── socket/        # Socket.io client
        └── store/         # Redux store & slices
```

---

## Local Development

### Backend

```bash
cd backend
npm install
# configure .env (see .env.example)
npm run dev
```

**`backend/.env`**
```
MONGODB_URL=your_mongodb_atlas_url
PORT=3000
JWT_SECRET_KEY=your_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend

```bash
cd frontend
npm install
# configure .env (see .env.example)
npm run dev
```

**`frontend/.env`**
```
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

---

## Deployment

### Render (Backend)

Set the following environment variables in your Render service dashboard:

| Variable | Value |
|---|---|
| `MONGODB_URL` | Your MongoDB Atlas connection string |
| `JWT_SECRET_KEY` | A strong random secret |
| `CLIENT_URL` | Your Vercel frontend URL |
| `NODE_ENV` | `production` |
| `PORT` | `3000` (Render sets this automatically) |

### Vercel (Frontend)

Set the following environment variables in your Vercel project settings:

| Variable | Value |
|---|---|
| `VITE_API_URL` | `https://your-backend.onrender.com/api` |
| `VITE_SOCKET_URL` | `https://your-backend.onrender.com` |

> **Note:** Both variables must be prefixed with `VITE_` to be exposed to the Vite build.

---

## Authentication Notes

Authentication uses HttpOnly cookies. For proper API testing, use the deployed frontend or Postman with cookie support enabled.
