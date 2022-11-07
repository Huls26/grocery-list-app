import { useState } from "react";

import { Link, redirect, useNavigate } from "react-router-dom";

import {
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    doc,
    getDoc,
} from "firebase/firestore";
import { db } from "../configuration/firebaseConfiguration";

import { auth } from "../configuration/firebaseConfiguration";

export default function SignInPage() {
    const defaultForm = {
        email: "",
        password: "",   
    }
    let [loginForm, setLoginForm] = useState(() => defaultForm);
    let [eventError, setEventError] = useState(() => ({
                            isError: false,
                            message: "",
                        }));
    const navigate = useNavigate();
    const email = loginForm.email;
    const password = loginForm.password;

    // clean message
    function cleanMessage(message) {
        const sliceRemove = message.slice(5); 
        return sliceRemove.split("-").join(" ");
    }
    
    // handle event
    function handleLogin(event) {
        event.preventDefault();

        loginAndGetData(auth, email, password)
    }

    function handleChange(event) {
        const target = event.currentTarget;
        const value = target.value;
        const name = target.name;
        
        setLoginForm(prevValue => ({
            ...prevValue,
            [name]: value,
        }))
    }

    // async/await
    // getDoc
    async function loginAndGetData(auth, email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userid = userCredential.uid;

            // set params
            // getDoc
            // https://firebase.google.com/docs/firestore/query-data/get-data
            console.log(user)
            navigate("/")
        } catch(error){
            setEventError(prevValue => ({
                ...prevValue,
                isError: true,
                message: cleanMessage(error.code),
            }))
        }
    }

    return (
      <section className="h-screen bg-secondary1 flex flex-col justify-center items-center">

            {eventError.isError&&<h1 className="text-red capitalize text-2xl mb-4">{eventError.message}</h1>}
            <form className="max-w-sm px-7 py-5 rounded-lg bg-option2 w-72 flex flex-col">
                <div className="text-center text-green mb-4">
                    <h2 className="text-light1">Sign In</h2>
                    <h4 className="font-muli text-sm">to save your Grocery List</h4>
                </div>

                <div className="flex flex-col space-y-3">
                    <input value={ loginForm.email } onChange={ handleChange } name="email" className="px-3 py-1 rounded focus:outline-green invalid:outline-red invalid:text-red text-lg text-dark2" type="email" placeholder="Email" required/>
                    <input value={ loginForm.password } onChange={ handleChange } name="password" className="px-3 py-1 rounded focus:outline-green invalid:outline-red invalid:text-red text-lg text-dark2" type="password" placeholder="password" autoComplete="on" required/>
                </div>
               
                <Link to={"/create_account"} className="my-6 text-green hover:font-bold">Create Account</Link>

                <div className="flex flex-col space-y-3">
                    <button onClick={ handleLogin } className="px-4 py-1 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-secondary1 hover:font-bold transition ease-out duration-500">Sign in</button>

                  <Link className="px-4 py-1 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm text-center hover:bg-light1 hover:text-red hover:font-bold transition ease-out duration-500" to={"/"}>Close</Link>
                </div>
            </form>
      </section>
    )
}