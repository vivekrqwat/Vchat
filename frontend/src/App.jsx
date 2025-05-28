// App.jsx
import React from 'react';
import"./App.css"
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Setting from './Pages/Setting';
import Profilepage from './Pages/Profilepage';
import { UseAuthcheck } from './store/Authstore';
import { useEffect } from 'react';
import {Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast';
const App = () => {

  const{ authUser,checkAuth,isChecking}=UseAuthcheck()
  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  console.log({authUser});
  if(isChecking&&!authUser){
    return <div className='flex  items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"></Loader>
    </div>
  }
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
      <Route path='/' element={authUser?<Home></Home>:<Navigate to="/login"></Navigate>}></Route>
       <Route path='/signup' element={!authUser?<Signup></Signup>:<Navigate to="/"></Navigate>}></Route>
        <Route path='/login' element={!authUser?<Login></Login>:<Navigate to="/"></Navigate>}></Route>
        <Route path='/setting' element={<Setting></Setting>}></Route>
        <Route path='/Profilepage' element={authUser?<Profilepage></Profilepage>:<Navigate to="/login"></Navigate>}></Route>
      </Routes>
           <Toaster />
    </div>
  );
};

export default App;
