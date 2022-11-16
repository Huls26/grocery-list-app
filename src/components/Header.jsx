import { useState, useEffect, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../configuration/firebaseConfiguration';

import { Link } from 'react-router-dom';
import { form } from "../pages/UserPage";
import { random } from 'nanoid';

export default function Header() {
    let { formData, setFormData } = useContext(form);
    const isLogin = formData.isSignIn;
    const username = formData.user.firstName;
    const withEffect = ["animate-spin", "animate-pulse", "animate-ping", "animate-bounce"];
    const noEffect = "animate-none";
    let [userEffect, setUserEffect] = useState(() => noEffect);

    // event
    function signOutUser() {
        signOut(auth);
    }

    function randomAnimation(effects) {
        const length = effects.length;
        const randomIdx = Math.floor(Math.random() * length);

        return effects[randomIdx]
    }

    function signOutBtn() {
       return (<Link to={"/"}><button onClick={ signOutUser } className="px-4 py-1 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-secondary1 transition ease-out duration-500">Sign Out</button></Link>)
    }

    function signInBtn() {
        return (<Link to={"/sign_in"}><button className="px-4 py-1 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-secondary1 transition ease-out duration-500">Sign In</button></Link>)
    }

    function userBtn() {
        if (userEffect === noEffect) {
            setUserEffect(() => randomAnimation(withEffect))

            setTimeout(() => {
                setUserEffect(() => noEffect)
            }, 5000);
        }
    }

    return (
        <div className="space-x-3 m-0 flex items-center justify-between">   
            { isLogin ? signOutBtn() : signInBtn() }

            <div id='user-container' className='flex items-center space-x-2'>
                <h3 onClick={ userBtn } className='self-end capitalize leading-none font-nunito font-bold text-2xl text-primary2 hover:text-secondary1 bg-transparent cursor-pointer'>{ username }</h3>

                <span className={`${ userEffect } text-3xl text-primary2 hover:text-secondary1 cursor-pointer`}><FontAwesomeIcon icon={ isLogin ? faUserAstronaut : faCircleQuestion }/></span>
            </div>
        </div>
    )
}