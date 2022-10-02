import React, { useRef } from 'react';
import { addPostsAsync, selectPosts } from '../redux/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'react-quill/dist/quill.snow.css';
import Dashboard from '../layouts/Dashboard';
import UpdateImage from '../image/UpdateImage';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { ReactDOM } from 'react';


function Edit() {
  const postSlc = useSelector(selectPosts)
  const currentUser = useSelector((state) => state.users.CurrentUser);
  const id = localStorage.getItem("currentPostID");
  const userId = currentUser.id;
  const disable = postSlc.isLoading ? true : false
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const dispatch = useDispatch()
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        title: "",
        content: "",
        category: "",
      },

      onSubmit: async (e) => {
        await dispatch(addPostsAsync({
          userId: userId,
          title: values.title,
          content: editorRef.current.getContent(),
          category: values.category
        }));
      }

    });
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
  const categories = ["", "Bilim", "Sanat", "Eğitim", "Tanıtım", "Teknoloji", "Diğer"]
  return (
    <div >
      <Dashboard text="Gönderi  Oluştur" />
      <div className='edit-form'>
        <form onSubmit={handleSubmit} >
          <div className='form-inputs' >
            <div>
              <label>Başlık</label>
            </div>
            <input
              type="text"
              placeholder="Başlık"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.title && touched.title && (
              <div className="error">{errors.title}</div>
            )}
            <div>
              <label>Kategori</label>
            </div>
            <select
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
            <Editor className="tiny-editor"
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
                file_picker_callback: imageHandler,
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
          </div>
          <button id="update-post-submit" disabled={values.title && values.category && errors && !disable ? false : true} type='submit' >Paylaş</button>
        </form>
        <div className='upload-img' >
          {postSlc.posted && <UpdateImage btntext="Fotoğraf Yükle" id={id} />}
        </div>
      </div>
    </div>
  )
}
export default React.memo(Edit)