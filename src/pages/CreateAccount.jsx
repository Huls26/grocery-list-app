import { useState } from "react"
import { Link } from "react-router-dom"

export default function CreateAccount() {
    const defaultAccountForm = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    }
    const localStorageSetName = "accountForm";
    const accountLocalStorage = localStorage.getItem(localStorageSetName);
    
    let [accountData, setAccountData] = useState(() => accountLocalStorage ? JSON.parse(accountLocalStorage) : defaultAccountForm);
    let [isError, setIsError] = useState(() => false);
    localStorage.setItem(localStorageSetName, JSON.stringify(accountData));

    // event
    function handleForm(event) {
        const target = event.currentTarget;
        const value = target.value;
        const name = target.name;

        setAccountData(prevValue => ({
            ...prevValue,
            [name]: value,
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        
        if (accountData.password === accountData.confirmPassword) {
            console.log("submit to firestore");
        } else {
           setIsError(prevValue => !prevValue);
        }
    }

    
    let  styleError = {
        style: isError&&{      
            outlineStyle: "solid",
            outlineColor: "red",
            outlineWidth: "2px",
            outlineOffset: "-3px",
        } ,
  
    };

    console.log(styleError)
    return (
        <main className="md:h-screen bg-secondary1 flex justify-center items-center px-16 py-5">
            <form onSubmit={ handleSubmit } className="px-7 py-5 rounded-lg bg-option2 w-auto flex flex-col my-5">
                <Link to={"/"}><h2 className="text-primary1 font-bold text-3xl mb-6 cursor-pointer">Grocery list</h2></Link>
                <h1 className="font-aleo text-green text-xl leading-5 mb-6 cursor-pointer">Create Account to continue to app</h1>

                <div id="name-container" className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3 mb-6">
                    <input value={ accountData.firstName } onChange={ handleForm } type="text" placeholder="First name" name="firstName" className="px-3 py-1 rounded focus:outline-green focus:invalid:outline-red invalid:text-red text-lg text-dark2" required/>
                    <input value={ accountData.lastName } onChange={ handleForm } type="text" placeholder="Last name" name="lastName" className="px-3 py-1 rounded focus:outline-green focus:invalid:outline-red invalid:text-red text-lg text-dark2" required/>
                </div>
                
                <input value={ accountData.email } onChange={ handleForm } type="email" placeholder="Email address" name="email" className="mb-2 px-3 py-1 rounded focus:outline-green focus:invalid:outline-red invalid:text-red text-lg text-dark2" required/>
                <label htmlFor="email" className="font-aleo text-green text-md leading-5 mb-6 cursor-pointer">Add email address</label>
                
                <div id="password-container" className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3 mb-6">

                    <input style={ styleError.style }  value={ accountData.password } onChange={ handleForm } type="password" placeholder="Password" name="password" className="px-3 py-1 rounded focus:outline-green focus:invalid:outline-red invalid:text-red text-lg text-dark2" autoComplete="on" required/>
                    <input style={ styleError.style } value={ accountData.confirmPassword } onChange={ handleForm } type="password" placeholder="Confirm password" name="confirmPassword" className="px-3 py-1 rounded focus:outline-green focus:invalid:outline-red invalid:text-red text-lg text-dark2" autoComplete="on" required/>
                </div>

                <div className="md:text-right md:space-x-2 space-y-2 md:space-y-0">
                    <button type="submit" className="w-full md:w-auto px-4 py-1 bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-light1 hover:text-green hover:font-bold transition ease-out duration-500">Create Account</button>
                    <button type="reset" className="w-full md:w-auto px-4 py-1 bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-light1 hover:text-red hover:font-bold transition ease-out duration-500"><Link to={"/"}>Cancel</Link></button>
                </div>
            
            </form>
        </main>
    )
}