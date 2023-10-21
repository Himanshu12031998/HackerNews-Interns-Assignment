import React from 'react'
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import HomeDetails from './components/HomeDetails';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div>
            <BrowserRouter>
            <Header/>
            <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/homeDetails/:objectID" element={<HomeDetails/>} />
            </Routes>
            </BrowserRouter>
      
    </div>
  )
}

export default App