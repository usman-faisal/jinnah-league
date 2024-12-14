import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const adminNavLinks = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Add Book",
        path: "/books/add",
    },
    {
        name: "View Books",
        path: "/books",
    },
]

export const Header = () => {
    return (
        <header className='py-2 sm:px-6 px-2 flex items-center justify-between'>
            {/* Logo */}
            <div className=''>
                <Image src="/logo.png" alt='logo' width={100} height={100} className='object-contain w-20 h-20 rounded-full' />
            </div>
            {/* Links */}
            <div className='flex items-center gap-x-4'>
                {
                    adminNavLinks.map((link, idx) => (
                        <Link className='text-lg' key={idx} href={link.path}>
                            {link.name}
                        </Link>
                    ))
                }
            </div>
            {/* Profile */}
            <div className=''>
                <Image src="/logo.png" alt='logo' width={100} height={100} className='object-contain w-20 h-20 rounded-full' />
            </div>
        </header>
    )
}
