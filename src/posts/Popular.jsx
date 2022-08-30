import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAsync, selectPost } from '../redux/post/postSlice';

function Popular() {
    const posts = useSelector(selectPost);
    const dispacth = useDispatch();

    useEffect (()=>{
        dispacth(getPostsAsync());
    },[dispacth])
    return (
        <div className='popular-list' >
            {
               posts.map((post, index )=>index < 3 && (
                <div key={post.ID} className='popular-card' >
                <div className='popular-title'  >
                    <h1 >{post.title}</h1></div>
                <div className='popular-detail' >
                    <p className='popular-author' >{post.sender.name}</p>
                    <p className='popular-time' >{post.UpdatedAt}</p>
                </div>
            </div>))}
           

        </div>
    )
}

export default Popular