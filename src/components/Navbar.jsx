import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import react from '../assets/react.svg'
import tailwind from '../assets/tailwind.svg'
import redux from '../assets/redux.svg'

const Navbar = () => {

    const items = useSelector((state)=>state.cart)

  return (
    <>
      <nav className="w-full flex gap-3 p-7 items-center bg-gray-700 justify-between text-white">
        <div className="gap-3 flex">
        <NavLink className={({isActive})=>isActive? "underline":""}  to="/">Home</NavLink>
        <NavLink className={({isActive})=>isActive? "underline":""} to="/cart">Cart</NavLink>
        </div>
        <div className=" gap-4 hidden sm:flex">

        <img src={react}/>
        <img src={tailwind}/>
        <img src={redux}/>
        </div>
        <h1>cart items: {items.length}</h1>
      </nav>
    </>
  )
}

export default Navbar


