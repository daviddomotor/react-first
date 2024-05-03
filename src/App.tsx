import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routesArray} from "./routerConfig";

function App() {
    const router = createBrowserRouter(routesArray)

    return (
        <div className="App-content">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
