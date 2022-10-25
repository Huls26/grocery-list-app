import { useContext, useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { form } from "../pages/UserPage";

export default function GroceryItem({item}) {
    let { formData, setFormData } = useContext(form)
    let [isCheck, setIsCheck] = useState(() => false)

    const isCheckItem = formData.grocery.isCheck;

    useEffect(() => {
        checkItem()
    }, [isCheck])

    const isCheckStyle = {
        textDecoration: isCheckItem ? "line-through" : "none",
    }

    // event
    function handleCheck() {
       setIsCheck(prevValue => !prevValue);
    }

    function checkItem() {
        setFormData(prevValue => ({
            ...prevValue,
            grocery: {
                ...prevValue.grocery,
                isCheck: !prevValue.grocery.isCheck,
            }
        })
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