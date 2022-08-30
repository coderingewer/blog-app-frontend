import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router'
import UserPosts from '../posts/UserPosts'
import Profile from './Profile'

function User() {
    const {userId} = useParams()
    return (
            <Container>
                <div className='my-profie'>
                    <Profile />
                </div>
                <div className='my-posts' >
                    <h1 className='my-posts-title'>Gönderiler</h1>
                    <UserPosts id={userId} />
                </div>
            </Container>
    )
}

export default User