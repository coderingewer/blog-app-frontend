import React from 'react'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { FiUserPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersAsync, selectUser } from '../redux/user/userSlice'
import "./style.css"
import addusericon from "./AddUser.svg"

function Users() {
    const dispacth = useDispatch()
    const usr = useSelector(selectUser)
    const users = useSelector(state => state.users.items)
    useMemo(() => {
        dispacth(getUsersAsync())
    }, [dispacth])
    console.log(usr)
    return (
        <div>
            <div className='users'  >
                {usr.user_role ==="SUPER-USER" &&
                <a className='link addusr-link' href='/register' ><img src={addusericon} className='addusr-link' /></a>}
                {users.map((user) => (
                    <div className='user-card' key={user.ID}>
                        <div id='users-img-div' >
                            <img src={user.image.url} />
                        </div>
                        <div id='users-details' >
                            {user.user}
                            <a className='link' href={"profile/" + user.ID}>
                                <p className='users-usersname' >{user.username}</p>
                            </a>
                            <p>{user.name}</p>
                        </div>
                        <div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Users