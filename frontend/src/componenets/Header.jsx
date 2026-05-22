import React from 'react'

// This a header component which will be used in the app. It will just contain the name of the app and a logo. It will be used in the App component and will be styled using tailwind css

const Header = () => {
    return (
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
                <h1 className="text-xl font-bold">ToDo</h1>
            </div>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="#" className="hover:text-gray-400">Home</a></li>
                    <li><a href="#" className="hover:text-gray-400">About</a></li>
                    <li><a href="#" className="hover:text-gray-400">Contact</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header
