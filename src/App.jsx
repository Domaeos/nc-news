import { Link, Route, Routes } from 'react-router-dom'
import { useContext, useState, useEffect } from "react"
import { UserContext } from './UserContext';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import SingleArticle from './SingleArticle';
import ArticleGrid from './ArticleGrid';
import Account from './Account';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';

function App() {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setUser(userObj.user);
    }
  }, []);

  function handleLogout() {
    setUser(null);
    localStorage.clear();
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">NC News</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/articles/">Articles</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav className='me-right'>
              {!user && <Nav.Link as={Link} to="/account/login">Sign in</Nav.Link>}
              {user && <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>Signed in as: {user}</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/account/">My account</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/" onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>}  
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar >
      <main className='app-container'>
        <Routes>
          <Route path="/articles/" element={<ArticleGrid />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/articles/:articleID" element={<SingleArticle />} />
          <Route path="/" element={<h3>Home</h3>} />
          <Route path="*" element={<h3>Not found</h3>} />
        </Routes>
      </main>
    </>
  )
}

export default App
