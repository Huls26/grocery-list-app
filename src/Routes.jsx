import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";

import ErrorPage from "./pages/Error-page";
import UserPage from "./pages/UserPage";
import SignInPage from "./pages/SignInPage";
import CreateAccount from "./pages/CreateAccount";
// import { Children } from "react";
import GroceryListPage from "./pages/GroceryListPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: ":username",
                element: <GroceryListPage />,
            }
        ],
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