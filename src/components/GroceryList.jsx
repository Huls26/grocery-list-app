import React, { useState, useContext, useEffect  } from "react";
import { useSaveLocalList, updateDocList } from "../utils/customUtils";

import GroceryItem from "./GroceryItem";
import { form } from "../pages/UserPage";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configuration/firebaseConfiguration";
import { json } from "react-router-dom";

export default function GroceryList() {
    let { formData, setFormData } = useContext(form);
    const groceryList = formData.groceryList; 
    const isLoading = formData.isLoading;
    const defaultList = {
        groceryList:[]
    };
    let [undoItem, setUndoItem] = useState(() => defaultList);

    useEffect(() => {
        
    }, [formData.groceryList.length])

    const groceryElements = groceryList.map(grocery => <GroceryItem key={ grocery.id } item={ grocery }/>);

    // display
    function displayElement(groceryElement) {
        const noItem = groceryElement.length;
        return ( noItem ? groceryElement : <h1 className="my-3 text-center text-xl font-bold text-red cursor-pointer">No items</h1> ) 
    }

    function isSignIn(groceryElements) {
        return ( !isLoading ? displayElement(groceryElements) : <h1 className="my-3 text-center text-3xl font-bold text-primary2 cursor-pointer">Loading... <span><FontAwesomeIcon className="animate-spin" icon={ faSpinner } /></span></h1>)
    }

 
    function clearBtnContainer(groceryElement) {
        const localList = localStorage.getItem("localGroceryList");
        const noItem = groceryElement.length ? true : false;
        return ( ((noItem && formData.isSignIn) || (localList && formData.isSignIn)) && <div id="clear-btb-container" className="mt-4 mb-1 space-x-3 flex justify-center">
                                <button onClick={ undoBtn } className="text-lg font-bold text-option2 hover:text-primary2">Undo</button>
                                <button onClick={ clearBtn } className='px-4 py-1 flex-none bg-primary2 rounded-full font-nunito text-sm text-primary1 hover:text-red'>Clear all</button>
                           </div> ) 
    }

    // // event
    function clearBtn() {
        useSaveLocalList(formData.groceryList);

        // useUpdateDocFirestore(formData)
        setFormData(prevValue => {

            const clearList = {
                                ...prevValue,
                                groceryList: [],
                            }

            updateDocList(clearList);
            return clearList
        })
    }

    function undoBtn() {
        // useSaveLocalList(formData.groceryList);
        const localList = JSON.parse(localStorage.getItem("localGroceryList"));
        if (localList.length) {
            setFormData(prevValue => ({
                ...prevValue,
                groceryList: localList,
            }))
        }
    }
    
    return (
        <main className="max-w-3xl mx-auto">
            <h3 className="font-montserrat text-light1 text-lg font-bold tracking-widest mb-5">List</h3>

            <div className="px-4 py-2 bg-secondary1 rounded-md shadow">
                { isSignIn(groceryElements) }
                
                { clearBtnContainer(groceryElements) }
                check and test app before host
            </div>          
        </main>
    )
}