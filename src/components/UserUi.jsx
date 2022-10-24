import React, { useState } from "react";
import { 
    getList,
} from "../utils/api";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

import GroceryItem from "./GroceryItem";
import AddItem from "./AddItem";

export const form = React.createContext();

export default function UserUi() {
    // getList()
    // .then(docs => console.log(docs))
    // .catch(error => console.log("Something went wrong fetching data"));
    const defaultData = {
                            item: "",
                            isAdd: false,
                            groceryList: [],
                        }
    let [formData, setFormData] = useState(() => defaultData);

    console.log(formData)
    function handleAddItem() {
        setFormData(prevValue => ({
            ...prevValue,
            isAdd: !prevValue.isAdd
        }))
    }

    function buttonAdd() {
        return (
            <button onClick={ handleAddItem } className="px-4 py-1 mb-10 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-secondary1 transition ease-out duration-500"><i className="not-italic"><FontAwesomeIcon icon={ faCartShopping } /> Add Grocery item</i></button>
        )
    }

    return (
        <div className="pt-12 text-primary1 max-w-3xl mx-auto">
            <h1 className="font-montserrat text-3xl font-bold mb-5">Grocery List</h1>

            <div className={ formData.isAdd ? "mb-3" : "mb-1"}>

                {/* using the function of useState instead the data itself */}
                <form.Provider value={ { formData, setFormData } }>
                    { formData.isAdd ? <AddItem /> : buttonAdd() }
                </form.Provider>
            </div>
        </div>
    )
}