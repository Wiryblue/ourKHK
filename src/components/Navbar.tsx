import React from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"

type CustomLinkProps = {
    to: string
    children: React.ReactNode
    className?: string
}

{/** Change this stuff later. Figure out the CSS so it all aligns neatly. Refer to tailwindcss examples online
    Copy paste them, figure them out, then change to meet our requirements, then implement */}

function OrganizationsDropdown() {
  return (
    <li className="relative group">
      <button type="button" className="inline-flex items-center gap-2 px-3 rounded border text-sm">
        Organizations
        <svg className="w-3 h-3 transition group-hover:rotate-180" viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* menu hidden by default, shown on hover */}
      <div className="absolute left-0 mt-2 w-44 rounded border bg-purple-900 shadow-sm p-1 hidden group-hover:block z-10">
        <a href="https://daa.khk.org/" target="_blank" rel="noopener noreferrer" 
        className="block rounded px-3 py-2 text-sm hover:bg-gray-100">
          Delta Alumni Association
        </a>
        <a href="https://khk.org/" target="_blank" rel="noopener noreferrer"
          className="block rounded px-3 py-2 text-sm hover:bg-gray-100">
          National Association
        </a>
        <a href="https://khkbeta.org/" target="_blank" rel="noopener noreferrer"
          className="block rounded px-3 py-2 text-sm hover:bg-gray-100">
          National Executive Council
        </a>
        <a href="https://khkbeta.org/" target="_blank" rel="noopener noreferrer"
          className="block rounded px-3 py-2 text-sm hover:bg-gray-100">
          Beta (UM - St Paul/Twin-Cities)
        </a>
        <a href="https://iota.khk.org/" target="_blank" rel="noopener noreferrer"
          className="block rounded px-3 py-2 text-sm hover:bg-gray-100">
          Iota (UM - St Cloud)
        </a>
      </div>
    </li>
  );
}

function NavBar() {
    return (
        <nav className="nav w-full bg-purple-900">
            <ul className="flex justify-evenly items-center text-white py-3">
                <Link to="/" className="site-title">Home</Link>
                <CustomLink to="/about">About</CustomLink>
                <CustomLink to="/events">Events</CustomLink>
                <CustomLink to="/members">Members</CustomLink>
                <CustomLink to="/login">Login</CustomLink>
                {/* Working dropdown */}
                <OrganizationsDropdown />
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }: CustomLinkProps) {
    // to -> the url you're going to 
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        //If these are equal then class is active or it's nothing
        <li className={isActive ? "active" : ""}>
            <Link to={to}{...props}>
                {children}
            </Link>
        </li>
    )
}

export default NavBar






