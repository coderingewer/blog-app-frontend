import React from 'react'
import { useParams } from 'react-router'
import EditUser from '../User/EditUser'

function UpdateUserByAdmin() {
    const {userId} = useParams()
  return (
    <div>
        <EditUser id={userId}/>
    </div>
  )
}

export default UpdateUserByAdmin