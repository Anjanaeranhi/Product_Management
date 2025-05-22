import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from './Components/SignIn';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignIn />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
