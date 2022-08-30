import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Loading from '../layouts/Loading'
import { deletePostsAsync } from '../redux/post/postSlice'
import "./style.css"


function DeletePost(props) {
    const {postId} =  useParams()
    const id = postId ? postId : props.id
    const dispacth = useDispatch()
    const handleDelete =  (e)=>{
        e.preventDefault()
          dispacth(deletePostsAsync(id))
        console.log(postId)
    }

  return (
    <div>
        <form onSubmit={handleDelete} >
        <button className='deletebtn' type="submit" >Sil</button>
        </form>
    </div>
  )
}

export default DeletePost