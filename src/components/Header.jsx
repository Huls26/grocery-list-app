import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'

export default function Header() {
    return (
        <div className="space-x-3 m-0 flex items-center justify-between">   
            <div id="button-container" className='space-x-3'>
                <button className="px-4 py-1 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-secondary1 transition ease-out duration-500">Sign in</button>
                <button className="px-4 py-1 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-secondary1 transition ease-out duration-500">Login</button>
            </div>

            <span className='text-3xl text-primary2 '><FontAwesomeIcon icon={ faCircleQuestion }/></span>
        </div>
    )
}