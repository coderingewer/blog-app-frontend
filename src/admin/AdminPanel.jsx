import React from 'react'
import { useSelector } from 'react-redux'
import UserPosts from '../posts/UserPosts'
import { Container } from 'react-bootstrap'
import UProfile from './Profile'
import  { selectUsers } from '../redux/user/userSlice'
import { Navigate } from 'react-router'

function AdminPanel() {
  const user = useSelector(state => state.users.CurrentUser)
  const userId = user ? user.ID : 0
  const userSlc = useSelector(selectUsers)
  return (
    <Container  >
        <div className='my-profie'>
          <UProfile />
        </div>
        <div className='my-posts' >
          <h1 className='my-posts-title' >Gönderilerim</h1>
          <UserPosts id={userId} />
        </div>
        {userSlc.isSignOut === true ? <Navigate to = "/" replace = {true}/>: ""}
    </Container>
  )
}

export default AdminPanel