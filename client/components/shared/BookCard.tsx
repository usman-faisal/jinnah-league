import Image from 'next/image'
import React from 'react'

export const BookCard = () => {
    return (
        <div className='rounded-md '>
            <Image src="/book.jpg" className='rounded-md mb-4 w-full max-h-[300px] object-cover' alt='book-image' width={500} height={500} />

            <div className='flex flex-col items-start gap-y-2'>
                <h2>Book title</h2>
                <p>Category</p>
                <p>Author name</p>
            </div>
        </div>
    )
}
