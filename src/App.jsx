import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayArticles from './DisplayArticles';
import './App.css'

function App() {
  const apiUrl = "https://news-app-4jdh.onrender.com/api/";

  return (
    <>
      <Nav className="justify-content-center" activeKey="/home" >
        <Nav.Item>
          <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/articles">Articles</Nav.Link>
        </Nav.Item>
      </Nav>
      <main className='app-container'>
        <Routes>
          <Route path="/articles/*" element={<DisplayArticles />} />
          <Route path="/" element={<h3>Home</h3>} />
          <Route path="*" element={<h3>Not found</h3>} />
        </Routes>
      </main>
    </>
  )
}

export default App
