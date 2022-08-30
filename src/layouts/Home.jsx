import React from 'react'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import PostList from '../posts/PostList'
import Dashboard from './Dashboard'
import Message from './Message'
import './style.css'

function Home() {
  const notfound = useSelector(state=>state.posts.notFound)
  return (
    <div className="App">
      <Dashboard text = "Bağlaç olan bilgi bitişik yazılır." abstract = "Aga'ya bilgi beleş" />
      <Container>
        <div className='notfound' >
        {notfound && <Message message = "Bunu bulamadık yav:/" />}
        </div>
        <PostList />
      </Container>
    </div>
  )
}

export default Home