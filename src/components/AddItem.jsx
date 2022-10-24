import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

export default function AddItem() {
    return (
        <form className="flex flex-col space-y-3">
            <input type="text" className="py-0.5 px-2 rounded" placeholder="Add Item"/>

            <div className='flexitems-start space-x-3 h-full'>
                <button type="submit" className="px-4 py-1 mb-10 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-secondary1 transition ease-out duration-500"><i className="not-italic"><FontAwesomeIcon icon={ faCartShopping } /> Add item</i></button>

                {/* add onClick direct to cancel */}
                <button type='reset' className='px-4 py-1 mb-10 flex-none bg-primary2 rounded-full font-nunito text-sm hover:text-red'>Cancel</button>
            </div>
        </form>
    )
}