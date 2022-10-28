import { Link } from "react-router-dom"

export default function CreateAccount() {
    return (
        <main className="h-screen bg-secondary1 flex justify-center items-center px-16">
            <form className="px-7 py-5 rounded-lg bg-option2 w-auto flex flex-col">
                <Link to={"/"}><h2 className="text-primary1 font-bold text-3xl mb-6 cursor-pointer">Grocery list</h2></Link>
                <h1 className="font-aleo text-green text-xl leading-5 mb-6 cursor-pointer">Create Account to continue to app</h1>

                <div id="name-container" className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3 mb-6">
                    <input type="text" placeholder="First name" name="first-name" className="px-3 py-1 rounded focus:outline-green invalid:outline-red invalid:text-red text-lg text-dark2" required/>
                    <input type="text" placeholder="Last name" name="last-name" className="px-3 py-1 rounded focus:outline-green invalid:outline-red invalid:text-red text-lg text-dark2" required/>
                </div>
                
                <input type="email" placeholder="Email address" name="email" className="mb-2 px-3 py-1 rounded focus:outline-green invalid:outline-red invalid:text-red text-lg text-dark2" required/>
                <label htmlFor="email" className="font-aleo text-green text-md leading-5 mb-6 cursor-pointer">Create email address</label>
                
                <div id="password-container" className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3 mb-6">
                    <input type="password" placeholder="Password" name="password" className="px-3 py-1 rounded focus:outline-green invalid:outline-red invalid:text-red text-lg text-dark2" required/>
                    <input type="password" placeholder="Confirm password" name="confirm-password" className="px-3 py-1 rounded focus:outline-green invalid:outline-red invalid:text-red text-lg text-dark2" required/>
                </div>

                <div className="md:text-right">
                    <button type="submit" className="w-full md:w-auto px-4 py-1 bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-light1 hover:text-red hover:font-bold transition ease-out duration-500">Create Account</button>
                </div>
            
            </form>
        </main>
    )
}