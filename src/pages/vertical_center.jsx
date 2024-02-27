import Image from 'next/image'
import { useState } from 'react';

export function nav_vertical_center() {
    return <nav class="bg-gray-800 p-4">
    <div class="flex justify-between items-center">
        <div class="flex items-center">
            <Image
              src="/logo.png"
              alt="logo-adobe-express"
              className="dark:invert"
              width={90}
              height={24}
              priority
            />
               <Image
      src="/name1.png"
      alt="Vercel Logo"
      className="dark:invert dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
      width={120}
      height={75}
      priority
   />
        </div>
        <div class="flex items-center">
            <a href="#" class="text-white mr-4">Home</a>
            <a href="#" class="text-white mr-4">About</a>
            <a href="#" class="text-white mr-4">Services</a>
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">Button</button>
        </div>
    </div>
    </nav>;
}


export default function Navbar() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-800 p-4 frosted-bg">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    {/* Your logo */}
                    <img src="logo.png" alt="Logo" className="h-8 mr-2" />
                    {/* Your website title */}
                    <h1 className="text-white text-lg">Your Website</h1>
                </div>
                {/* Hamburger icon for toggling the navbar */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="lg:hidden focus:outline-none focus:bg-gray-600 rounded-full p-2"
                >
                    <svg
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
                <div className={isCollapsed ? 'hidden lg:flex lg:items-center' : 'lg:flex lg:items-center'}>
                    {/* Your navigation links */}
                    <a href="#" className="text-white mr-4">
                        Home
                    </a>
                    <a href="#" className="text-white mr-4">
                        About
                    </a>
                    <a href="#" className="text-white mr-4">
                        Services
                    </a>
                    {/* Button */}
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
                        Button
                    </button>
                </div>
            </div>
        </nav>
    );
}
