import { useEffect } from "react";
import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "./features/auth/store";
import { Toaster } from "react-hot-toast";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analytics = lazy(() => import("./pages/Analytics"));
const PatientDetails = lazy(() => import("./pages/PatientDetails"));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
  </div>
);

function App() {
  const { isAuthenticated, loading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#1e293b",
            color: "#fff",
          },
        }}
      />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/analytics"
            element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />}
          />
          <Route
            path="/patients"
            element={
              isAuthenticated ? <PatientDetails /> : <Navigate to="/login" />
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
