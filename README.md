GigFlow – Mini Freelance Marketplace Platform

GigFlow is a mini freelance marketplace platform built as part of the Full Stack Development Internship Assignment for ServiceHive.
It allows users to post gigs, place bids, and safely hire exactly one freelancer per gig, with a strong focus on backend correctness, secure authentication, and real-world system design.

🌐 Live Project Links

Frontend (Vercel):
https://gigflow-beta-ruby.vercel.app/

Backend (Render):
https://gigflow-1-mr68.onrender.com

Note: Authentication uses HttpOnly cookies.
For proper testing, use the deployed frontend or Postman with cookies enabled.

🎯 Assignment Coverage

This project fulfills all major assignment requirements:

Secure user authentication

Proper database modeling & relationships

Gig and bid management

Safe hiring logic (one freelancer per gig)

Real-time notifications (Socket.io)

Clean, modular backend structure

Deployed frontend & backend

🔑 Core Features
User Authentication

User registration & login

JWT-based authentication using HttpOnly cookies

Secure logout

Protected routes via auth middleware

Gig Management

Authenticated users can create gigs

All users can browse open gigs

Gig status: open / closed

Only gig owners can view bids on their gigs

Bidding System

Freelancers can place bids on gigs

Users cannot bid on their own gigs

Duplicate bids are prevented

Bid statuses: pending, accepted, rejected

Hiring Workflow (Atomic & Safe)

A gig owner can hire only one freelancer

Implemented using MongoDB transactions

When a bid is accepted:

All other bids are rejected automatically

Gig is marked as closed

Prevents race conditions and ensures data consistency

Real-Time Notifications (Socket.io)

Gig owners get notified when a new bid is placed

Freelancers get notified when hired

Authenticated socket connections using JWT

Event-based notifications (no polling)

State Management

Redux Toolkit used only for real-time notifications

Notification list

Unread count

REST data (gigs, bids, auth) handled via API calls

🛠️ Tech Stack
Backend

Node.js

Express.js

TypeScript

MongoDB + Mongoose

JWT Authentication

Socket.io

Frontend

React (Vite)

Tailwind CSS

Axios

Redux Toolkit

Socket.io Client

Deployment

Backend: Render

Frontend: Vercel

🧠 Technical Highlights

MongoDB Transactions for safe hiring workflow

JWT stored in HttpOnly cookies (secure & production-ready)

Authenticated Socket.io connections

Clean separation of concerns and modular architecture

📂 Backend Folder Structure (Simplified)
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── socket/
├── config/
├── app.ts
└── server.ts

▶️ Running the Project Locally
Backend Setup
cd backend
npm install
npm run dev

Frontend Setup
cd frontend
npm install
npm run dev
