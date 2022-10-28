import { Link } from "react-router-dom";

export default function SignInPage() {
    return (
      <section className="h-screen bg-secondary1 flex justify-center items-center">
            <form className="max-w-sm px-7 py-5 rounded-lg bg-option2 w-72 flex flex-col">
                <div className="text-center text-green mb-4">
                    <h2 className="text-light1">Sign In</h2>
                    <h4 className="font-muli text-sm">to save your Grocery List</h4>
                </div>

                <div className="flex flex-col space-y-3">
                    <input className="px-3 py-1 rounded focus:outline-green invalid:outline-red invalid:text-red text-lg text-dark2" type="email" placeholder="Email" required/>
                    <input className="px-3 py-1 rounded focus:outline-green invalid:outline-red invalid:text-red text-lg text-dark2" type="password" placeholder="password" required/>
                </div>
               

                <Link to={"/create_account"} className="my-6"><a className="text-green hover:font-bold">Create Account</a></Link>

                <div className="flex flex-col space-y-3">
                    <button className="px-4 py-1 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-secondary1 hover:font-bold transition ease-out duration-500">Sign in</button>

                    <button className="px-4 py-1 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-light1 hover:text-red hover:font-bold transition ease-out duration-500"><Link to={"/"}>Close</Link></button>
                
                </div>
            </form>
      </section>
    )
}