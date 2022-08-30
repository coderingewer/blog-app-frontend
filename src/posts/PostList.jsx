import React, { useCallback, useEffect } from 'react'
import { getPostsAsync, selectPost, viewPostAsync } from '../redux/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import load from  "../layouts/emoj.png"
import Loading from '../layouts/Loading';
import { useMemo } from 'react';

function PostList() {
    const posts =  useSelector(selectPost);
    const filtered = useSelector(state=>state.posts.filtered)
    const currentPosts = filtered.length !==0 ? filtered : posts
    const dispacth = useDispatch();
    const currentUser = useSelector((state) => state.users.CurrentUser);
    const userId = currentUser ?  currentUser.ID : 0
    const postSlc = useSelector(state=>state.posts)

    useEffect(() => {
        dispacth(getPostsAsync());
    }, [dispacth])
    
    const viewPost =  useCallback(async (id)=>{
        await dispacth(viewPostAsync(id))
    })
    return (
        <div className='post-list' >
            <div id = "loading-icon">
            {postSlc.isLoading && <Loading/>}
            </div>
            {
                currentPosts.map((post) =>  (
                    <div  key={post.ID} className={`post-card  ${post.isValid !== true &&  'notvalid'}`} >
                        <div className='colorful-div'  ></div>
                        <div className='card-body' >
                        <div className='card-title' >
                            <a onClick={()=>userId !== post.sender.ID ? viewPost(post.ID): ""} className='link' href={"/post/" + post.ID} >
                                <h1 className='post-title' >{post.title}</h1>
                            </a>
                            </div>
                            <p className='post-author' >{post.sender.name}</p>
                            <p className='post-time' >{post.created_at}</p>
                        </div>
                        <div>
                            <img className='post-img' src={post.image.url} alt="" />
                        </div>
                    </div>
                ))
            }          
            
        </div>
    )
}
export default PostList