import React from 'react'
import Dashboard from '../layouts/Dashboard'
import Edit from './Edit'
import Loading from "../layouts/Loading"
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

function AddPost() {
  const postID = useSelector(state=>state.posts.currentPostId)
  const postSlc = useSelector(state=>state.posts)
  return (
    <div>
        <Edit/>
      {postSlc.posted && <Navigate to={"/postimg/" + postID}/>}
    </div>
  )
}

export default AddPost