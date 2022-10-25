import React, { useState, useContext } from "react";

import UserUi from "../components/UserUi";
import GroceryItem from "../components/GroceryItem";
import GroceryList from "../components/GroceryList";

export const form = React.createContext();

export default function UserPage() {
    const defaultData = {
        grocery: {
                item: "",
                isCheck: false,
            },
        isAdd: false,
        groceryList: [],
    }
    let [formData, setFormData] = useState(() => defaultData);

    return (
        <div>
            <main className="px-16  bg-option2 pb-20 ">
                {/* using the function of useState instead the data itself */}
                <form.Provider value={ {formData, setFormData} }>
                    <UserUi />
                </form.Provider>
            </main>

            <section id="grocery-list" className="mx-16 md:mx-auto -mt-20">
                <form.Provider value={ {formData, setFormData} }>
                    <GroceryList />
                </form.Provider>
            </section>
        </div>
    )
}