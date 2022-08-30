import React from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { Navbar, Container, Nav, Form } from 'react-bootstrap'
import { AiFillHome, AiOutlineUser } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { searchPosts } from '../redux/post/postSlice'
import logo from './LogoBlogRenkliApp.png'
import usericon from './User.svg'
import editIcon from './Edit.svg'


function Navi() {
  const dispacth = useDispatch()
  const [searchText, setSearchText] = React.useState("")
  const user = JSON.parse(localStorage.getItem("user_data")) 

  const hadleSearch = (text)=>{
    dispacth(searchPosts(searchText))
    setSearchText(text)
    console.log("filter")
  }

  return (
    <div>
      <Navbar  bg="light" className='navbar'  expand="lg" fixed='top'>
        <Container>
         <a id = 'logo-link' href="/">< img id = "blog-logo" src = {logo}/></a> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse className='collapse'>
            <div className='navi-form' >

              <Form className="d-flex">
            <Form.Control 
              type="search"
              placeholder="Ara, bulamazsan canımız sağ olsun:)"
              className="me-2"
              aria-label="Search"
              value={searchText}
              onChange={(e)=>hadleSearch(e.target.value)}
              />
            </Form>
              </div>
            {user &&
            <Nav  className="mr-auto">
              <Nav.Item>
                <Nav.Link href='/editor'>
                  <div className='nav-icon'>
                    <img className='nav-icon-svg' src={editIcon}  />
                  </div>
                </Nav.Link>
              </Nav.Item>
    
                <Nav.Link href='/adminpanel' >
                <div className='nav-icon'>
                <img src={usericon}  />
                  </div>
                </Nav.Link>
              </Nav>}
          </Navbar.Collapse>
              </Container>
      </Navbar>
    </div>

  )
}

export default Navi