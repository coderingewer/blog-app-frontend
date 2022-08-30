import React, { useEffect, useState } from 'react'
import "./style.css"
import { Form, Button, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAsync, selectPost } from '../redux/post/postSlice';

function Explore() {
  const posts = useSelector(selectPost);
  const dispacth = useDispatch
  const [filterText, setFilterText] = useState("");

	const filtered = posts.filter((item) => {
			item.title
				.toString()
				.toLowerCase()
				.includes(filterText.toLocaleLowerCase())
	});
  return (
    <div className='explore' >

    
<div className='explore-items' >
          <div className='explore-card' >
            <h1 ></h1>
          </div>
          <div className='explore-card' >
            <h1 >lorem</h1>
          </div>
          <div className='explore-card' >
            <h1 >lorem</h1>
          </div>
        </div>
      </div>
     
  )
}

export default Explore