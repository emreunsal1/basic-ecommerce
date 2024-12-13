import React from "react"
import { Route, Routes } from "react-router-dom"
import List from "./pages/List"
import ProductDetail from "./pages/ProductDetail"



function App() {
  
  return (
    <div>
      <Routes>
        <Route path="list" element={<List/>}/>
        <Route path="detail" element={<ProductDetail />}/>
      </Routes>
    </div>
  )
}

export default App
