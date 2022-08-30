import React, { useEffect } from 'react'
import { getPostsAsync, getUserPostsAsync, selectPost, viewPostAsync } from '../redux/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import { useState } from 'react';
import { useParams } from 'react-router';
import PostNotFound from '../layouts/Message';
import Message from '../layouts/Message';

function UserPosts(props) {
    const posts =  useSelector((state) => state.posts.userposts);
    const notfound = useSelector(state=>state.posts.notFound)
    const filtered = useSelector(state=>state.posts.filtered)
    const currentPosts = filtered.length !== 0 && notfound ? filtered : posts
    const dispacth = useDispatch();
      let {userId} = useParams();
      const id = userId ? userId : props.id

    useEffect (()=>{
        dispacth(getUserPostsAsync({id:id}));
    },[dispacth])
    const viewPost = async (id)=>{
        await dispacth(viewPostAsync(id))
    }
    return (
        <div className='user-post' >
                        {notfound && <Message message="bulamadık yav:/" />}
            {
                currentPosts.map((post)=>  (
                    <div key={post.ID} className='post-card' >
                    <div className='colorful-div'  ></div>
                    <div className='card-body' >
                    <a onClick={()=>userId !== post.sender.ID ? viewPost(post.ID): ""} className='link' href={"/post/" + post.ID} >
                                <h1 className='post-title' >{post.title}</h1>
                            </a>
                        <p className='post-time' >{post.UpdatedAt}</p>
                    </div>
                </div>
                ))
            }           
        </div>
    )
}

export default UserPosts