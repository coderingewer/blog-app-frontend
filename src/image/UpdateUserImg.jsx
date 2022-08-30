import React from 'react'
import { useState } from 'react'
import { BsImageAlt, BsUpload } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router';
import { updatePostImgsAsync } from '../redux/post/postSlice';
import { editUserAvatarAsync, selectUsers } from '../redux/user/userSlice';
import "./style.css"
function UpdateUserImg(props) {
    const dispact = useDispatch();
    const [file, setFile] = useState();
    const userSlc = useSelector(selectUsers)
    const disable = userSlc.isLoading ? true : false
    const [fileName, setFileName] = useState("");
    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };
    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        await dispact(editUserAvatarAsync(formData));
        console.log(formData)
        setFileName("")
    }
    return (

        <div className='update-img'>
            <p className='file-name' >{fileName}</p>
            <div className='file-inputs' >
                <h6>Profil Fotoğrafı</h6>
                <input  disabled ={disable} id="file-input" type="file" accept=".jpg, .png, .jpeg, .gif," onChange={saveFile} />
                <button className='file-btn' disabled ={disable} onClick={() => document.getElementById("file-input").click()} ><BsImageAlt/></button>
                <button  disabled ={disable} className='file-btn' onClick={uploadFile}><BsUpload /></button>
            </div>
        </div>
    )
}

export default UpdateUserImg