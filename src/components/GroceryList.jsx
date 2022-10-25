import React, { useContext } from "react";
import GroceryItem from "./GroceryItem";
import { form } from "../pages/UserPage";

export default function GroceryList() {
    let { formData } = useContext(form);
    const groceryList = formData.groceryList;
    const noItem = groceryList.length;

    const groceryElement = groceryList.map((grocery, index) => <GroceryItem key={index} item={ grocery }/>)

    return (
        <main>
            <h3 className="font-montserrat text-light1 text-lg font-bold tracking-widest mb-5">List</h3>

            <div className="max-w-3xl px-4 py-2 bg-secondary1 rounded-md shadow">
                { noItem ? groceryElement : <h1 className="my-3 text-center text-xl font-bold text-red cursor-pointer">No items yet</h1>}
            </div>
        </main>
    )
}