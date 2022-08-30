import React from 'react'
import "./style.css"
import Navi from '../bars/Navi'

function Dashboard(props) {
  return (
    <div className='studapp-blog' >
        <h1 className='slogan' >{props.text}</h1>
        <p className='abstract' >{props.abstract}</p>
      <Navi />
    </div>
  )
}

export default Dashboard