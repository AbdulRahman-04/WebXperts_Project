import React from 'react'
import Signup from "./Components/public/Signup"
import Signin from './Components/public/Signin'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


const App = () => {
  return (
    <>
      
      <Router>
         
         <Routes>
            
            <Route path='/signin' element={<Signin />}/>
            <Route path='/signup' element={<Signup />}/>



         </Routes>



      </Router>


    
    </>
  )
}

export default App