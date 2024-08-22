import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Cart from './page/Cart'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
    <div className="relative">

      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
    </Routes>
    </div>
    </>
  )
}

export default App
