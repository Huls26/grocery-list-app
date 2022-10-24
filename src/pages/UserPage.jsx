import UserUi from "../components/UserUi";
import GroceryItem from "../components/GroceryItem";

export default function UserPage() {

    return (
        <div>
            <main className="px-16  bg-option2 pb-20 ">
                <UserUi />
            </main>

            <section id="grocery-list" className="mx-16 max-w-3xl md:mx-auto px-4 py-2 bg-secondary1 rounded-md shadow -mt-16">
                
                <GroceryItem />
                <GroceryItem />
            </section>
        </div>
    )
}