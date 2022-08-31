import { useFormik } from "formik";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { selectPosts, updatePostsAsync } from "../redux/post/postSlice";
import { selectUser } from "../redux/user/userSlice";
import './style.css'
import validationSchema from "./Validations";
import Loading from "../layouts/Loading"
import UpdatePosImg from "../image/UpdatePosImg";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

function EditForm(props) {

    const usr = JSON.parse(localStorage.getItem("user_data"));
    const user = useSelector(selectUser);
    const editorRef = useRef(null);
    const editor = editorRef.current
    const post = useSelector(state => state.posts.currentPost)
    const url = localStorage.getItem("url")
    const { postId } = useParams()
    const dispacth = useDispatch();
    const postSlc = useSelector(selectPosts)
    const disable = postSlc.isLoading ? true : false
    const imgSlc = useSelector(state => state.images)
    const { handleChange, handleBlur, values, errors, touched } =
        useFormik({
            initialValues: {
                title: post.title,
                content: post.content,
            }, validationSchema,
        });

    const handleSubmit = (e) => {
        e.preventDefault()
        dispacth(updatePostsAsync({
            id: postId,
            title: values.title,
            content: editorRef.current.getContent(),
        }
        ))
    }
    const categories = ["bilim", "sanat", "eğitim", "tanıtım", "teknoloji", "diğer"]
    const uploadFile = async (cb, file) => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(`${process.env.REACT_APP_REQUEST_DOMAIN}images/upload`, formData);
        cb(res.data.url)
        console.log(res.data.url)
        console.log(formData)
    };
    const imageHandler = (cb, a, b) => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            await uploadFile(cb, file);
            console.warn("You could only upload images.");
        };
    };
    return (
        <div>
            <div className='add-post' >
                <div className='edit-form'>
                    <UpdatePosImg />
                    <form onSubmit={handleSubmit} >
                        <div className='form-inputs' >
                            <div>
                                <label>Başlık</label>
                            </div>
                            <input
                                type="text"
                                disabled={disable}
                                placeholder={errors.title && touched.title && (
                                    errors.title
                                )}
                                name="title"
                                value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <div>
                                <label>Kategori</label>
                            </div>
                            <select
                                disabled={disable}
                                className='editor-drodown'
                                type="text"
                                placeholder="Kategori"
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                {categories.map((category, i) => (
                                    <option key={i} value={category}>{category}</option>
                                ))}
                            </select>
                            {errors.category && touched.category && (
                                <div className="error">{errors.title}</div>
                            )}

                            <div>
                                <label>İçerik</label>
                            </div>
                            <Editor
                                disabled={disable}
                                className="tiny-editor"
                                apiKey="idcaorhm2cm2ogoz2v6gu7gk08g8ubc75x5i7wto7zqyegpv"
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue={values.content}
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: 'image media  code link',
                                    toolbar: '  undo redo |bold italic backcolor forecolor strikethrough styleselect superscript subscript underline| formatselect h1 h2 h3 h4 h5 h6| code image media link | formatselect | ' +
                                        ' alignleft aligncenter ' +
                                        'alignright alignjustify  bullist numlist outdent indent |',
                                    file_picker_types: 'image',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </div>
                        <button id="update-post-submit" disabled={errors && !disable ? false : true} type='submit' >Kaydet</button>
                    </form>
                </div>
                {postSlc.posted && <Navigate to={"/post/" + postId} />}
            </div>
        </div>
    )
}

export default EditForm