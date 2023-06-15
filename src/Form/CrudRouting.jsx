import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import HomePage from './Components/HomePage'
import AddUser from './Components/AddUser'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateUser from './Components/UpdateUser';
import Navbar from './Components/Navbar';

const CrudRouting = () => {
  return (
    <>
    <ToastContainer />
        <Router>
          <Navbar/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/add' element={<AddUser/>}/>
                <Route path='/update/:id' element={<UpdateUser/>}/>
            </Routes>
        </Router>
    </>
  )
}

export default CrudRouting