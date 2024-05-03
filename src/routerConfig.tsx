import Movies from "./pages/Movies";
import Sandbox from "./pages/Sandbox";
import {Navigate} from "react-router-dom";

export const routesArray = [
    {
        index: true,
        element: <Navigate to={'/sandbox'} />
    },
    {
        path: 'sandbox',
        element: <Sandbox />
    },
    {
        path: 'movies',
        element: <Movies />
    }
]
