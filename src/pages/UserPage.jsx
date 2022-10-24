import UserUi from "../components/UserUi";
import GroceryItem from "../components/GroceryItem";
import GroceryList from "../components/GroceryList";

export default function UserPage() {

    return (
        <div>
            <main className="px-16  bg-option2 pb-20 ">
                <UserUi />
            </main>

            <section id="grocery-list" className="mx-16 md:mx-auto -mt-24">
                <GroceryList />
            </section>
        </div>
    )
}