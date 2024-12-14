"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from "sonner";
import Cookies from 'js-cookie';
import { getUser } from "../../API/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: getUser
    });

    const handleLogOut = () => {
        Cookies.remove('token');
        toast.success('Logged out Successfully');
    }


    console.log(user);
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
            <div className='relative'>
                {
                    isLoading ? (
                        <div>is Loading..</div>
                    ) : isError ? (
                        <div>Error Occured..</div>
                    ) : user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Image
                                    src={"/user.webp"}
                                    alt="Logo"
                                    width={50}
                                    height={50}
                                    objectFit="contain"
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <div className='px-4 py-2'>
                                    <div className='tex-sm text-gray-700'>
                                        <div>{user.data.name}</div>     
                                        <div>{user.data.email}</div>
                                    </div>
                                </div>

                                <DropdownMenuItem onClick={handleLogOut} className='text-red-600 hover:bg-red-100 py-2 px-4 rounded-md'>
                                    Log Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div>Please Login</div>
                    )
                }
            </div>
        </header >
    )
}
