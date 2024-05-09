/* Functions like this, should be in the utils folder */
/* Hierarchy, see App.tsx */
import { Navigate } from "react-router-dom";

import Movies from "../pages/Movies";
import Sandbox from "../pages/Sandbox";

export const routesArray = [
  {
    index: true,
    // For strings, we don't need the curly braces
    element: <Navigate to="/sandbox" />,
  },
  {
    path: "sandbox",
    element: <Sandbox />,
  },
  {
    path: "movies",
    element: <Movies />,
  },
];
