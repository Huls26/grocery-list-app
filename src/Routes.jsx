import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom"

import ErrorPage from "./pages/Error-page"
import UserPage from "./pages/UserPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserPage />,
        errorElement: <ErrorPage />
    },
])

export default function Routes() {
    return (
        <RouterProvider router={ router } />
    )
}