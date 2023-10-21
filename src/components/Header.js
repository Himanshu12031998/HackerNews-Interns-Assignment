import {useState,useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';
import '../styles/Header.css'


function Header() {

  const [headerColor,setHeaderColor] =useState("primary");
  const [change,setChange] = useState(false);

  const changeMode=()=>{
    setChange(!change);
  }
  
  useEffect(()=>{
if(change){
  setHeaderColor("dark");

  document.querySelector("body").setAttribute('data-theme','dark');
}else{
  setHeaderColor("primary");
 
  document.querySelector("body").setAttribute('data-theme','light');
}
  },[change])
  return (
    <>
      <Navbar bg={headerColor} data-bs-theme="dark"  className="fixed-top">
        <Container>
          <Navbar.Brand className="brand">HackerNews</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link home">Home</NavLink>
          </Nav>
          <Navbar.Brand className="brand" href="#" onClick={changeMode}>
          {change ? <FaSun style={{ fontSize: '1.2rem' }}/> : <FaMoon style={{ fontSize: '1.2rem' }}/>}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;