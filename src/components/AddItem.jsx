import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useState, useContext } from 'react'
import { nanoid } from 'nanoid';

import { form } from '../pages/UserPage';

export default function AddItem() {
    const {formData, setFormData}= useContext(form);
    
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

        setFormData(prevValue => ({
                ...prevValue,
                grocery: {
                    ...prevValue.grocery,
                    [name]: value,
                }
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()

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
    
    return (
        <form onSubmit={ handleSubmit } className="flex flex-col md:items-start space-y-3 md:flex-row md:space-y-0 md:space-x-3">
            <input type="text" value={ formData.grocery.item } onChange={ handleChange } name="item" className="md:flex-1 py-0.5 px-2 rounded outline-green focus:invalid:outline-red text-option2 placeholder:font-normal text-lg capitalize font-bold" placeholder="Add Item"/>

            <div className='flex items-start space-x-3 h-full'>
                <button type="submit" className="px-4 py-1 mb-10 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-secondary1 transition ease-out duration-500"><i className="not-italic"><FontAwesomeIcon icon={ faCartShopping } /> Add item</i></button>

                <button type='reset' onClick={ handleCancel } className='px-4 py-1 mb-10 flex-none bg-primary2 rounded-full font-nunito text-sm hover:text-red'>Cancel</button>
            </div>
        </form>
    )
}