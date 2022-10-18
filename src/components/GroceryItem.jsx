import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function GroceryItem() {
    return (
        <article className='flex items-center justify-between'>
            <h1 className='text-2xl text-dark2'>Egg</h1>

            <div id='icon-container' className='space-x-2'>
                <i className='text-green'><FontAwesomeIcon icon={ faCheck } /></i>
                <i className='text-red'><FontAwesomeIcon icon={ faTrash } /></i>
            </div>
        </article>
    )
}