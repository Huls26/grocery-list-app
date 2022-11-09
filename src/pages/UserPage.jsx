import React, { useState, useEffect, useContext } from "react";

import { Outlet } from "react-router-dom";

import {
    doc,
    getDoc,
    onSnapshot,
} from "firebase/firestore";
import {
    onAuthStateChanged,
} from "firebase/auth"

import UserUi from "../components/UserUi";
import GroceryItem from "../components/GroceryItem";
import GroceryList from "../components/GroceryList";
import Header from "../components/Header";

import GroceryListPage from "./GroceryListPage";
import DefaultGroceryList from "./DefaultGroceryList";
import { auth, db } from "../configuration/firebaseConfiguration";

export const form = React.createContext();

// components
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
 
    useEffect(() => {
        (function loader() {
            const isLoginUser = onAuthStateChanged(auth, user => {
                let unSubSnapShot;
                if (user) {
                    const uid = user.uid;
                    const docRef = doc(db, "users", uid);
                
                    unSubSnapShot = onSnapshot(docRef, docSnap => {
                        const groceryListData = docSnap.data().groceryList;
                        console.log(groceryListData)
                        setFormData(prevValue => ({
                                        ...prevValue,
                                        groceryList: groceryListData,
                                        isSignIn: true,
                                    }))
                    }) 
                } else {
                    unSubSnapShot ? unSubSnapShot() : null;
                    !user ? null : isLoginUser();
                    setFormData(() => defaultData)
                    console.log("unsub");
                }
            })
        })()
    }, [])
    
   
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
                { formData.isSignIn ? <Outlet />: <DefaultGroceryList />}
            </form.Provider>
           
            {/* add name of the user 
            add save btn for grocery list when user is login */}
        </div>
    )
}