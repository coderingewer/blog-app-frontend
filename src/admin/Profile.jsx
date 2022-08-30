import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserAsync, signOut } from '../redux/user/userSlice'
import "../User/style.css"

function UProfile() {
  const dispatch = useDispatch()
  const userSlice = useSelector((state) => state.users)
  const usr = JSON.parse(localStorage.getItem("user_data"));
  const data = {username:"", name:"", user_image:{url:""}}
  const user = usr ? usr: data
  const imageurl = user ? user.user_image.url : "" 
  useEffect(() => {
    dispatch(getCurrentUserAsync())
  }, [dispatch])

  const handleSignOut = async () => {
    await dispatch(signOut())
  }
  return (
    <div className='profile' >
      <div className="user-card-body" >
        <form className='profile-form' onSubmit={handleSignOut}>
          <button id='sign-out-btn' type='submit'>Çıkış</button>
          <a className='edit-link' href="/edituser">Düzenle</a>
        </form>
        <img src={user.user_image.url}/>
        <div className="user-details" >
          <h1>{user.username}</h1>
          <p>{user.name}</p>
        </div>
      </div>
    </div>
  )
}

export default UProfile