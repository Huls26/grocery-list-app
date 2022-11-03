import { useState, useContext } from "react";
import React from "react";

export const data = React.createContext();
export default function GroceryListPage() {
    let [formData, setFormData] = useState()

    return (
        <main id="grocery-list" className="px-16 md:mx-auto -mt-20">
            <data.Provider value={ {formData, setFormData} }>
                <GroceryList />
            </data.Provider>
        </main>
    )
}