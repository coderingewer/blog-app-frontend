import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAsync } from '../redux/user/userSlice'
import "./style.css"

import {  useParams } from 'react-router';

function Profile() {
  const dispatch = useDispatch()
  const {userId} = useParams()
  const users = useSelector((state) => state.users.current)
  useMemo(async () => {
   await dispatch(getUserAsync(userId))
  },[dispatch])
  return (
    <div className='my-profie'>
    <div  className='profile' >
      {
        users.map((user) => (
          <div key={user.ID} >
            <div className="user-card-body" >
              <img src={user.user_image.url} alt="" />
              <div className='profile-details' >
                <h1>{user.username}</h1>
                <p>{user.name}</p>
              </div>
            </div>
            </div>
        ))
      }
    </div>
    </div>
  )
}

export default React.memo(Profile)