
import './App.css'
import {Route,Routes} from 'react-router-dom'
import  Login  from './pages/Login'
import Signup  from './pages/Signup'
import  AddProduct  from './pages/AddProduct'
import ProtectedRoute from './components/ProtectedRoute'
import { Navbar } from './components/Navbar'
import InvoiceSummary from './pages/SummaryPage'


function App() {


  return (
    <>
      <div className='w-full bg-richblack-700 p-2 text-white'><Navbar/></div>
      <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path = '/addProduct' element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>
          <Route path="/createInvoice" element={<ProtectedRoute><InvoiceSummary/></ProtectedRoute>}/>
          <Route path='/*' element={<div className='flex justify-center items-center h-screen text-xl text-richblack-700'>ERROR 404 | NOT FOUND</div>}/>
      </Routes>
    </>
  )
}

export default App
