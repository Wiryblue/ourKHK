import { useState } from 'react'
import NavBar from './components/Navbar'

function Home() { 
  return (
    <div className='px-10'> 
      <section className='font-bold py-10'>
        <h1 className='flex w-full items-center justify-evenly'>Kappa Eta Kappa</h1>
        <h1 className='flex w-full items-center justify-evenly'>Delta Chapter</h1>
        <h1 className='flex w-full items-center justify-evenly'>Professional Co-ed Electrical and Computer Engineering Fraternity</h1>
      </section>
      <section>
        <div className='py-5'>
          <h1 className='flex w-full items-center justify-evenly'>Academic</h1>
          <p className='flex w-full items-center'>KHK was founded at the University of Wisconsin as an electrical engineering fraternity in 1924. Today many of our members also study computer engineering, computer science and other technical programs. Members often study and work together at our house.</p>
        </div>
        <section className='py-5'>
          <h1 className='flex w-full items-center justify-evenly'>Professional</h1>
          <p>Members are hired out of school into well-paying careers. Some have become successful entrepreneurs. Membership opens up connections to industry from across the globe. Professionals visit and give talks about life, work, and how they found their success.</p>
        </section>
        <section className='py-5'>
          <h1 className='flex w-full items-center justify-evenly'>Community</h1>
          <p>College can be a new and often stressful experience. It helps to have friends and family close. Members benefit from a fraternal relationship strengthened by tradition and legacy. Membership is also a great way to meet new, like-minded friends-of-friends.</p>
        </section>
        <section className='flex w-full items-center justify-evenly py-5'>
          <a href='/events'>Events</a>
          <div></div>
          <a href='/about'>Learn More</a>
        </section>
        {/*Section with preview of posts, followed with a link to the posts page*/}
        {/*Member highlights for positions, followed with a link to the members*/}
      </section>
    </div>
  )
}

export default Home
