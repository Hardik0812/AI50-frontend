import { Suspense } from "react";
import NotFound from "../pages/NotFound";
import authRoutes from "../routes/authRoutes";
import dashboardRoutes from "../routes/dashboardRoutes";

const routes = [
  ...authRoutes,
  ...dashboardRoutes,

  {
    path: "*",
    element: (
      <Suspense>
        <NotFound />
      </Suspense>
    ),
  },
];

export default routes;
