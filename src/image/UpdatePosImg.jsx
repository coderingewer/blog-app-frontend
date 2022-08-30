import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router';
import { BsUpload, BsImageAlt } from 'react-icons/bs'
import { selectPosts, updatePostImgsAsync } from '../redux/post/postSlice';
import "./style.css"
function UpdatePosImage(props) {
    const dispact = useDispatch();

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const { postId } = useParams()
    const postSlc = useSelector(selectPosts)
    const disable = postSlc.isLoading ? true : false
    const [posted, setPosted] = useState(false)

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        await dispact(updatePostImgsAsync({ id: postId, data: formData }));
        console.log(formData)
        setFileName("")
        setPosted(true)
    }
    return (

        <div className='update-img'>
            {props.action === "post" && posted ? <Navigate to="/" /> : ""}
            <p className='file-name' >{fileName}</p>
            <div className='file-inputs' >
                <h6>Gönderi Kapak Fotoğrafı</h6>
                <input disabled = {disable} id="file-input" type="file" accept=".jpg, .png, .jpeg, .gif," onChange={saveFile} />
                <button disabled = {disable}  className='file-btn' onClick={() => document.getElementById("file-input").click()} ><BsImageAlt /></button>
                <button disabled = {disable} className='file-btn' onClick={uploadFile}><BsUpload /></button>
            </div>
            </div>
    )
}

export default UpdatePosImage