import React, { useState, useEffect, useContext } from "react";

import { Outlet } from "react-router-dom";

import {
    doc,
    getDoc,
} from "firebase/firestore";
import {
    onAuthStateChanged,
} from "firebase/auth"

import UserUi from "../components/UserUi";
import GroceryItem from "../components/GroceryItem";
import GroceryList from "../components/GroceryList";
import Header from "../components/Header";

import GroceryListPage from "./GroceryListPage";
import { auth } from "../configuration/firebaseConfiguration";

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

    // subscribe when user is login
    useEffect(() => {
        return onAuthStateChanged(auth, user => {
            if (user) {
                const uid = user.uid;
                console.log(user)
            } else {
                console.log("unsubscribe");
            }
        })
    }, [])
    
    return (
        <div>
            <section className="bg-option2 pb-20 ">
                <header className="bg-primary1 px-16 py-3 mb-6">
                    <form.Provider value={ {formData, setFormData} }>
                        <Header />
                    </form.Provider>
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