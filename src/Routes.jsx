import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";

import ErrorPage from "./pages/Error-page";
import UserPage from "./pages/UserPage";
import SignInPage from "./pages/SignInPage";
import CreateAccount from "./pages/CreateAccount";

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "sign_in",
        element: <SignInPage />,
    },
    {
        path: "create_account",
        element: <CreateAccount />
    },
])

export default function Routes() {
    return (
        <RouterProvider router={ router } />
    )
}