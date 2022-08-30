import React from 'react'
import {Nav, Navbar } from 'react-bootstrap'
import './style.css'

function ButtomNav() {
    const user = JSON.parse(localStorage.getItem("user_data"))
    return (
        <div className='bottom-nav' >

            <Navbar bg="light" fixed='bottom' >

                <div className='bottom-nav-item' >
                </div>
            </Navbar>
        </div>
    )
}

export default ButtomNav