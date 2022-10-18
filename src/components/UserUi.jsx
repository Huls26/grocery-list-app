import { 
    getList,
 } from "../utils/api";

import GroceryItem from "./GroceryItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function UserUi() {
    getList()
    .then(docs => console.log(docs))
    .catch(error => console.log("Something went wrong fetching data"));

    return (
        <div className="pt-12 text-primary1 max-w-3xl mx-auto">
            <h1 className="font-montserrat text-3xl font-bold mb-3">Grocery List</h1>

            <button className="px-4 py-1 mb-10 bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-secondary1 transition ease-out duration-500"><i className="not-italic"><FontAwesomeIcon icon={ faCartShopping } /> Add Grocery item</i></button>
            
            <h3 className="font-montserrat text-light1 text-lg font-bold tracking-widest">List</h3>

            {/* <section id="grocery-list" className="px-4 py-3 bg-secondary1 rounded-md text-dark2 shadow mt-2">
                <GroceryItem />
            </section> */}
        </div>
    )
}