import { doc, updateDoc } from 'firebase/firestore';
import { db } from "../configuration/firebaseConfiguration";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faFaceGrinWink } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { form } from '../pages/UserPage';

export default function AddItem() {
    const {formData, setFormData}= useContext(form);
    const uid = formData.user.id;
    const userDataRef = doc(db, "users", uid);
    const defaultE = {
        isError: false,
        errorMessage: "",
    }
    let [error, setError] = useState(() => defaultE)

    useEffect(() => {
        if (formData.isSignIn) {
            const updateData = {
                ...formData.user,
                groceryList: formData.groceryList,
            }

            updateDoc(userDataRef, updateData)
        }
      
    }, [formData.groceryList.length])

    // setTimeout message
    function setMessage(length, maxChar) {
        if (length < maxChar && error.isError) {
            const myTimeout = setTimeout(() => {
                setError(() => defaultE)
            }, 3000);
        }
    }

    // handle events
    function handleCancel() {
        setFormData(prevValue => ({
            ...prevValue,
            isAdd: !prevValue.isAdd
        }))
    }

    function handleChange(event) {
        const target = event.currentTarget;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        const maxChar = 19;
        const errorMessage = "You have exceeded the maximum character limit, Please try at least 18 character."

        if (value.length >= maxChar) {
            setMessage(value.length, maxChar)
            setError(prevValue => ({
                ...prevValue,
                isError: true,
                errorMessage: errorMessage,
            }))
        } else {
            setMessage(value.length, maxChar)
            setFormData(prevValue => ({
                    ...prevValue,
                    grocery: {
                        ...prevValue.grocery,
                        [name]: value,
                    }
            }))
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        const maxItem = 99;
        const errorMessage = "You have reach the maximum grocery list that's a lot of items my friend. ; )"

        if (formData.groceryList.length >= maxItem) {
            setError(prevValue => ({
                ...prevValue,
                isError: true,
                errorMessage: errorMessage,
            }))
        } else {
            setFormData(prevValue => {
                const groceryItem = {
                    ...prevValue.grocery,
                    id: nanoid(10),
                }
    
                return ({
                    ...prevValue,
                    groceryList: [groceryItem, ...prevValue.groceryList],
                    grocery: {
                        ...prevValue.grocery, 
                        item: "",
                        id: "",
                    },
                })
            })
        }
    }

    const errorStyle = {
        outline: `solid ${error.isError && "red"}`
    }

    return (
        <form onSubmit={ handleSubmit } className="flex flex-col md:items-start space-y-3 md:flex-row md:space-y-0 md:space-x-3">

            { error.isError && <h1 className='text-red'>{ error.errorMessage }</h1>}

            <input type="text" value={ formData.grocery.item } onChange={ handleChange } name="item" className={`md:flex-1 py-0.5 px-2 rounded ${ !error.isError ? "outline-green" : "outline-red"} focus:invalid:outline-red text-option2 placeholder:font-normal text-lg capitalize font-bold` } placeholder="Add Item" required/>

            <div className='flex items-start space-x-3 h-full'>
                <button type="submit" className="px-4 py-1 mb-10 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-secondary1 transition ease-out duration-500"><i className="not-italic"><FontAwesomeIcon icon={ faCartShopping } /> Add item</i></button>

                <button type='reset' onClick={ handleCancel } className='px-4 py-1 mb-10 flex-none bg-primary2 rounded-full font-nunito text-sm hover:text-red'>Cancel</button>
            </div>
        </form>
    )
}