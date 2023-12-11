import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages'
import { Footer } from './components'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>

            <div className="footerContainer">
                <Footer/>
            </div>
        
        </>
        
    )
}

export default App
