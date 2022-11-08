import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../configuration/firebaseConfiguration';

import { Link } from 'react-router-dom';

export default function Header() {
    let [isLogin, setIsLogin] = useState(() => false);
    useEffect(() => {
        return onAuthStateChanged(auth, user => {
            if (user) {
                setIsLogin(() => true);
            } else {
                setIsLogin(() => false)
            }
        })
    }, [])

    function signOutUser() {
        signOut(auth);
        setIsLogin(() => false);
    }

    function signOutBtn() {
       return (<Link to={"/"}><button onClick={ signOutUser } className="px-4 py-1 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-secondary1 transition ease-out duration-500">Sign Out</button></Link>)
    }

    function signInBtn() {
        return (<Link to={"/sign_in"}><button className="px-4 py-1 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-secondary1 transition ease-out duration-500">Sign In</button></Link>)
    }

    return (
        <div className="space-x-3 m-0 flex items-center justify-between">   
            { isLogin ? signOutBtn() : signInBtn() }

            <span className='text-3xl text-primary2 hover:text-secondary1 cursor-pointer'><FontAwesomeIcon icon={ isLogin ? faUserAstronaut : faCircleQuestion }/></span>
        </div>
    )
}