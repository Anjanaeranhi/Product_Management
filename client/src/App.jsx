import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import HomePage from './Pages/HomePage';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn />}/>
      <Route path='signup' element={<SignUp />}/>
      <Route path='homepage' element={<HomePage />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
