import React from "react"
import { Link } from "react-router-dom"

import { LogOutIcon } from "../Icons"

import { useAuth } from "../middleware/Authentication"

const Header = () => {
  const { user, logout } = useAuth()
  return (
    <div className="h-16 px-3 bg-darkBlue1 text-slate-300 w-full flex items-center border-b-2 border-lightGray">
      <div className="flex-grow font-semibold">
        <Link to="/">Chattur</Link>
      </div>
      <div>
        {user ? (
          <div className="relative group h-9 w-9 rounded-full overflow-hidden aspect-square">
            <img
              className="h-full w-full rounded-full aspect-square object-cover"
              src={user?.photoURL}
              alt={user?.displayname}
            />
            <button
              className="absolute flex opacity-0 transition-all pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100  items-center justify-center top-0 left-0 h-full w-full bg-black/70"
              onClick={logout}
              title="Logout"
            >
              <LogOutIcon />
            </button>
          </div>
        ) : (
          <>
          <Link to='/signup' >
          <button className="bg-transparent border-inherit py-1 px-5 text-white  font-semibold text-xs cursor-pointer rounded border-2 border-transparent hover:border-yellow hover:bg-transparent hover:text-yellow duration-200">
            Sign up
          </button>
          </Link>
          <Link to='/signin' className="px-4" >
          <button className="bg-yellow py-1 px-5 text-white  font-semibold text-xs cursor-pointer rounded border-2 border-transparent hover:border-yellow hover:bg-transparent hover:text-yellow duration-200">
            Sign in
          </button>
          </Link>
          </>
        )}
      </div>
    </div>  
  )
}

export default Header
