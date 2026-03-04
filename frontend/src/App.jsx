import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Gigs = lazy(() => import("./pages/Gigs"));
const GigDetail = lazy(() => import("./pages/GigDetails.jsx"));
const AppLayout = lazy(() => import("./layouts/AppLayout.jsx"));
const CreateGig = lazy(() => import("./pages/CreateGig.jsx"));
const MyGigs = lazy(() => import("./pages/MyGigs.jsx"));
const MyBids = lazy(() => import("./pages/MyBids.jsx"));

const AppLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <p className="text-slate-500">Loading...</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell ambient-bg min-h-screen text-slate-900 relative z-[1]">
        <Suspense fallback={<AppLoader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<AppLayout />}>
            <Route path="/create-gig" element={<CreateGig />} />
            <Route path="/my-gigs" element={<MyGigs />} />
            <Route path="/my-bids" element={<MyBids />} />
            <Route path="/" element={<Navigate to="/gigs" />} />
            <Route path="/gig/:id" element={<GigDetail />} />
            <Route path="/gig/:id/bids" element={<GigDetail />} />
            <Route path="/gigs/:id" element={<GigDetail />} />
            <Route path="/gigs" element={<Gigs />} />
             </Route>
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
