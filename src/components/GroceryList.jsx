import React, { useState, useContext, useEffect  } from "react";
import GroceryItem from "./GroceryItem";
import { form } from "../pages/UserPage";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configuration/firebaseConfiguration";
import { json } from "react-router-dom";

export default function GroceryList() {
    let { formData, setFormData } = useContext(form);
    const groceryList = formData.groceryList; 
    const defaultElements = {
        elements: null,
    }
    let [displayGroceryItems, setDisplayGroceryItems] = useState(() => defaultElements)
    const isLoading = displayGroceryItems.elements;

    useEffect(() => {
        (async function() {
            const groceryElements = groceryList.map(grocery => <GroceryItem key={ grocery.id } item={ grocery }/>);
            
            setDisplayGroceryItems(() => ({
                elements: groceryElements,
            }))
        })()
    }, [groceryList])

    function displayElement(groceryElement) {
        const noItem = groceryElement.length;
        return ( noItem ? groceryElement : <h1 className="my-3 text-center text-xl font-bold text-red cursor-pointer">No items</h1> ) 
    }

    return (
        <main className="max-w-3xl mx-auto">
            <h3 className="font-montserrat text-light1 text-lg font-bold tracking-widest mb-5">List</h3>

            <div className="px-4 py-2 bg-secondary1 rounded-md shadow">
                { isLoading ? displayElement(displayGroceryItems.elements) : <h1 className="my-3 text-center text-3xl font-bold text-primary2 cursor-pointer">Loading...</h1> }
            </div>
        </main>
    )
}