import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router'
import "./style.css"
import { getPostAsync, selectPost, selectPosts, viewPostAsync } from '../redux/post/postSlice'
import { CgMoreVertical } from 'react-icons/cg'
import { BsEye } from "react-icons/bs";
import DeletePost from './DeletePost'
import Dashboard from "../layouts/Dashboard"
import { useMemo } from 'react'
import seenicon from "./Seen.svg"
import Loading from '../layouts/Loading'

function Post() {
    const currentUser = useSelector((state) => state.users.CurrentUser);
    const userId = currentUser ? currentUser.ID : 0
    const postSlc = useSelector(selectPosts)
    const posts = useSelector(state => state.posts.current)
    const { postId } = useParams()
    const dispact = useDispatch()
    useEffect(() => {
        dispact(getPostAsync({ postId }))
    }, [dispact])
    useMemo(async () => {
        await dispact(viewPostAsync())
    })
    return (
        <div>
            {postSlc.deleted && <Navigate to="/" replace={true} />}

            {postSlc.isLoading && <div id="post-loading-icon">
                <Loading />
            </div>}
            {
                posts.map((post) => (
                    <div>
                        <div className='post' >
                            <div className='post-body' >
                                <div key={post.ID} >
                                    {userId === post.sender.ID && <div className='dropdown'>
                                        <button className="dropbtn"><CgMoreVertical /></button>
                                        <div className='dropdown-content' >
                                            <a href={"/updatepost/" + post.ID} className='editlink' >
                                                Düzenle
                                            </a>
                                            <DeletePost />
                                        </div>
                                    </div>}
                                    <div className='article-title' >
                                        <img src={post.image.url} />
                                        <h1>{post.title}</h1>
                                    </div>
                                    <div className='post-info' >
                                        <div className='post-view'>
                                            <img id='views-icon' src={seenicon} />
                                            <p> {post.views.length}</p>
                                        </div>
                                        <a className='link' href={"/profile/" + post.sender.ID}>
                                            <h1 className='post-author' >{post.sender.name}</h1>
                                        </a>
                                        <p className='post-time' >  {post.created_at}</p>
                                    </div>
                                    <div className='post-content'
                                        dangerouslySetInnerHTML={{
                                            __html: post.content
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                ))

            }
        </div>
    )
}

export default React.memo(Post)

