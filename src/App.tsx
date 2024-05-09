/* Imports should always have some hierarchy, for better readability */
/* First block, package imports */
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* Second block, internal imports */
import { routesArray } from "./utils/routerConfig";

/* Third block, css imports */
import "./App.css";

function App() {
  const router = createBrowserRouter(routesArray);

  return (
    <div className="App-content">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
