import React from 'react'
import { useSelector } from 'react-redux'

function Message(props) {
    const notfound = useSelector(state=>state.posts.notFound)
  return (

    <div id = "post-not-found" >
        <h1>{props.message} </h1>
    </div>
  )
}

export default Message