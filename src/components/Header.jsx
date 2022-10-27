import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'

import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="space-x-3 m-0 flex items-center justify-between">   
            <Link to={"/sign_in"}><button className="px-4 py-1 flex-none bg-primary2 rounded-full text-light1 font-nunito text-sm hover:bg-secondary1 transition ease-out duration-500">Sign In</button></Link>

            <span className='text-3xl text-primary2 hover:text-secondary1 cursor-pointer'><FontAwesomeIcon icon={ faCircleQuestion }/></span>
        </div>
    )
}