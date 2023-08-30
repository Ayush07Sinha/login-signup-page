import './App.css';
import Login from './Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Signup';
import React from 'react';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/home" element={<Home/>}></Route>

      {/* <Route path="/" element={<Navigate to="/login" />} /> */}
    </Routes>
    </BrowserRouter>
  );
}
export default App;
