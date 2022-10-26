import { useContext, useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { form } from "../pages/UserPage";

export default function GroceryItem({item}) {
    let { formData, setFormData } = useContext(form)
    let [isCheck, setIsCheck] = useState(() => false)

    const itemId = item.id;
    const isCheckItem = item.isCheck;

    console.log(isCheckItem)
    const isCheckStyle = {
        textDecoration: isCheckItem ? "line-through" : "none",
    }

    // event
    function handleCheck() {
        checkItem()
        setIsCheck(prevValue => !prevValue); 
    }

    console.log(formData)
    function checkItem() {
        setFormData(prevValue => {
            const itemIsCheck = prevValue.groceryList.map(item => {
                if (itemId === item.id) {
                    return ({
                        ...item,
                        isCheck: !item.isCheck,
                    })
                } else {
                    return item
                }
            })

            return ({
                ...prevValue,
                groceryList: itemIsCheck,
            })
        }
            
);
    }
    return (
        <article className='flex items-center justify-between'>
            <h1 style={ isCheckStyle } className='text-2xl text-primary2 font-bold cursor-pointer capitalize'>{ item.item }
            </h1>

            <div id='icon-container' className='space-x-2'>
                <button onClick={ handleCheck }><i className='text-green hover:bg-primary1 hover:p-1 rounded'><FontAwesomeIcon icon={ faCheck } /></i></button>
                <button><i className='text-red hover:bg-primary1 hover:p-1 rounded'><FontAwesomeIcon icon={ faTrash } /></i></button>
            </div>
        </article>
    )
}