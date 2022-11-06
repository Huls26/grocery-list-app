import React, { useState, useContext } from "react";

import UserUi from "../components/UserUi";
import GroceryItem from "../components/GroceryItem";
import GroceryList from "../components/GroceryList";
import Header from "../components/Header";

import { Outlet } from "react-router-dom";

export const form = React.createContext();

export default function UserPage() {
    const defaultData = {
        grocery: {
                item: "",
                isCheck: false,
                id: "",
            },
        isAdd: false,
        isSignIn: false,
        groceryList: [],
    }
    let [formData, setFormData] = useState(() => defaultData);

    return (
        <div>
            <section className="bg-option2 pb-20 ">
                <header className="bg-primary1 px-16 py-3 mb-6">
                    <Header />
                </header>

                <div className="px-16">
                    {/* using the function of useState instead the data itself */}
                    <form.Provider value={ {formData, setFormData} }>
                        <UserUi />
                    </form.Provider>
                </div>

            </section>

            <form.Provider value={ {formData, setFormData} }>
                <Outlet />
            </form.Provider>
           
            {/* <main id="grocery-list" className="px-16 md:mx-auto -mt-20">
                <form.Provider value={ {formData, setFormData} }>
                    <GroceryList />
                </form.Provider>
            </main> */}
        </div>
    )
}