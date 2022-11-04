import { useState } from "react"
import { Link } from "react-router-dom"

import { auth, db } from "../configuration/firebaseConfiguration";
import { 
    createUserWithEmailAndPassword,
} from "firebase/auth";  
import { 
    doc,
    setDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

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
    
    // remove this
    // connectAuthEmulator(auth, "http://localhost:9099");

    let [accountData, setAccountData] = useState(() => accountLocalStorage ? JSON.parse(accountLocalStorage) : defaultAccountForm);
    let [isErrorSuccess, setIsErrorSuccess] = useState(() => ({
                                        isCreate: false,
                                        passwordError: false,
                                        accountError: false,
                                        message: "",        
                                    }));
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

    function cleanMessage(message) {
        const sliceRemove = message.slice(5);
        return sliceRemove.split("-").join(" ");
    }

    function handleSubmit(event) {
        event.preventDefault()
        
        const accountPassword = accountData.password;
        const accountConfirmPassword = accountData.confirmPassword;
        const email = accountData.email;
        const password = accountData.password;
        const successMessage = "Success Creating Account ; )";

        if (accountPassword === accountConfirmPassword && accountPassword.length >= 8) {
            createUserWithEmailAndPassword(auth, email, password).
            then( userCredential => {
                const user = userCredential.user;
                const uid = user.uid;

                setDocument(uid);
                setIsErrorSuccess(prevValue => ({
                    ...prevValue,
                    accountError: false,
                    message: successMessage,
                    isCreate: true,
                    passwordError: false,
                    accountError: false,
                }))
            }).
            catch( error => {
                // console.log(error.code)
                // console.log(error.message)

                setIsErrorSuccess(prevValue => ({
                    ...prevValue,
                    accountError: true,
                    message: cleanMessage(error.code),
                    isCreate: true,
                }))
            })

            // setIsErrorSuccess(prevValue => ({
            //     ...prevValue,
            //     passwordError: false,
            //     accountError: false,
            // }));
        } else {
           setIsErrorSuccess(prevValue => ({
                ...prevValue,
                passwordError: true,
           }));
        }

    }

    // handle message and error display
    let  styleError = isErrorSuccess.passwordError ? "outline-red" : "focus:outline-green";

    function accountErrorMessage(errorMessage) {
        return (
            <>
                <h1 className="font-bold text-red text-xl">Failed to Create Accoung Try Again : (</h1>

                <h3 className="font-bold text-primary2 text-md">"{ errorMessage }"</h3>
            </>
        )
    }

    function successMessage(message) {
        return (<h1 className="font-bold text-[#251496] text-xl">{message}</h1>)
    }

    function accountMessageDisplay(message) {
        return isErrorSuccess.accountError ? accountErrorMessage(message) : successMessage(message)
    }

    // async/await

    async function setDocument(uid) {
        const set = await setDoc(doc(db, "users", uid), {groceryList:[]});
    }

    return (
        <main className="md:h-screen  bg-secondary1 flex-col justify-center items-center space-y-2 px-16 py-5">

            { isErrorSuccess.isCreate&&accountMessageDisplay(isErrorSuccess.message) }

            <form onSubmit={ handleSubmit } className="px-7 py-5 rounded-lg bg-option2 w-auto flex flex-col my-5">
                <Link to={"/"}><h2 className="text-primary1 font-bold text-3xl mb-6 cursor-pointer">Grocery list</h2></Link>
                <h1 className="font-aleo text-green text-xl leading-5 mb-6 cursor-pointer">Create Account to continue to app</h1>

                <div id="name-container" className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3 mb-6">
                    <input value={ accountData.firstName } onChange={ handleForm } type="text" placeholder="First name" name="firstName" className="px-3 py-1 rounded focus:outline-green focus:invalid:outline-red invalid:text-red text-lg text-dark2" required/>
                    <input value={ accountData.lastName } onChange={ handleForm } type="text" placeholder="Last name" name="lastName" className="px-3 py-1 rounded focus:outline-green focus:invalid:outline-red invalid:text-red text-lg text-dark2" required/>
                </div>
                
                <input value={ accountData.email } onChange={ handleForm } type="email" placeholder="Email address" name="email" className="mb-2 px-3 py-1 rounded focus:outline-green focus:invalid:outline-red invalid:text-red text-lg text-dark2" required/>
                <label htmlFor="email" className="font-aleo text-green text-md leading-5 mb-6 cursor-pointer">Add email address</label>
                
                { isErrorSuccess.passwordError&&<p className="mb-3 text-red leading-4">Incorrect password or the length is to short</p> }
                <div id="password-container" className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 mb-6">

                    <input value={ accountData.password } onChange={ handleForm } type="password" placeholder="Password" name="password" className={ `px-3 py-1 rounded ${ styleError } outline-none border-red focus:invalid:outline-red invalid:text-red text-lg text-dark2` } autoComplete="on" required/>
                    <input value={ accountData.confirmPassword } onChange={ handleForm } type="password" placeholder="Confirm password" name="confirmPassword" className={ `px-3 py-1 rounded ${ styleError } outline-none focus:invalid:outline-red invalid:text-red text-lg text-dark2` } autoComplete="on" required/>
                </div>

                <div className="md:text-right md:space-x-2 space-y-2 md:space-y-0">
                    <button type="submit" className="w-full md:w-auto px-4 py-1 bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-light1 hover:text-green hover:font-bold transition ease-out duration-500">Create Account</button>
                    <button type="reset" className="w-full md:w-auto px-4 py-1 bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-light1 hover:text-red hover:font-bold transition ease-out duration-500"><Link to={"/"}>Cancel</Link></button>
                </div>
            
            </form>
        </main>
    )
}