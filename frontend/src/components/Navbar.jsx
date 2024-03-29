import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
    return (
        <header className="antialiased">
            <nav className="bg-[#9c9ea4] border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">
                        <button id="toggleSidebar" aria-expanded="true" aria-controls="sidebar" className="hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h14M1 6h14M1 11h7" /> </svg>
                        </button>
                        <button aria-expanded="true" aria-controls="sidebar" className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg className="w-[18px] h-[18px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" /></svg>
                            <span className="sr-only">Toggle sidebar</span>
                        </button>
                        <a href="https://flowbite.com" className="flex mr-4">
                            <img src="https://flowbite.s3.amazonaws.com/logo.svg" className="mr-3 h-8" alt="FlowBite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"><Link to="/">Employee Management</Link></span>
                        </a>
                       
                    </div>
                    <div className="flex items-center lg:order-2">
                        <button id="toggleSidebarMobileSearch" type="button" className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" >
                            <span className="sr-only">Search</span>
                            {/* <!-- Search icon --> */}
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" >
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </button>

                        <ul className='flex gap-2'>
                            <li className="text-[1rem] font-bold "><Link to="/signup">Signup</Link></li>
                            <li className="text-[1rem] font-bold "><Link to="/login">Signin</Link></li>
                            <li className="text-[1rem] font-bold "><Link to="/log-activity">LogActivity</Link></li>
                            <li className="text-[1rem] font-bold "><Link to="/emp-details">EmpDetails</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
