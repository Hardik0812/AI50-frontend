import { lazy, Suspense } from "react";
import AuthGuard from "../utils/AuthGuard";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Notifications = lazy(() => import("../pages/Notifications"));

const dashboardRoutes = [
  {
    path: "/dashboard",
    element: (
      <Suspense>
        <AuthGuard>
          <Dashboard />
        </AuthGuard>
      </Suspense>
    ),
  },
  {
    path: "/notifications",
    element: (
      <Suspense>
        <AuthGuard>
          <Notifications />
        </AuthGuard>
      </Suspense>
    ),
  },
];

export default dashboardRoutes;
