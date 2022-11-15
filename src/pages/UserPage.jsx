import React, { useState, useEffect, useContext } from "react";

import { Outlet, useNavigate } from "react-router-dom";

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
import { faL } from "@fortawesome/free-solid-svg-icons";

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
        isLoading: true,
        username: "",
        groceryList: [],
    }
    let [formData, setFormData] = useState(() => defaultData);
    const navigate = useNavigate();

    // console.log(formData)
    useEffect(() => {
        (function loader() {
            const isLoginUser = onAuthStateChanged(auth, user => {
                let unSubSnapShot;
                if (user) {
                    const uid = user.uid;
                    const docRef = doc(db, "users", uid);
                
                    unSubSnapShot = onSnapshot(docRef, docSnap => {
                        const groceryListData = docSnap.data().groceryList;
                        const userDoc = docSnap.data();
                        const urlName = userDoc.firstName;
        
                        navigate(`/${ urlName }`);
                        setFormData(prevValue => ({
                                        ...prevValue,
                                        groceryList: groceryListData,
                                        isSignIn: true,
                                        isLoading: false,
                                        username: urlName,
                                    }))
                    }) 
                } else {
                    unSubSnapShot && unSubSnapShot();
                    // !user && isLoginUser();
                    setFormData(() => ({
                        ...defaultData,
                        isLoading: false,
                    }))
                    console.log("unsub");
                }
            })
        })()
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
                { formData.isSignIn ? <Outlet />: <DefaultGroceryList />}
            </form.Provider>
           
            {/* add name of the user 
            add save btn for grocery list when user is login */}
        </div>
    )
}