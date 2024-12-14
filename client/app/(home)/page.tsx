import { BookCard } from '@/components/shared/BookCard'
import React from 'react'

const HomePage = () => {
    return (
        <section className='section'>
            <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-2'>
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
                <BookCard />
            </div>
        </section>
    )
}

export default HomePage 