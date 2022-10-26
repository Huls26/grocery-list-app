import React, { useState, useContext } from "react";
import { 
    getList,
} from "../utils/api";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import GroceryItem from "./GroceryItem";
import AddItem from "./AddItem";
import { form } from "../pages/UserPage";

export default function UserUi() {
    const {formData, setFormData}= useContext(form);
    const isAdd = formData.isAdd;

    function handleAddItem() {
        setFormData(prevValue => ({
            ...prevValue,
            isAdd: !prevValue.isAdd,
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

            <div className={ isAdd ? "mb-3" : "mb-1"}>
                { isAdd ? <AddItem /> : buttonAdd() }
            </div>
        </div>
    )
}