import React, { useState } from 'react';
import './App.css'
import { Ibook } from './interface/book';
import List from './Component/list';
import { Route,Routes } from 'react-router-dom';
import Edit from './Component/edit';
import Add from './Component/add';
import { Link } from 'react-router-dom';
function App() {
  const [book,setbook] = useState<Ibook[]>([])
  return ( 
      <>
      <Link to={`/books/add`} className="btn btn-warning btn-sm mr-2">thêm</Link>
         <Routes>
          <Route path="/books" element={<List setbook={setbook} book={book} />}/>
          <Route path="/books/add" element={<Add setbook={setbook} book={book}/>}/>
          <Route path="/books/edit/:id" element={<Edit setbook={setbook} book={book}/>}/>
         </Routes>
      </>
  )
      
}

export default App
