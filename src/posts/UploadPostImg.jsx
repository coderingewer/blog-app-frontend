import React from 'react'
import UpdateImage from '../image/UpdateImage'
import UpdatePosImage from '../image/UpdatePosImg'
import Dashboard from '../layouts/Dashboard'

function UploadPostImg() {
    return (
        <>
            <Dashboard text="Gönderiye Kapak Fotoğrafı Ekle" />
            <div id="post-img" >
                <UpdatePosImage action="post" id = {1} />
            </div>
        </>
    )
}

export default UploadPostImg